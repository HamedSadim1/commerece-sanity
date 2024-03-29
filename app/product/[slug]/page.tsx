import { IProduct } from "@/app/interface";
import { client } from "@/app/lib/sanity";
import AddToBag from "@/components/AddToBag";
import CheckoutNow from "@/components/CheckoutNow";
import ImageGallery from "@/components/ImageGallery";
import { Button } from "@/components/ui/button";
import { Star, Truck } from "lucide-react";

async function getProducts(slug: string) {
  const query = `*[_type == "product" && slug.current == "${slug}"] [0]{
    name,
    price,
    description,
    _id,
    "slug" : slug.current,
    "categoryName": category->name,
    image,
    price_id,
  }`;

  const products = await client.fetch(query);
  return products;
}

interface Props {
  params: {
    slug: string;
  };
}
export const dynamic = "force-dynamic";
export default async function ProductPage({ params: { slug } }: Props) {
  const product: IProduct = await getProducts(slug);

  return (
    <div className="bg-white ">
      <div className="mx-auto max-w-screen-xl px-4  md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <ImageGallery images={product.image} />
          <div className="md:py-8">
            <div className="mb-2 mb:mb-3">
              <span className=" mb-0.5 inline-block text-gray-500">
                {product.categoryName}
              </span>
              <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
                {product.name}
              </h2>
            </div>
            <div className="mb-6 flex items-center gap-3 md:mb-10">
              <Button className="rounded-full gap-x-2">
                <span className="text-sm">4.2</span>
                <Star className="h-5 w-5" />
              </Button>
              <span className="text-sm text-gray-500 duration-100">
                56 ratings
              </span>
            </div>
            <div className="mb-4 ">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-gray-800 md:text-2xl">
                  ${product.price}
                </span>
                <span>
                  <span className="mb-0.5 text-red-500 line-through">
                    ${product.price + 30}
                  </span>
                  <span className="text-sm text-gray-500"> (20% OFF)</span>
                </span>
              </div>
              <span>
                <span className="text-sm text-gray-500">
                  incl Vat plus shipping
                </span>
              </span>
            </div>
            <div className="mb-6 flex items-center gap-2 text-gray-500">
              <Truck className="w-6 h-6" />
              <span className="text-sm"> 2-4 Day Shipping</span>
            </div>
            <div className="flex gap-2.5">
              <AddToBag
                name={product.name}
                description={product.description}
                price={product.price}
                currency="USD"
                image={product.image[0]}
                price_id={product.price_id}
              />
              <CheckoutNow
                name={product.name}
                description={product.description}
                price={product.price}
                currency="USD"
                image={product.image[0]}
                price_id={product.price_id}
              />
            </div>
            <p className="mt-12 text-base text-gray-500 tracking-wide">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
