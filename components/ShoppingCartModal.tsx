"use client";
import { useShoppingCart } from "use-shopping-cart";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import Image from "next/image";
import { Button } from "./ui/button";

export default function ShoppingCartModal() {
  const {
    cartCount,
    shouldDisplayCart,
    handleCartClick,
    cartDetails,
    removeItem,
    totalPrice,
    redirectToCheckout,
  } = useShoppingCart();

  async function handleCheckout(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    try {
      const result = await redirectToCheckout();
      if (result.error) throw new Error(result.error.message);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Sheet open={shouldDisplayCart} onOpenChange={() => handleCartClick()}>
      <SheetContent className="sm:max-w w-[90vw]">
        <SheetHeader>
          <SheetTitle>Shoping Cart</SheetTitle>
        </SheetHeader>
        <div className="h-full flex flex-col justify-between">
          <div className="mt-8 flex-1 overflow-y-auto">
            <ul className="my-6 divide-y divide-gray-200">
              {cartCount === 0 ? (
                <h1 className="py-6">You dont have any items</h1>
              ) : (
                <>
                  {Object.values(cartDetails ?? {}).map((product) => (
                    <li key={product.id} className="py-6 flex">
                      <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                        <Image
                          src={product.image as string}
                          alt={product.name}
                          className="w-full h-full object-center object-cover"
                          width={100}
                          height={100}
                        />
                      </div>
                      <div className="ml-4 flex-1 flex flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-800">
                            <h3>{product.name}</h3>
                            <p className="ml-4">${product.price}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                            {product.description}
                          </p>
                        </div>
                        <div className="flex-1 flex items-end justify-between text-sm">
                          <p className="text-gray-500">
                            Qty {product.quantity}
                          </p>
                          <div className="flex">
                            <button
                              type="button"
                              className="font-medium text-primary hover:text-primary-dark"
                              onClick={() => removeItem(product.id)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${totalPrice}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
              <Button
                className="w-full"
                onClick={(event) => handleCheckout(event)}
              >
                Checkout
              </Button>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or{" "}
                <button
                  type="button"
                  className="text-primary font-medium hover:text-primary-dark"
                  onClick={() => handleCartClick()}
                >
                  Continue Shopping
                </button>
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
