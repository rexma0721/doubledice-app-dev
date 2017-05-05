// Next
import type { NextPage } from "next";
import Head from "next/head";

// Components
import FullLayout from "components/layouts/fullLayOut";
import GetStartedPage from "components/getStartedPage/index";

const GetStarted: NextPage = () => {
  return (
    <>
      <Head>
        <title>Get Started</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
      </Head>
      <FullLayout>
        <GetStartedPage />
      </FullLayout>
    </>
  );
};

export default GetStarted;
