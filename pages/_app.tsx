import React from "react";
import { useRouter } from "next/router";
import "../styles/global.scss";

function MyApp({ Component, pageProps }: any) {
  const router = useRouter();

  return (
    <div>
      <Component {...pageProps} key={router.route} />
    </div>
  );
}

export default MyApp;
