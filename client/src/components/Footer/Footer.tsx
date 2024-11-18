import {FC} from 'react';
import {observer} from "mobx-react-lite";
import './Footer.Styles.scss'
import {UiButton} from "@/components/UI/UiButton/UiButton";
import {useStores} from "@/hooks/useStores";
import {SignInWindow} from "@/components/UI/UiModal/Windows/SignInWindow";
import {LogInWindow} from "@/components/UI/UiModal/Windows/LogInWindow";

interface IFooterProps {
}

const FooterComponent: FC<IFooterProps> = () => {
    const{modalStore}=useStores()
    const logIn = () => {
        console.log('login func')
        modalStore.openUiModal('Log In', <LogInWindow/>)
    }

    const signIn = () => {
        console.log('signIn func')
        modalStore.openUiModal('Sign In', <SignInWindow/>)
    }

    return (
        <footer className="footer">
            <div className="footer__container">
                <UiButton text={'LogIn'} onClick={logIn} />
                <UiButton text={'SignIn'} onClick={signIn}/>
            </div>
        </footer>
    );
};

export const Footer = observer(FooterComponent)
