import { test as base } from "@playwright/test";
import { spawn, ChildProcess } from "child_process";
import { promisify } from "util";
import * as net from "net";

const sleep = promisify(setTimeout);

// Define the custom fixture type
interface ServerFixture {
  ensureServer: void;
}

// A fixture that ensures the development server is running
export const test = base.extend<ServerFixture>({
  // Setup server fixture
  ensureServer: [
    async ({}, use: () => Promise<void>) => {
      let serverProcess: ChildProcess | null = null;
      const baseUrl = process.env.BASE_URL || "http://localhost:3000";
      const port = new URL(baseUrl).port || "3000";

      // Check if the server is already running
      const isServerRunning = await checkPort(parseInt(port));

      if (!isServerRunning) {
        console.log(`Starting development server on port ${port}...`);
        // Start the development server
        serverProcess = spawn("npm", ["run", "dev"], {
          stdio: "pipe",
          detached: true,
          shell: true,
        });

        // Log server output for debugging
        serverProcess.stdout?.on("data", (data) => {
          console.log(`Server stdout: ${data}`);
        });

        serverProcess.stderr?.on("data", (data) => {
          console.error(`Server stderr: ${data}`);
        });

        // Wait for the server to be ready
        let attempts = 0;
        const maxAttempts = 30;
        while (attempts < maxAttempts) {
          const isRunning = await checkPort(parseInt(port));
          if (isRunning) {
            console.log("Development server is running!");
            break;
          }
          console.log(
            `Waiting for server to start (attempt ${attempts + 1}/${maxAttempts})...`
          );
          await sleep(1000);
          attempts++;
        }

        if (attempts === maxAttempts) {
          throw new Error("Failed to start development server");
        }
      } else {
        console.log("Development server is already running.");
      }

      // Use the fixture
      await use();

      // Clean up after tests if we started the server
      if (serverProcess) {
        console.log("Stopping development server...");

        // Kill the process and all its children
        if (process.platform === "win32" && serverProcess.pid !== undefined) {
          spawn("taskkill", ["/pid", serverProcess.pid.toString(), "/f", "/t"]);
        } else if (serverProcess.pid !== undefined) {
          process.kill(-serverProcess.pid, "SIGINT");
        }
      }
    },
    { scope: "worker", auto: true },
  ],
});

// Helper function to check if a port is in use
async function checkPort(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const client = new net.Socket();

    // Set a timeout to avoid hanging
    client.setTimeout(1000);

    // Handle connection success
    client.on("connect", () => {
      client.destroy();
      resolve(true);
    });

    // Handle connection error or timeout
    client.on("error", () => {
      client.destroy();
      resolve(false);
    });

    client.on("timeout", () => {
      client.destroy();
      resolve(false);
    });

    // Try to connect to the server
    client.connect(port, "localhost");
  });
}
