import Head from "next/head";
import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";
import { getProviders, getSession, useSession } from "next-auth/react";
import Login from "../components/Login";
import Modal from "../components/Modal";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modatAtom";
import { useRouter } from "next/router";

export default function Home({ trendingresults, followresults, providers }) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  if (!session) return <Login providers={providers} />;
  return (
    <div>
      <Head>
        <title>Twitter</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-black min-h-screen max-w-[1500px] mx-auto flex">
        <Sidebar />
        <Feed />
        <Widgets
          trendingresults={trendingresults}
          followresults={followresults}
        />
        {isOpen && <Modal />}
      </main>
    </div>
  );
}
export const getServerSideProps = async (ctx) => {
  const trendingresults = await fetch("https://jsonkeeper.com/b/NKEV").then(
    (res) => res.json()
  );
  const followresults = await fetch("https://jsonkeeper.com/b/WWMJ").then(
    (res) => res.json()
  );
  const providers = await getProviders();
  const session = await getSession(ctx);
  return {
    props: {
      trendingresults,
      followresults,
      providers,
      session,
    },
  };
};
