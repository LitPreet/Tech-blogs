import { readBlogContentById } from "@/lib/actions/blog";
import EditForm from "./components/EditForm";
import { IBlogDetial } from "@/lib/types";

export default async function Edit({ params }: { params: { id: string } }) {
  const { data: blog } = await readBlogContentById(params.id);
  return <EditForm blog={blog as IBlogDetial} />
}
