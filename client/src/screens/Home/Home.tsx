"use client";

import './Home.Styles.scss';
import {PageDecorations} from "@/components/PageDecorations/PageDecorations";

const HomeScreen = () => {
    return (
        <div className="home">
            <PageDecorations/>
            <div className="home__content">
                <div className="home__content-title">
                    <h1>3DentAI</h1>
                </div>
                <div className="home__content-description">
                    <h2>Primary diagnosis of tooth and gum
                        diseases at home using a compact camera and AI</h2>
                </div>
                <img
                    className="home__animation"
                    src="/assets/images/3dentai-animation-main_v03.gif"
                    alt="Loading Animation"
                />
            </div>
        </div>
    )

};

export default HomeScreen;
