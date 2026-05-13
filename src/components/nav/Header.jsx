import { useState } from "react";
import { Link } from "react-router-dom";

const navLinkStyle =
  "uppercase tracking-[0.18em] text-[14px] text-[#1f2937] hover:text-black transition-colors duration-200 md:p-0";

const NavigationBar = () => {

  const [isOpen, setIsOpen] = useState(false);

  return (

    <nav className="w-full border-b border-gray-200 bg-[#f8f8f8]">

      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-5">

        {/* MOBILE BUTTON */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none"
        >

          <span className="sr-only">
            Open main menu
          </span>

          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >

            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />

          </svg>

        </button>

        {/* NAVIGATION */}
        <div className={`${isOpen ? "block" : "hidden"} w-full md:block md:w-full`}>

          <ul className="flex flex-col md:flex-row md:justify-center md:items-center gap-6 md:gap-12 mt-4 md:mt-0">

            <li>
              <Link
                to="/"
                className={navLinkStyle}
              >
                HOME
              </Link>
            </li>

            <li>
              <Link
                to="/covid"
                className={navLinkStyle}
              >
                COVID-19 & BHT
              </Link>
            </li>

            <li>
              <Link
                to="/health"
                className={navLinkStyle}
              >
                HEALTH & NUTRITION
              </Link>
            </li>

            <li>
              <Link
                to="/politics"
                className={navLinkStyle}
              >
                POLITICS & ECONOMICS
              </Link>
            </li>

            <li>
              <Link
                to="/more"
                className={navLinkStyle}
              >
                MORE
              </Link>
            </li>

          </ul>

        </div>

      </div>

    </nav>

  );
};

export default NavigationBar;