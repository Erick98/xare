import getSite from "@/firebase/firestore/getSite";
import { notFound } from "next/navigation";
import Header from "./Header";

export async function generateMetadata({ params }) {
  const { subdomain } = params;
  const data = await getSite(subdomain);

  if (!data) {
    return notFound();
  }

  const title = `${data.name} | ${data.title}`;

  return {
    title,
    description: data.description,
    openGraph: {
      title,
      images: [data.cover],
    },
  };
}

export default async function Layout({ children, params }) {
  const { subdomain } = params;

  const site = await getSite(subdomain);

  return (
    <div className="bg-white">
      <Header site={site} />
      {children}
    </div>
  );
}
