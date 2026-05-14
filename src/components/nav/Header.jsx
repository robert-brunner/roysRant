import { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

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
    {
    to: "/being-gay",
    label: "BEING GAY",
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
    to: "/anti-us-globalization",
    label: "ANTI-U.S. GLOBALIZATION",
  },
  {
    to: "/solutions-references",
    label: "SOLUTIONS & REFERENCES",
  },
];

//moved solutions and references to the moreLinks instead of Politics and Economics

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  const location = useLocation();

  const isHealthPage =
    location.pathname.includes("covid") ||
    location.pathname.includes("nutrition") ||
    location.pathname.includes("primitive-vs-western-diet") ||
    location.pathname.includes("cancer") ||
    location.pathname.includes("detergent-vs-soap") ||
    location.pathname.includes("factory-farming") ||
    location.pathname.includes("cholesterol") ||
    location.pathname.includes("joint-health") ||
    location.pathname.includes("cataracts") ||
    location.pathname.includes("addiction-recovery") ||
    location.pathname.includes("alzheimers") ||
    location.pathname.includes("parkinsons-disease") ||
    location.pathname.includes("vitamin-supplements") ||
    location.pathname.includes("early-childhood") ||
    location.pathname.includes("being-gay");

  const isFreedomPage =
    location.pathname.includes("anti-us-globalization") ||
    location.pathname.includes("foreign-aid-regulations") ||
    location.pathname.includes("perpetual-war") ||
    location.pathname.includes("war-on-islam") ||
    location.pathname.includes("the-war-on-ukraine") ||
    location.pathname.includes("environmentalism-hoax");

  const isWealthPage =
    location.pathname.includes("inflation-made-simple") ||
    location.pathname.includes("more-inflation") ||
    location.pathname.includes("income-wealth-inequality") ||
    location.pathname.includes("medical-care-cost") ||
    location.pathname.includes("economics") ||
    location.pathname.includes("wealth");

  const navRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className="w-full border-b border-gray-200 bg-[#f8f8f8]"
      >
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-5">
          {/* MOBILE BUTTON */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center w-10 h-10 p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100"
          >
            <span className="sr-only">Open main menu</span>

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
                <Link to="/" className={navLinkStyle}>
                  HOME
                </Link>
              </li>

              <li>
                <Link to="/covid" className={navLinkStyle}>
                  COVID-19 & BHT
                </Link>
              </li>

              <li className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setOpenMenu(openMenu === "health" ? null : "health")
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
                            onClick={() => setOpenMenu(null)}
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
                    setOpenMenu(openMenu === "politics" ? null : "politics")
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
                            onClick={() => setOpenMenu(null)}
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
                    setOpenMenu(openMenu === "more" ? null : "more")
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
                            onClick={() => setOpenMenu(null)}
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

      <div className="hidden md:flex justify-center py-8">
<h1 className="text-[56px] md:text-[42px] xl:text-[56px] font-medium uppercase tracking-wide">
          <span
            className={
              isHealthPage
                ? "text-[#2563eb] [text-shadow:1px_0_0_#2563eb,-1px_0_0_#2563eb,0_1px_0_#2563eb,0_-1px_0_#2563eb bg-cover bg-center [-webkit-text-stroke:1px_black]"
                : "text-black"
            }
          >
            HEALTH
          </span>

          {" - "}

          <span
            className={
              isFreedomPage
                ? "text-transparent bg-clip-text bg-[url('https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg')] bg-cover bg-center [-webkit-text-stroke:1px_black]"
                : "text-black"
            }
          >
            FREEDOM
          </span>

          {" - "}

          <span
            className={
              isWealthPage
                ? "text-[#d4af37] [text-shadow:1px_0_0_#d4af37,-1px_0_0_#d4af37,0_1px_0_#d4af37,0_-1px_0_#d4af37 bg-cover bg-center [-webkit-text-stroke:1px_black]"
                : "text-black"
            }
          >
            WEALTH
          </span>
        </h1>
      </div>
    </>
  );
};

export default NavigationBar;
