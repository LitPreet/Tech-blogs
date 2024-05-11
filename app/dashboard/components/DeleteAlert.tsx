'use client'
import { Button } from "@/components/ui/button";
import { LoaderCircle, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteBlogById } from "@/lib/actions/blog";
import { useTransition } from "react";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

export default function DeleteAlert({ blogId }: { blogId: string }) {
    const [isPending, setTransition] = useTransition();
    const onSubmit = async(e:any) => {
        e.preventDefault();
        setTransition(async() => {
           const res =  await deleteBlogById(blogId)
           const {error} = JSON.parse(res);

           if(error?.message){
            toast({
              title:"Failed to delete blog",
              description: (
                  <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
                      <code className="text-white">
                          {error.message}
                      </code>
                  </pre>
              )
           })

           }else{
            toast({
              title:"Successfully deleted" ,
           })
           }
        })
    }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"outline"} className="flex items-center gap-2">
          <Trash2 />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
         <form onSubmit={onSubmit} >
            <Button className="flex gap-2 items-center"><LoaderCircle className={cn("animate-spin",{"hidden": !isPending} )}/>Continue</Button>
         </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
