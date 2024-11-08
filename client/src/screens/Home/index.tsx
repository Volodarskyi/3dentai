"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const HomeScreen = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/scan");
  }, [router]);

  return <div className="min-h-full" />;
};

export default HomeScreen;
