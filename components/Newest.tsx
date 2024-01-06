import { IProducts } from "@/app/interface";
import { client } from "@/app/lib/sanity";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 30; // revalidat at most 30 seconds
//? Get 4 newest products from Sanity
async function getNewest() {
  const query = `*[_type == "product"][0...4] | order(_createdAt asc) {
    name,
    price,
    _id,
    "slug" : slug.current,
    "categoryName": category->name ,
    "imageUrl": image[0].asset->url
  }`;
  const data = await client.fetch(query);
  return data;
}

export default async function Newest() {
  const newest: IProducts[] = await getNewest();

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Our Newest Product
          </h2>
          <Link href="/all" className="text-primary flex items-center gap-x-1">
            See All
            <span>
              <ArrowRight />
            </span>
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ">
          {newest.map(({ _id, categoryName, imageUrl, name, price, slug }) => (
            <div key={_id} className="group relative">
              <div className="aspect-squaer w-full overflow-hidden rounded-sm bg-gray-200 group-hover:opacity-75 lg:h-80">
                <Image
                  src={imageUrl}
                  alt={name}
                  className="w-full h-full object-coveer object-center lg:h-full lg:w-full "
                  width={300}
                  height={300}
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link href={`/product/${slug}`}>{name}</Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{categoryName}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">${price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
