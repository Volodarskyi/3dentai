"use client";
import {observer} from "mobx-react-lite";

import {OurSolutions} from "@/components/OurSolutions/OurSolutions";
import {PageDecorations} from "@/components/PageDecorations/PageDecorations";
import {useUserData} from "@/hooks/useUserData";
import {useEffect} from "react";
import {EUserRole} from "@/types/enums/userEnums";
import {useRouter} from "next/navigation";

import "./HomePage.Styles.scss";

const HomePageComponent = () => {
  const {role, checked} = useUserData();
  const router = useRouter();

  useEffect(() => {
    console.log('home page-useEffect-start');
    if(!checked){
      console.log('home page-useEffect-checked:',checked);
      return ;
    }

    if(role === EUserRole.DENTIST){
      console.log('home page-useEffect-dentist:',role);
      router.push("/dentist");
    }

    if(role === EUserRole.USER){
      console.log('home page-useEffect-user:',role);
      router.push("/user");
    }

  }, [role]);

  return (
    <div className="home">
      <PageDecorations />
      <div className="home__content">
        <div className="home__content-title">
          <h1>3DentAI</h1>
        </div>
        <div className="home__content-description">
          <h2>
            Primary diagnosis of teeth and gum diseases at home using a compact
            camera and AI
          </h2>
        </div>
        <img
          className="home__animation"
          src="/assets/images/3dentai-animation-main_v03.gif"
          alt="Loading Animation"
        />
        <div className="home__content-solutions-wrapper">
          <OurSolutions />
        </div>
      </div>
    </div>
  );
};

export const HomePage = observer(HomePageComponent);
