import AppLayout from "../components/AppLayout";
import Head from "next/head";

const Home = () => {
  return (
    <>
      <Head>
        <title>index | Node Bird</title>
      </Head>
      <AppLayout>
        <div>내 프로필</div>
      </AppLayout>
    </>
  );
};

export default Home;
