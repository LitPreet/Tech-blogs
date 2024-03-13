"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Eye, PencilIcon, Rocket, Save, Star } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import MarkdownPreview from "@/components/markdown/MarkdownPreview";

const formSchema = z
  .object({
    title: z.string().min(2, {
      message: "Title must be at least 2 characters.",
    }),
    image_url: z.string().url({
      message: "Invalid url",
    }),
    content: z.string().min(2, {
      message: "contennt must be at least 2 characters.",
    }),
    is_published: z.boolean(),
    is_premium: z.boolean(),
  })
  .refine((data) => {
    const image_url = data.image_url;
    try {
      const url = new URL(image_url);
      return url.hostname === "images.unsplash.com";
    } catch (er) {
      return false;
    }
  },{message: "Currently we are supporting only the image from unsplash",path:["image_url"]});

export default function BlogForm() {
  const [isPreview, setPreview] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    mode: "all",
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      image_url: "",
      is_premium: false,
      is_published: true,
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full border rounded-md space-y-8 pb-10"
      >
        <div className="p-5 flex items-center justify-between flex-wrap gap-5">
          <div className="flex gap-5 items-center flex-wrap">
            <span
              role="button"
              tabIndex={0}
              className="flex items-center gap-1 border bg-zinc-700 p-2 rounded-md hover:ring-2 hover:ring-zinc-400 transition-all"
              onClick={() =>
                setPreview(
                  !isPreview && !form.getFieldState("image_url").invalid
                )
              }
            >
              {isPreview ? (
                <>
                  <PencilIcon /> Edit
                </>
              ) : (
                <>
                  <Eye /> Preview
                </>
              )}
            </span>
            <FormField
              control={form.control}
              name="is_premium"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-1 border bg-zinc-700 p-2 rounded-md">
                      <Star />
                      <span>Premium</span>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="is_published"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-1 border bg-zinc-700 p-2 rounded-md">
                      <Rocket />
                      <span>Publish</span>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button
            className="flex items-center gap-1"
            disabled={!form.formState.isValid}
          >
            <Save /> Save
          </Button>
        </div>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div
                  className={cn(
                    `p-2 w-full flex break-words gap-2`,
                    isPreview ? "divide-x-0" : "divide-x"
                  )}
                >
                  <Input
                    placeholder="title"
                    {...field}
                    className={cn(
                      "border-none text-lg font-medium leading-relaxed",
                      isPreview ? "w-0 p-0" : "w-full lg:w-1/2"
                    )}
                  />
                  <div
                    className={cn(
                      "lg-px-10",
                      isPreview
                        ? "mx-auto w-full lg:w-4/5"
                        : "w-1/2 lg:block hidden"
                    )}
                  >
                    <h1 className="text-3xl font-medium">
                      {form.getValues().title}
                    </h1>
                  </div>
                </div>
              </FormControl>
              {form.getFieldState("title").invalid &&
                form.getValues().title && <FormMessage />}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image_url"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div
                  className={cn(
                    `p-2 w-full flex break-words gap-2`,
                    isPreview ? "divide-x-0" : "divide-x"
                  )}
                >
                  <Input
                    placeholder="image url"
                    {...field}
                    className={cn(
                      "border-none text-lg font-medium leading-relaxed",
                      isPreview ? "w-0 p-0" : "w-full lg:w-1/2"
                    )}
                  />
                  <div
                    className={cn(
                      "lg-px-10",
                      isPreview
                        ? "mx-auto w-full lg:w-4/5"
                        : "w-1/2 lg:block hidden"
                    )}
                  >
                    <h1 className="text-3xl font-medium">
                      {!isPreview ? (
                        <>
                          <p>Click on preview to see image</p>
                        </>
                      ) : (
                        <div className="relative h-80 mt-10 border rounded-md">
                          <Image
                            src={form.getValues().image_url}
                            alt="preview"
                            fill
                            className="object-cover object-center rounded-md"
                          />
                        </div>
                      )}
                    </h1>
                  </div>
                </div>
              </FormControl>
              {form.getFieldState("image_url").invalid &&
                form.getValues().image_url && (
                  <div className="p-2">
                    {" "}
                    <FormMessage />
                  </div>
                )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div
                  className={cn(
                    `p-2 w-full flex break-words gap-2`,
                    isPreview ? "divide-x-0" : "divide-x h-70vh"
                  )}
                >
                  <Textarea
                    placeholder="content"
                    {...field}
                    className={cn(
                      "border-none text-lg font-medium leading-relaxed resize-none h-full",
                      isPreview ? "w-0 p-0" : "w-full lg:w-1/2"
                    )}
                  />
                  <div
                    className={cn(
                      "overflow-y-auto",
                      isPreview
                        ? "mx-auto w-full lg:w-4/5"
                        : "w-1/2 lg:block hidden"
                    )}
                  >
                    <MarkdownPreview content={form.getValues().content} />
                    {/* <h1 className="text-3xl font-medium">
                      
                    </h1> */}
                  </div>
                </div>
              </FormControl>
              {form.getFieldState("content").invalid &&
                form.getValues().content && <FormMessage />}
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
