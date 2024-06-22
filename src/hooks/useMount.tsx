"use client";
import { useEffect, useState } from "react";

const useMount = (isMounted: boolean) => {
  const [checkMounting, setCheckMouting] = useState<boolean>(isMounted);

  useEffect(() => {
    setCheckMouting(true);
  }, []);

  return checkMounting;
};

export default useMount;
