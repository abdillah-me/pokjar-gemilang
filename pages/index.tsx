import type { NextPage } from "next";
import HomePage from "./home";
import Layout from "../src/components/Layout/Layout";

const Home: NextPage = () => {
    return (
        <Layout>
            <HomePage />
        </Layout>
    );
};

export default Home;
