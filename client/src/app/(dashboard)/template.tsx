"use client";

import { FC, ReactNode, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";

import Loading from "@/components/UI/Loading";
import { useStores } from "@/hooks/useStores";

interface Props {
  children: ReactNode;
}

const DashboardTemplate: FC<Props> = ({ children }) => {
  const { userStore } = useStores();
  const router = useRouter();
  const userId = userStore.id;

  useEffect(() => {
    if (!userId) {
      router.push("/");
    }
  }, [router, userId]);

  return userId ? children : <Loading />;
};

export default observer(DashboardTemplate);
