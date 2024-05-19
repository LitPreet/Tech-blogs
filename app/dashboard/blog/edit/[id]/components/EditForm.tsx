'use client'

import BlogForm from '@/app/dashboard/components/BlogForm'
import { BlogFormSchemaType } from '@/app/dashboard/schema'
import { toast } from '@/components/ui/use-toast'
import { upadteBlogDetail } from '@/lib/actions/blog'
import { IBlogDetial } from '@/lib/types'
import { PostgrestSingleResponse } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function EditForm({blog}:{blog:IBlogDetial}) {
    const router = useRouter();
    const handleEdit = async (data: BlogFormSchemaType) => {
		const result = JSON.parse(
			await upadteBlogDetail(blog?.id!, data)
		) as PostgrestSingleResponse<null>;

		// const {error} = JSON.parse(result)
		// const result = JSON.parse(
		// 	await updateBlogDetail(blog?.id!, data)
		// ) as PostgrestSingleResponse<null>;
		if (result?.error) {
			toast({
				title: "Fail to update ",
				description: (
					<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
						<code className="text-white">
							{result?.error?.message}
						</code>
					</pre>
				),
			});
		} else {
			toast({
				title: "Successfully update 🎉",
			});
			router.push("/dashboard");
		}
	};
	
  return (
   <BlogForm onHandleSubmit={handleEdit} blog={blog}/>
  )
}
