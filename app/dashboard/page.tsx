import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import BlogTable from "./components/BlogTable";

export default function DashBoard() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Blogs</h1>
        <Link href="/dashboard/blog/create">
          <Button className="flex items-center gap-2 " variant="outline">
            Create   <Plus />
          </Button>
        </Link>
      </div>
      <BlogTable />
    </div>
  );
}
