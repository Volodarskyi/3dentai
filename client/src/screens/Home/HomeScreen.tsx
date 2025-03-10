"use client";
import { observer } from "mobx-react-lite";

import { OurSolutions } from "@/components/OurSolutions/OurSolutions";
import { PageDecorations } from "@/components/PageDecorations/PageDecorations";

import "./Home.Styles.scss";

const HomeScreenComponent = () => {
  return (
    <div className="home">
      <PageDecorations />
      <div className="home__content">
        <div className="home__content-title">
          <h1>3DentAI</h1>
        </div>
        <div className="home__content-description">
          <h2>
            Primary diagnosis of tooth and gum diseases at home using a compact
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

export const HomeScreen = observer(HomeScreenComponent);
