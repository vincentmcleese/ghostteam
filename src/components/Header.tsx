import Link from "next/link";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className="w-full bg-white shadow-sm py-4 px-6 fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className={styles.brandLink} aria-label="20hours home">
          <h1 className={styles.brand}>20hours</h1>
        </Link>
        <nav className="hidden md:flex space-x-6">
          {/* Navigation items would go here */}
        </nav>
        <div className="md:hidden">
          {/* Mobile menu button would go here */}
        </div>
      </div>
    </header>
  );
};

export default Header;
