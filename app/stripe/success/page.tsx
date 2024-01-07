import { Button } from "@/components/ui/button";
import { CheckCheck } from "lucide-react";
import Link from "next/link";

export default function SuccessStripe() {
  return (
    <div className="h-screen">
      <div className="mt-32 md:max-w-[50vw] mx-auto">
        <CheckCheck className="text-green-600 w-16 h-16 mx-auto my-6" />
        <div className="text-center">
          <h1 className="md:text-2xl text-3xl text-gray-900 font-semibold text-center ">
            Payment Successful
          </h1>
          <p className="text-gray-500 mt-2 my-2">
            Thank you for your purchase. We will send you a confirmation email
            shortly.
          </p>
          <Button asChild className="mt-5">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
