import Link from "next/link";

import styles from "./styles.module.scss";
import {UiIcon} from "@/components/UI/UiIcon/UiIcon";
import {useStores} from "@/hooks/useStores";

const Header = () => {
    const {menuStore} = useStores();

    return (
        <header className={styles.container}>
            <nav
                className={`${styles.items} flex  items-center justify-between gap-x-6 lg:px-8 w-max`}
            >
                <div className="flex lg:flex-1">
                    <Link href="/" className={styles.logoContainer}>
                        <img
                            src="/assets/images/3dentai_logo.png"
                            alt="3DentAL"
                            width={45}
                            height={40}
                        />

                        <span className={styles.name}>3DentAI</span>
                    </Link>
                </div>

                <div className="menu-btn">
                    <div onClick={menuStore.openMenu}>
                        <UiIcon name={'main-menu'} size={35}/>
                    </div>
                </div>
            </nav>

        </header>
    );
};

export default Header;
