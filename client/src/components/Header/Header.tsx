import Image from "next/image";
import Link from "next/link";

import Logo from "@/assets/images/logo.png";

import styles from "./styles.module.scss";

const Header = () => {
  return (
    <header className={styles.container}>
      <nav
        className={`${styles.items} flex max-w-7xl items-center justify-between gap-x-6 lg:px-8 w-max`}
      >
        <div className="flex lg:flex-1">
          <Link href="#" className={styles.logoContainer}>
            <Image src={Logo} alt="3DentAL" width={45} height={40} />
            <span className={styles.name}>3DentAL</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end gap-x-6">
          <Link
            href="/scan"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Scan
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

      {/*<div className="lg:hidden" role="dialog" aria-modal="true">*/}
      {/*  <div className="fixed inset-0 z-10"></div>*/}
      {/*<div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">*/}
      {/*<div className="flex items-center gap-x-6">*/}
      {/*  <a href="#" className="-m-1.5 p-1.5">*/}
      {/*    <span className="sr-only">Your Company</span>*/}
      {/*    <img*/}
      {/*      className="h-8 w-auto"*/}
      {/*      src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"*/}
      {/*      alt=""*/}
      {/*    />*/}
      {/*  </a>*/}
      {/*  <a*/}
      {/*    href="#"*/}
      {/*    className="ml-auto rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"*/}
      {/*  >*/}
      {/*    Sign up*/}
      {/*  </a>*/}
      {/*  <button*/}
      {/*    type="button"*/}
      {/*    className="-m-2.5 rounded-md p-2.5 text-gray-700"*/}
      {/*  >*/}
      {/*    <span className="sr-only">Close menu</span>*/}
      {/*    <svg*/}
      {/*      className="h-6 w-6"*/}
      {/*      fill="none"*/}
      {/*      viewBox="0 0 24 24"*/}
      {/*      stroke-width="1.5"*/}
      {/*      stroke="currentColor"*/}
      {/*      aria-hidden="true"*/}
      {/*      data-slot="icon"*/}
      {/*    >*/}
      {/*      <path*/}
      {/*        stroke-linecap="round"*/}
      {/*        stroke-linejoin="round"*/}
      {/*        d="M6 18 18 6M6 6l12 12"*/}
      {/*      />*/}
      {/*    </svg>*/}
      {/*  </button>*/}
      {/*</div>*/}
      {/*<div className="mt-6 flow-root">*/}
      {/*  <div className="-my-6 divide-y divide-gray-500/10">*/}
      {/*    <div className="space-y-2 py-6">*/}
      {/*      <a*/}
      {/*        href="#"*/}
      {/*        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"*/}
      {/*      >*/}
      {/*        Product*/}
      {/*      </a>*/}
      {/*      <a*/}
      {/*        href="#"*/}
      {/*        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"*/}
      {/*      >*/}
      {/*        Features*/}
      {/*      </a>*/}
      {/*      <a*/}
      {/*        href="#"*/}
      {/*        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"*/}
      {/*      >*/}
      {/*        Marketplace*/}
      {/*      </a>*/}
      {/*      <a*/}
      {/*        href="#"*/}
      {/*        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"*/}
      {/*      >*/}
      {/*        Company*/}
      {/*      </a>*/}
      {/*    </div>*/}
      {/*    <div className="py-6">*/}
      {/*      <a*/}
      {/*        href="#"*/}
      {/*        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"*/}
      {/*      >*/}
      {/*        Log in*/}
      {/*      </a>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*</div>*/}
      {/*</div>*/}
    </header>
  );
};

export default Header;
