'use client'

import Link from "next/link";
import HoverUnderLine from "./HoverUnderLine";
import LoginForm from "./LoginForm";
import { useUser } from "@/lib/store/user";
import Profile from "./Profile";

export default  function Navbar() {
    const user = useUser((state) => state.user)
  return (
    <nav className="w-full flex justify-between items-center  p-5 xl:p-0">
      <HoverUnderLine>
        <Link href={"/"} className="font-bold text-2xl">
          TechBlogs
        </Link>
      </HoverUnderLine>
      {
        user?.id ? <Profile /> : <LoginForm /> 
      }
      
    </nav>
  );
}
