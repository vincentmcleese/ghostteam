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

  const companyLogos = [
    {
      id: 1,
      name: "Company One",
      logo: "/logos/company1.svg",
      url: "#",
    },
    {
      id: 2,
      name: "Company Two",
      logo: "/logos/company2.svg",
      url: "#",
    },
    {
      id: 3,
      name: "Company Three",
      logo: "/logos/company3.svg",
      url: "#",
    },
    {
      id: 4,
      name: "Company Four",
      logo: "/logos/company4.svg",
      url: "#",
    },
    {
      id: 5,
      name: "Company Five",
      logo: "/logos/company5.svg",
      url: "#",
    },
    {
      id: 6,
      name: "Company Six",
      logo: "/logos/company6.svg",
      url: "#",
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

        <Separator className="mb-8" />

        <Carousel
          className="w-full max-w-5xl mx-auto"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {companyLogos.map((company) => (
              <CarouselItem
                key={company.id}
                className="md:basis-1/3 lg:basis-1/4"
              >
                <Card className="h-32 flex items-center justify-center bg-white border border-gray-100">
                  {company.logo ? (
                    <a
                      href={company.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full h-full grayscale hover:grayscale-0 transition-all duration-300"
                    >
                      <div className="relative h-20 w-full">
                        <Image
                          src={company.logo}
                          alt={company.name}
                          width={96}
                          height={48}
                          className="object-contain mx-auto"
                        />
                      </div>
                    </a>
                  ) : (
                    <div className="bg-gray-200 w-full h-full rounded flex items-center justify-center">
                      <span className="text-gray-500 text-xs">
                        {company.name}
                      </span>
                    </div>
                  )}
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-6">
            <CarouselPrevious className="relative static mr-2" />
            <CarouselNext className="relative static ml-2" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default Companies;
