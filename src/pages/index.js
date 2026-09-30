import Head from "next/head";

import Hero from "../components/Hero/Hero";
import Projects from "../components/Projects/Projects";
import Technologies from "../components/Technologies/Technologies";
import Timeline from "../components/TimeLine/TimeLine";
import { Layout } from "../layout/Layout";

const Home = () => (
  <Layout>
    <Head>
      <title>David Silveira - Software Engineer</title>
      <meta
        name="description"
        content="Lead software engineer building AI products end to end: Django, React, graph databases, and AWS."
      />
    </Head>
    <Hero />
    <Timeline />
    <Technologies />
    <Projects />
  </Layout>
);

export default Home;
