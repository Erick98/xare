import getSite from "@/firebase/firestore/getSite";
import Head from "next/head";

export default async function Layout({ params, children }) {
  const { subdomain } = params;
  const site = await getSite(subdomain);

  return (
    <>
      <Head>
        <link rel="icon" type="image/ico" href={site.logo} />
      </Head>
      {children}
    </>
  );
}
