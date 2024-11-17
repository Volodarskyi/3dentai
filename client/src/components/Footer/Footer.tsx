import {FC} from 'react';
import {observer} from "mobx-react-lite";
import './Footer.Styles.scss'
import {UiButton} from "@/components/UI/UiButton/UiButton";

interface IFooterProps {
}

const FooterComponent: FC<IFooterProps> = () => {
    const logIn = () => {
        console.log('login func')
    }

    const signIn = () => {
        console.log('signIn func')
    }

    return (
        <footer className="footer">
            <div className="footer__container">
                <UiButton text={'LogIn'} onClick={logIn} disabled={true}/>
                <UiButton text={'SignIn'} onClick={signIn}/>
            </div>
        </footer>
    );
};

export const Footer = observer(FooterComponent)
