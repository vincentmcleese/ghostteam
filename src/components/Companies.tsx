"use client";

import React from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";

const Companies = () => {
  const categories = [
    "E-commerce",
    "SaaS",
    "Consumer apps",
    "Financial Services",
  ];

  const clientLogos = [
    {
      id: 1,
      name: "Clippit",
      logo: "/images/clients/clippit.avif",
      url: "https://clippit.fm/",
      width: 160,
      height: 48,
    },
    {
      id: 2,
      name: "Web3Audience",
      logo: "/images/clients/web3audience.jpeg",
      url: "https://www.web3audience.io/",
      width: 180,
      height: 48,
    },
    {
      id: 3,
      name: "6Degrees",
      logo: "/images/clients/6degrees.png",
      url: "https://www.6degrees.co/",
      width: 140,
      height: 48,
    },
    {
      id: 4,
      name: "Mitti",
      logo: "/images/clients/mitti.png",
      url: "https://mitti.com/",
      width: 120,
      height: 48,
    },
  ];

  return (
    <section className="py-12 bg-gray-50" id="companies">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold text-center mb-8">
          Trusted by teams across industries
        </h2>

        <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
          {categories.map((category, index) => (
            <React.Fragment key={category}>
              {index > 0 && (
                <span className="hidden md:inline-block text-gray-300">•</span>
              )}
              <span className="text-gray-600">{category}</span>
            </React.Fragment>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mb-12 bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 p-6">
              <Image
                src="/images/elliot.jpg"
                alt="Elliot Garreffa"
                width={300}
                height={300}
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
            <div className="md:w-2/3 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="/images/clients/clippit.avif"
                  alt="Clippit.fm Logo"
                  width={100}
                  height={30}
                  className="object-contain"
                  unoptimized
                />
                <span className="text-sm text-gray-500">Case Study</span>
              </div>
              <blockquote className="text-lg md:text-xl font-medium text-gray-900 italic mb-4">
                &ldquo;Ghostteam helped Clippit.fm grow from 0 to 1k daily
                downloads and $6.6k MRR in 2 months, without a marketing
                team.&ldquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <p className="font-semibold">Elliot Garreffa</p>
                <p className="text-gray-600">Co-Founder, Clippit</p>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto mb-12 bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 p-6">
              <Image
                src="/images/saad.png"
                alt="Saal El Boury"
                width={300}
                height={300}
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
            <div className="md:w-2/3 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="/images/clients/web3audience.jpeg"
                  alt="Web3Audience Logo"
                  width={100}
                  height={30}
                  className="object-contain"
                  unoptimized
                />
                <span className="text-sm text-gray-500">Case Study</span>
              </div>
              <blockquote className="text-lg md:text-xl font-medium text-gray-900 italic mb-4">
                &ldquo;Ghost Team&apos;s content engine exploded our F500 client
                launch—25K new followers, 10 viral posts, and 16K Discord
                members in just six weeks.&ldquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <p className="font-semibold">Saal El Boury</p>
                <p className="text-gray-600">Founder, Web3Audience</p>
              </div>
            </div>
          </div>
        </div>
        <Separator className="mb-8" />

        <Carousel
          className="w-full max-w-5xl mx-auto"
          opts={{
            align: "center",
            loop: true,
          }}
        >
          <div className="flex justify-center mb-6">
            <CarouselPrevious className="relative static mr-2" />
            <CarouselNext className="relative static ml-2" />
          </div>
          <CarouselContent>
            {clientLogos.map((client) => (
              <CarouselItem
                key={client.id}
                className="basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <Card className="h-32 flex items-center justify-center bg-white border border-gray-100">
                  <a
                    href={client.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full h-full transition-all duration-300"
                  >
                    <div className="relative h-full w-full flex items-center justify-center p-4">
                      <Image
                        src={client.logo}
                        alt={client.name}
                        width={client.width}
                        height={client.height}
                        className="object-contain max-h-[80%] max-w-[80%]"
                        unoptimized={
                          client.logo.endsWith(".avif") ||
                          client.logo.endsWith(".jpeg")
                        }
                      />
                    </div>
                  </a>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default Companies;
