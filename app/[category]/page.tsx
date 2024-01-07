import Link from "next/link";
import { IProducts } from "../interface";
import { client } from "../lib/sanity";
import Image from "next/image";

async function getCategroy(category: string) {
  // Use a different query based on whether a category is specified
  const query =
    category !== "all"
      ? `*[_type == "product" && category->name == "${category}"]{
       name,
       price,
       description,
       _id,
       "slug": slug.current,
       "categoryName": category->name,
       "imageUrl": image[0].asset->url
     }`
      : `*[_type == "product"]{
       name,
       price,
       description,
       _id,
       "slug": slug.current,
       "categoryName": category->name,
       "imageUrl": image[0].asset->url
     }`;

  const categoryProduct = await client.fetch(query);
  return categoryProduct;
}

export const dynamic = 'force-dynamic'
export default async function CategroyPage({
  params: { category },
}: {
  params: { category: string };
}) {
  const categoryProducts: IProducts[] = await getCategroy(category);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4  sm:px-6  lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Our Product for {category}
          </h2>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ">
          {categoryProducts.map(
            ({ _id, categoryName, imageUrl, name, price, slug }) => (
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
            )
          )}
        </div>
      </div>
    </div>
  );
}
