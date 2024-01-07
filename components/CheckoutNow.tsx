import { urlFor } from "@/app/lib/sanity";
import { Button } from "./ui/button";
import { useShoppingCart } from "use-shopping-cart";
import { ProductCart } from "./AddToBag";

export default function CheckoutNow({
  name,
  description,
  price,
  currency,
  image,
  price_id,
}: ProductCart) {
  const product = {
    name,
    description,
    price,
    currency,
    image: urlFor(image).url(),
    price_id,
  };

  const { checkoutSingleItem } = useShoppingCart();

  return (
    <Button onClick={() => checkoutSingleItem(product.price_id)}>
      Checkout Now
    </Button>
  );
}
