'use server'

import { BlogFormSchemaType } from "@/app/dashboard/schema";
import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "../supabase";


const DASHBOARD = "/dashboard"

export async function createBlog(data: BlogFormSchemaType) {
  // const { ["content"]: excludedKey, ...blog } = data;
  const {content,...blog} = data
  const supabase = await createSupabaseServerClient()
  const resultBlog = await supabase.from("blog").insert(blog).select("id").single();
  if (resultBlog.error) {
    return JSON.stringify(resultBlog)
  } else {
    const result = await supabase.from("blog_content").insert({ blog_id: resultBlog?.data?.id!, content })
    revalidatePath(DASHBOARD);
    return JSON.stringify(result)
  }
}

export async function readBlog() {
  const supabase = await createSupabaseServerClient()
  return supabase.from('blog').select("*").eq("is_published", true).order("created_at", { ascending: true })
}
export async function readBlogAdmin() {
  const supabase = await createSupabaseServerClient()
  return supabase.from('blog').select("*").order("created_at", { ascending: true })
}

export async function deleteBlogById(blogId: string) {
  const supabase = await createSupabaseServerClient()
  const result = await supabase.from('blog').delete().eq("id", blogId)
  revalidatePath(DASHBOARD)
  return JSON.stringify(result)
}

export async function upadteBlogById(blogId: string, data: BlogFormSchemaType) {
  const supabase = await createSupabaseServerClient()
  const result = await supabase.from('blog').update(data).eq("id", blogId)
  revalidatePath(DASHBOARD)
  revalidatePath("/blog/"+blogId)
  return JSON.stringify(result)
}

export async function readBlogContentById(blogId: string) {
  const supabase = await createSupabaseServerClient()
	return await supabase
		.from("blog")
		.select("*,blog_content(*)")
		.eq("id", blogId)
		.single();
}

export async function upadteBlogDetail(blogId: string, data: BlogFormSchemaType) {
  // const {["content"]: excludedKey, ...blog } = data;
  const {content, ...blog} = data;
  const supabase = await createSupabaseServerClient()
  const resultBlog = await supabase.from('blog').update(blog).eq("id", blogId)
  if (resultBlog.error?.message && !resultBlog.data) {
    return JSON.stringify(resultBlog)
  }
  else {
    const result = await supabase
    .from("blog_content")
    .update({content})
    .eq("blog_id", blogId);
    revalidatePath(DASHBOARD)
    return JSON.stringify(result)
  }
}