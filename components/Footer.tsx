import { Github, Linkedin } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className=" border-t py-10">
      <div className="max-w-7xl py-10 px-5 md:p-0 space-y-5  mx-auto flex justify-between md:items-end flex-col md:flex-row">
        <div className="space-y-10">
          <div className="space-y-2 w-full sm:w-96">
            <h1 className="text-3xl font-bold">Tech Blogs</h1>
            <p className="">
              Unlock a world of coding insights and knowledge on our tech blog,
              where each article helps you master programming and stay ahead in
              the dynamic tech landscape
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="https://github.com/LitPreet"><Github className="w-5 h-5" /></Link>
            <Link href={"https://in.linkedin.com/in/preet-bhardwaj-9b04a724b?trk=people-guest_people_search-card&original_referer=https%3A%2F%2Fwww.linkedin.com%2F"}><Linkedin className="w-5 h-5" /></Link>
          </div>
        </div>

        <h1 className="text-sm">
          &copy; 2024 Preet Bhardwaj.All right reserved
        </h1>
      </div>
    </footer>
  );
}
