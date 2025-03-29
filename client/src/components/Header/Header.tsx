import Link from "next/link";

import styles from "./styles.module.scss";

const Header = () => {
  return (
    <header className={styles.container}>
      <nav
        className={`${styles.items} flex max-w-7xl items-center justify-between gap-x-6 lg:px-8 w-max`}
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

        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              data-slot="icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
