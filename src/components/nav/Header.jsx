import { useState } from "react";
import { Link } from "react-router-dom";

const navLinkStyle =
  "uppercase tracking-[0.18em] text-[14px] text-[#1f2937] hover:text-black transition-colors duration-200";

const dropLinkStyle =
  "block px-6 py-2 uppercase tracking-[0.18em] text-[14px] text-[#1f2937] hover:bg-gray-100";


const healthLinks = [
  {
    to: "/nutrition-essentials",
    label: "NUTRITION ESSENTIALS",
  },
  {
    to: "/primitive-vs-western-diet",
    label: "PRIMITIVE VS WESTERN DIET",
  },
  {
    to: "/cancer",
    label: "CANCER",
  },
  {
    to: "/detergent-vs-soap",
    label: "DETERGENT VS SOAP",
  },
  {
    to: "/factory-farming",
    label: "FACTORY FARMING",
  },
  {
    to: "/cholesterol",
    label: "CHOLESTEROL",
  },
  {
    to: "/joint-health",
    label: "JOINT HEALTH",
  },
  {
    to: "/cataracts",
    label: "CATARACTS",
  },
  {
    to: "/addiction-recovery",
    label: "ADDICTION RECOVERY",
  },
  {
    to: "/alzheimers",
    label: "ALZHEIMER'S",
  },
  {
    to: "/parkinsons-disease",
    label: "PARKENSON'S DISEASE",
  },
  {
    to: "/medical-care-cost",
    label: "MEDICAL CARE COST",
  },
  {
    to: "/vitamin-supplements",
    label: "VITAMIN SUPPLEMENTS",
  },

];
const geopoliticalLinks = [
 {
    to: "/inflation-made-simple",
    label: "INFLATION MADE SIMPLE",
  },
  {
    to: "/more-inflation",
    label: "MORE INFLATION",
  },
  {
    to: "/income-wealth-inequality",
    label: "INCOME-WEALTH INEQUALITY",
  },
  {
    to: "/anti-us-globalization",
    label: "ANTI-U.S. GLOBALIZATION",
  },
  {
    to: "/foreign-aid-regulations",
    label: "FOREIGN AID - REGULATIONS",
  },
  {
    to: "/solutions-references",
    label: "SOLUTIONS & REFERENCES",
  },
  {
    to: "/perpetual-war",
    label: "PERPETUAL WAR",
  },
  {
    to: "/war-on-islam",
    label: "WAR ON ISLAM",
  },
  {
    to: "/the-war-on-ukraine",
    label: "THE WAR ON UKRAINE",
  },
];

const moreLinks = [
  {
    to: "/environmentalism-hoax",
    label: "ENVIRONMENTALISM HOAX",
  },
  {
    to: "/early-childhood-education",
    label: "EARLY CHILDHOOD EDUCATION",
  },
  {
    to: "/being-gay",
    label: "BEING GAY",
  },
  {
    to: "/anti-us-globalization",
    label: "ANTI-U.S. GLOBALIZATION",
  },
];

const NavigationBar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  return (

    <nav className="w-full border-b border-gray-200 bg-[#f8f8f8]">

      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-5">

        {/* MOBILE BUTTON */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-center w-10 h-10 p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100"
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
        <div className={`${isOpen ? "block" : "hidden"} w-full md:block`}>

          <ul className="flex flex-col gap-6 mt-4 md:flex-row md:justify-center md:items-center md:gap-12 md:mt-0">

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

<li className="relative">

  <button
    type="button"
    onClick={() =>
      setOpenMenu(
        openMenu === "health"
          ? null
          : "health"
      )
    }
    className={`${navLinkStyle} flex items-center gap-2`}
  >
<>
  HEALTH & NUTRITION
  <span className="text-[10px]">
    {openMenu === "health" ? "▲" : "▼"}
  </span>
</>
  </button>

  {openMenu === "health" && (

    <div className="absolute left-0 top-full z-50 w-[340px] mt-3 bg-white border border-gray-200 shadow-lg">

      <ul className="flex flex-col py-4">

        {healthLinks.map((link) => (

          <li key={link.to}>

            <Link
              to={link.to}
              className={dropLinkStyle}
            >
              {link.label}
            </Link>

          </li>

        ))}

      </ul>

    </div>

  )}

</li>

<li className="relative">

  <button
    type="button"
    onClick={() =>
      setOpenMenu(
        openMenu === "politics"
          ? null
          : "politics"
      )
    }
    className={`${navLinkStyle} flex items-center gap-2`}
  >
<>
  POLITICS & ECONOMICS
  <span className="text-[10px]">
    {openMenu === "politics" ? "▲" : "▼"}
  </span>
</>
  </button>

  {openMenu === "politics" && (

    <div className="absolute left-0 top-full z-50 w-[340px] mt-3 bg-white border border-gray-200 shadow-lg">

      <ul className="flex flex-col py-4">

        {geopoliticalLinks.map((link) => (

          <li key={link.to}>

            <Link
              to={link.to}
              className={dropLinkStyle}
            >
              {link.label}
            </Link>

          </li>

        ))}

      </ul>

    </div>

  )}

</li>

<li className="relative">

  <button
    type="button"
    onClick={() =>
      setOpenMenu(
        openMenu === "more"
          ? null
          : "more"
      )
    }
    className={`${navLinkStyle} flex items-center gap-2`}
  >
<>
  MORE
  <span className="text-[10px]">
    {openMenu === "more" ? "▲" : "▼"}
  </span>
</>
  </button>

  {openMenu === "more" && (

<div className="absolute right-0 top-full z-50 w-[340px] mt-3 bg-white border border-gray-200 shadow-lg">

      <ul className="flex flex-col py-4">

        {moreLinks.map((link) => (

          <li key={link.to}>

            <Link
              to={link.to}
              className={dropLinkStyle}
            >
              {link.label}
            </Link>

          </li>

        ))}

      </ul>

    </div>

  )}

</li>

          </ul>

        </div>

      </div>

    </nav>

  );
};

export default NavigationBar;