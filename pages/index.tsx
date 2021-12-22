import React from "react";
import Head from "next/head";
import Calendar from "../components/Calendar";

interface indexProps {}

const index: React.FC<indexProps> = ({}) => {
  return (
    <>
      <Head>
        <title>Float &mdash; Calendar Test </title>
        <link rel="icon" href="svg/favicon.svg" />
      </Head>
      <div className="layout">
        <nav className="sidebar">
          <div className="top">
            <div className="circle">&nbsp;</div>
            <div className="text">
              <h1 className="text__h1">&nbsp;</h1>
              <h1 className="text__h1">&nbsp;</h1>
            </div>
          </div>
        </nav>

        <main className="content">
          <h1>Overview</h1>
          <Calendar />
        </main>
      </div>
    </>
  );
};

export default index;
