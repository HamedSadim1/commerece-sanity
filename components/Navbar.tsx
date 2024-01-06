"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { ShoppingBag } from "lucide-react";
import { useShoppingCart } from "use-shopping-cart";

// Links for the navbar
const links = [
  { name: "Home", href: "/" },
  { name: "Men", href: "/Men" },
  { name: "Women", href: "/Women" },
  { name: "Teens", href: "/Teens" },
];

export default function Navbar() {
  const pathName = usePathname();
  const { handleCartClick } = useShoppingCart();

  return (
    <header className="mb-8 border-b">
      <div className="flex items-center justify-between mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl">
        <Link href="/">
          <h1 className="text-2xl md:text-4xl font-bold">
            Next<span className="text-primary">Commerece</span>
          </h1>
        </Link>
        {/* Navbar */}
        <nav className="hidden gap-12 lg:flex 2xl:ml-16">
          {links.map(({ name, href }) => (
            <div key={name}>
              {pathName === href ? ( // If the current path is the same as the link's href, then add the active class
                <Link href={href} className="text-lg font-medium text-primary">
                  {name}
                </Link>
              ) : (
                <Link
                  href={href}
                  className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-primary"
                >
                  {name}
                </Link>
              )}
            </div>
          ))}
        </nav>
        <div className="flex divide-x border-r sm:border-l">
          <Button
            variant="outline"
            className="flex flex-col gap-y-1.5 h-12 w-12 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-none"
            onClick={() => handleCartClick()}
          >
            <ShoppingBag />
            <span className="hidden text-xs font-semi-bold text-gray-500 sm:block">
              Cart
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
}
