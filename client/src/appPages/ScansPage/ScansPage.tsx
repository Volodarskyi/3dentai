"use client";
import { observer } from "mobx-react-lite";

import { useRouter } from "next/navigation";

import "./ScansPage.Styles.scss";
import {withAuth} from "@/hoc/WithAuth/withAuth";
import {EUserRole} from "@/types/enums/userEnums";

const ScansPageComponent = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/scans/view?scanID=77778888");
  };

  return (
    <div className="scans">
      <h1 className="scans_title">Scans</h1>
      <p className="scans_subtitle">View and manage your scans here.</p>
      <button onClick={handleClick} className="scans_button">
        Перейти до скану з ID = 77778888
      </button>
    </div>
  );
};

const ScansPage = observer(ScansPageComponent);
export const ScansPageProtected = withAuth(ScansPage, [EUserRole.USER, EUserRole.DENTIST])