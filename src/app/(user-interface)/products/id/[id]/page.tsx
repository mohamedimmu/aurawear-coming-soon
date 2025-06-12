import { getWixServerClient } from "@/lib/wix-client-server";
import { getProductById } from "@/wix-api/products";
import { notFound, redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ params, searchParams }: PageProps) {
  const { q } = await searchParams;
  const { id } = await params; // dynamic route name can be accessed [id]
  const wixClient = await getWixServerClient();
  const product = await getProductById(wixClient, id);
  if (!product) notFound();

  //redirect detail product page
  const queryString = typeof q === "string" ? q : "";
  redirect(`/products/${product?.slug}?${new URLSearchParams(queryString)}`);
}
