import type { NextPage } from "next";
import { Content } from "../components/Content";
import { Layout } from "../components/Layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <Content />
    </Layout>
  );
};

export default Home;
