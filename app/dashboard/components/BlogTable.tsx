import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch"


export default function BlogTable() {
  return (
    <div className="rounded-md bg-graident-dark border-[0.5px] overflow-y-scroll overflow-x-auto ">
        <div className="w-[800px] md:w-full">
      <div className="grid grid-cols-5 border-b p-5 dark:text-gray-500">
        <h1 className=" col-span-2">Title</h1>
        <h1>Premium</h1>
        <h1>Publish</h1>
      </div>
      <div className="grid grid-cols-5 p-5">
        <h1 className="dark:text-gray-200 col-span-2 font-lg font-medium">
          Blog Title
        </h1>
        <Switch checked={false}/>
        <Switch checked={true}/>
        
        <Actions />
      </div>
    </div>
    </div>
  );
}

const Actions = () => {
  return (
    <div className="flex items-center gap-2 md:flex-wrap">
      <Button variant={'outline'} className="flex items-center gap-2"><Eye />View</Button>
      <Button variant={'outline'} className="flex items-center gap-2"><Trash2 />Delete</Button>
      <Button variant={'outline'}  className="flex items-center gap-2"><Pencil />Edit</Button>
    </div>
  );
};