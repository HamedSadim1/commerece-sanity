"use client";
import { urlFor } from "@/app/lib/sanity";
import Image from "next/image";
import { useState } from "react";

interface ImageGalleryProps {
  images: any[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [bigImage, setBigImage] = useState(images[0]);
  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <div className="order-last flex gap-4 lg:order-none lg:flex-col">
        {images.map((image, index) => (
          <div key={index} className="overflow-hidden rounded-lg bg-gray-100">
            <Image
              key={index}
              src={urlFor(image).url()}
              alt="Product Image"
              width={200}
              height={200}
              className="w-full h-full object-cover object-center cursor-pointer"
              onClick={() => setBigImage(image)}
            />
          </div>
        ))}
      </div>
      <div className="relative overflow-hidden rounded-lg bg-gray-100 lg:col-span-4">
        <Image
          src={urlFor(bigImage).url()}
          alt="Product Image"
          width={500}
          height={500}
          className="w-full h-full object-cover object-center"
        />
        <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white">
          Sale
        </span>
      </div>
    </div>
  );
}
