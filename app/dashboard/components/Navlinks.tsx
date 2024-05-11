'use client'
import { cn } from "@/lib/utils"
import { CircleUserRound, NotebookText } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation";

export default function Navlinks() {
    const pathname = usePathname();
    const link = [{
        href: '/dashboard',
        text: '/dashboard',
        Icon: <NotebookText />
    },
    {
        href: '/dashboard/user',
        text: '/user',
        Icon: <CircleUserRound />
    },
]

  return (
    <div className="flex items-center gap-5 border-b pb-2">
      {
        link.map((link, index) => {
            return <Link href={link.href} key={index} className={cn(
                "text-sm text-gray-400 flex  items-center gap-1 hover:underline transition-all",
                { "text-blue-500 underline": pathname === link.href }
            )}>{link.Icon}{link.text}</Link>
        })
      }
    </div>
  )
}


