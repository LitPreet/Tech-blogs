import { useUser } from "@/lib/store/user";
import { cn } from "@/lib/utils";
import { Zap } from "lucide-react";
import React, { useTransition } from "react";
import LoginForm from "../nav/LoginForm";
import { checkout } from "@/lib/actions/Stripe";
import { usePathname } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";

export default function Checkout() {
  const [isPending, startTransition] = useTransition();
  const user = useUser((state) => state.user);
  const pathName = usePathname();
  console.log(location.origin + pathName);
  if (!user) {
    return (
      <div className="flex items-center justify-center h-96 gap-2">
        <LoginForm /> to continue
      </div>
    );
  }

  const handleCheckOut = (e: any) => {
    e.preventDefault();
    startTransition(async() => {
       const data = JSON.parse(await checkout(user?.email!, location.origin + pathName));
       const result = await loadStripe(
           process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!
        );
        await result?.redirectToCheckout({ sessionId: data.id });
    })
    };

  return (
    <form
      onSubmit={handleCheckOut}
      className={cn(
        "flex items-center  w-full justify-center h-96 ",
        { hidden: !user },
        { " animate-pulse": isPending }
      )}
    >
      <button
        className="ring-1 ring-green-500 p-10 rounded-md text-center"
        type="submit"
      >
        <h1 className="uppercase  font-bold text-2xl text-green-500 flex items-center gap-2">
          <Zap
            className={cn(
              "animate-bounce w-5 h-5",
              !isPending ? "animate-bounce" : "animate-spin"
            )}
          />
          Upgrade to pro
        </h1>
        <p className="text-sm text-gray-500">Unlock all Daily blog contents</p>
      </button>
    </form>
  );
}
