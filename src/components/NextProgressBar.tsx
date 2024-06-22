"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
const NextProgressBar = () => {
  return (
    <>
      <ProgressBar
        height="2px"
        color="#0b57d0"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default NextProgressBar;
