import React from "react";
import Link from "next/link";
import { footerMenuList, socialIcons } from "../data/footer_data";
import { useAccount } from 'wagmi'

const footer = () => {
  const { address, isConnected } = useAccount()
  return (
    <>
      {/* <!-- Footer --> */}

      <footer className="dark:bg-jacarta-900 page-footer bg-white">
        <div className="container">
          <div className="grid grid-cols-6 gap-x-7 gap-y-14 pt-24 pb-12 md:grid-cols-12">
            <div className="col-span-3 md:col-span-4">
              {/* <!-- Logo --> */}
              <Link href="#">
                <a className="mb-6 inline-block">
                  <img
                    src="/images/logo.png"
                    className="max-h-12 dark:hidden"
                    alt="Xhibiter | NFT Marketplace"
                  />
                </a>
              </Link>

              <Link href="#">
                <a className=" mb-6 inline-block">
                  <img
                    src="/images/logo_white.png"
                    className="hidden max-h-12 dark:block mb-6"
                    alt="Xhibiter | NFT Marketplace"
                  />
                </a>
              </Link>
              <p className="dark:text-jacarta-300 mb-12">
                Create, sell and collect truly rare digital artworks. Powered by
                blockchain technology.
              </p>

              {/* <!-- Socials --> */}
              <div className="flex space-x-5">
                {socialIcons.map((item, index6) => {
                  const { id, href, text } = item;
                  return (
                    <Link href={href} key={index6}>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group cursor-pointer"
                      >
                        <svg className="icon group-hover:fill-accent fill-jacarta-300 h-5 w-5 dark:group-hover:fill-white">
                          <use xlinkHref={`/icons.svg#icon-${text}`}></use>
                        </svg>
                      </a>
                    </Link>
                  );
                })}
              </div>
            </div>

            {footerMenuList.map((single, index7) => (
              <div
                className={`col-span-full sm:col-span-3 md:col-span-2 ${single.diffClass}`}
                key={index7}
              >
                <h3 className="font-display text-jacarta-700 mb-6 text-sm dark:text-white">
                  {single.title}
                </h3>
                <ul className="dark:text-jacarta-300 flex flex-col space-y-1">
                  {single.list.map((item,index5) => {
                    const { id, href, text } = item;
                    return (
                      <li key={index5}>
                        
                        {(single.id===3 && item.id===1) ? <Link href={href+address}>
                          <a className="hover:text-accent dark:hover:text-white">
                            {text}
                          </a>
                        </Link> : <Link href={href}>
                          <a className="hover:text-accent dark:hover:text-white">
                            {text}
                          </a>
                        </Link>}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center justify-between py-8 sm:flex-row sm:space-y-0">
            <span className="dark:text-jacarta-400 text-sm">
              <span>© {new Date().getFullYear()} Rentify — Made by</span>
              <Link href="https://themeforest.net/user/ib-themes">
                <a className="hover:text-accent dark:hover:text-white">
                  {" "}
                  Rime Labs
                </a>
              </Link>
            </span>

            <ul className="dark:text-jacarta-400 flex flex-wrap space-x-4 text-sm">
              <li>
                <Link href="/tarms">
                  <a className="hover:text-accent dark:hover:text-white">
                    Terms and conditions
                  </a>
                </Link>
              </li>
              {/* <li>
                <Link href="/tarms">
                  <a className="hover:text-accent dark:hover:text-white">
                    Privacy policy
                  </a>
                </Link>
              </li> */}
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default footer;
