import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {  readBlogAdmin, upadteBlogById } from "@/lib/actions/blog";
import DeleteAlert from "./DeleteAlert";
import SwitchForm from "./SwitchForm";
import { BlogFormSchemaType } from "../schema";
import Link from "next/link";

export default async function BlogTable() {
  const { data: blogs } = await readBlogAdmin();

  return (
    <div className="rounded-md bg-graident-dark border-[0.5px] overflow-y-scroll overflow-x-auto ">
      <div className="w-[800px] md:w-full">
        <div className="grid grid-cols-5 border-b p-5 dark:text-gray-500">
          <h1 className=" col-span-2">Title</h1>
          <h1>Premium</h1>
          <h1>Publish</h1>
        </div>
        {blogs?.map((blog, i) => {
          const updatePremium = upadteBlogById.bind(null,blog.id,{is_premium: !blog.is_premium} as BlogFormSchemaType)
          const updatePublish = upadteBlogById.bind(null,blog.id,{is_published: !blog.is_published} as BlogFormSchemaType)
          return (
          <div className="grid grid-cols-5 p-5" key={i}>
            <h1 className="dark:text-gray-200 col-span-2 font-lg font-medium">
              {blog.title}
            </h1>
            <SwitchForm checked={blog.is_premium} name="premium" onToggle={updatePremium}/>
            <SwitchForm checked={blog.is_published} name="publish" onToggle={updatePublish}/>
          

            <Actions id={blog.id}/>
          </div>
          )
        })}
      </div>
    </div>
  );
}

const Actions = ({id}:{id:string}) => {
  return (
    <div className="flex items-center gap-2 md:flex-wrap">
    <Link href={`/blog/${id}`}>
				<Button className="flex gap-2 items-center" variant="outline">
					<Eye />
					View
				</Button>
			</Link>
      <DeleteAlert blogId={id}/>
      <Link href={"/dashboard/blog/edit/"+id}>
      <Button variant={"outline"} className="flex items-center gap-2">
        <Pencil />
        Edit
      </Button>
      </Link>
    </div>
  );
};
