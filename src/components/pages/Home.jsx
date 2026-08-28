import { useRef } from "react";
import { Link } from "react-router-dom";
import RoyPic from "../../assets/image7.png";

const videoPlayer = () => {
  const vidref = useRef(null);
};

const handlePlay = () => {
  vidref.current.play();
};

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* ── YouTube Channel ── */}
      <section className="mt-10 mb-12 p-6 bg-gray-50 rounded-xl border border-gray-200">
        <h2 className="text-2xl font-bold mb-4">My YouTube Channel</h2>

        <a
          href="https://www.youtube.com/channel/UCPj87XcaECEry5tJ8LONJzg"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline break-all"
        >
          Comprehensive Research Inc
        </a>

        <p className="mt-4 text-gray-700 font-bold">
          The National Debt Scam (978,000 views):
        </p>
        {/* <a
          href="https://www.youtube.com/watch?v=3qHL2NBmZqQ"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline break-all"
        >
          youtube.com/watch?v=3qHL2NBmZqQ
        </a> */}

        <iframe
          className="w-full rounded-lg mt-4"
          style={{ aspectRatio: "16/9" }}
          src="https://www.youtube-nocookie.com/embed/3qHL2NBmZqQ"
          title="The National Debt Scam"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />

        <p className="mt-3 text-gray-700 leading-relaxed font italic">
          This video explains the evolution of the U.S. economy from a Natural
          Economy to an Artificial Economy. The Natural Economy allowed the U.S.
          to evolve from a frontier settlement to become the richest country in
          the world. However, in 1913 with the conversion to an Artificial
          Economy, there have been extreme boom and bust cycles, jobs shipped
          overseas, and overall economic decline. The American Dream is now a
          nightmare. Learn how it happened.
        </p>
      </section>

      {/* ── COVID note ── */}
      <p className="text-center font-semibold text-gray-600 mb-10 uppercase tracking-wide">
        See the{" "}
        <Link to="/covid-19-bht" className="text-blue-600 hover:underline">
          COVID-19 &amp; BHT
        </Link>{" "}
        tab for pandemic information
      </p>

      {/* ── Introduction ── */}
      <article className="text-[19px] leading-[1.85] text-gray-700 space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">Introduction</h2>

        <p>
          I put Health and Nutrition first because that is an area over which
          you have a great deal of control. Politics and Economics, not so much.
          Before Donald J. Trump, you got to choose between a Republican or
          Democrat brand of servitude that would harm you the least.
        </p>

        <p>
          If you don't believe the above statement, see the tabs{" "}
          <Link
            to="/anti-us-globalization"
            className="text-blue-600 hover:underline"
          >
            Anti-U.S. Globalization
          </Link>{" "}
          and{" "}
          <Link
            to="/inflation-made-simple"
            className="text-blue-600 hover:underline"
          >
            Inflation Made Simple
          </Link>{" "}
          to understand that the destruction of the middle class economy started
          in 1914. With the passage of the Federal Reserve Act and the 16th
          amendment, the main revenue of the federal government gradually
          changed from the collection of tariffs to the collection of income
          tax. Our competitive edge was not lost — it was slowly and steadily
          given away by lowering taxes on foreign production and increasing
          taxes on domestic production. Before President Trump, no politician or
          media report in the last 50 years, with their short-term focus,
          mentioned anything addressing this paradigm shift to manufacturing
          jobs lost.
        </p>

        <p>Health and Nutrition is a wide open field.</p>

        <p>
          In{" "}
          <Link
            to="/primitive-vs-western-diet"
            className="text-blue-600 hover:underline"
          >
            Primitive vs Western Diet
          </Link>
          : how could the western diet cause genetic changes in primitive tribes
          in one generation? Learn about Dr. Weston Price and the MicroRNA
          Story.
        </p>

        <p>
          In{" "}
          <Link to="/cancer" className="text-blue-600 hover:underline">
            Cancer
          </Link>
          : cancer was once rare. Is there finally a cure? The National
          Institutes of Health has several shocking reports. There actually
          appears to be a cure — but learn why it will never be FDA approved.
          Also learn about two hidden substances consumed daily by most people
          that have dramatically increased cancer rates in the last 50 years:
          detergent and antibiotics. See{" "}
          <Link
            to="/detergent-vs-soap"
            className="text-blue-600 hover:underline"
          >
            Detergent vs Soap
          </Link>{" "}
          and{" "}
          <Link to="/factory-farming" className="text-blue-600 hover:underline">
            Factory Farming
          </Link>
          .
        </p>

        <p>
          In{" "}
          <Link to="/cholesterol" className="text-blue-600 hover:underline">
            Cholesterol
          </Link>
          : statins like Lipitor can cause severe memory problems — it may not
          be dementia. The cholesterol problems in older people are typically
          due to lack of sunshine. Learn how to manage cholesterol without the
          severe side effects of statins, which also include muscle pain and
          weakness.
        </p>

        <p>
          In{" "}
          <Link to="/joint-health" className="text-blue-600 hover:underline">
            Joint Health
          </Link>
          : I found a cure for eroded cartilage. Two years after being diagnosed
          with painful osteoarthritis, I have been without pain and I am
          convinced I will be able to avoid knee replacement surgery.
        </p>

        <p>
          In{" "}
          <Link to="/cataracts" className="text-blue-600 hover:underline">
            Cataracts
          </Link>
          : I discovered an eye drop that dissolves cataracts. The colors now
          look vibrant and I can drive at night with no annoying glare. My
          vision went to 20/40 with astigmatism and is now back to 20/20 with no
          astigmatism.
        </p>

        <p>
          In{" "}
          <Link to="/alzheimers" className="text-blue-600 hover:underline">
            Alzheimer's
          </Link>{" "}
          and{" "}
          <Link
            to="/parkinsons-disease"
            className="text-blue-600 hover:underline"
          >
            Parkinson's Disease
          </Link>
          : a research paper contends that the herpes virus responsible for cold
          sores may also cause Alzheimer's disease. Orally administered BHT
          cures the herpes virus and also reduces the risk of Parkinson's.
        </p>

        <p>
          In{" "}
          <Link to="/covid-19-bht" className="text-blue-600 hover:underline">
            COVID-19 &amp; BHT
          </Link>
          : BHT is a potent anti-viral — I did not get Covid and do not need a
          yearly flu shot — but it also prevents brain damage and reverses brain
          damage due to chronic alcohol abuse.
        </p>

        <p>
          In{" "}
          <Link
            to="/medical-care-cost"
            className="text-blue-600 hover:underline"
          >
            Medical Care Cost
          </Link>
          : learn how the unforeseen consequence of one government regulation of
          insurance companies has resulted in the medical care cost crisis. In
          the 1960s medical care was very affordable — even cancer surgery.
          Would you believe a total bill of $243.75 for my father's cancer
          surgery in 1962? See a copy of that bill.
        </p>

        <h2 className="text-3xl font-bold text-gray-900 pt-4">
          Politics and Economics
        </h2>

        <p>
          In{" "}
          <Link
            to="/inflation-made-simple"
            className="text-blue-600 hover:underline"
          >
            Inflation Made Simple
          </Link>
          : find out why the Federal Reserve raised interest rates to fight
          inflation when low interest rates did not cause inflation. Why does
          the Federal Reserve not address the fundamental cause of inflation?
          Follow the money.
        </p>

        <p>
          In{" "}
          <Link
            to="/income-wealth-inequality"
            className="text-blue-600 hover:underline"
          >
            Income &amp; Wealth Inequality
          </Link>
          : how can technology advance so dramatically — resulting in increased
          worker productivity — yet the standard of living is decreasing,
          especially for younger generations? The resulting frustration and
          conflict is at the heart of society's decline. Where is all that
          increased wealth going?
        </p>

        <p>
          In{" "}
          <Link
            to="/foreign-aid-regulations"
            className="text-blue-600 hover:underline"
          >
            Foreign Aid &amp; Regulations
          </Link>
          : why would the United States give billions of dollars in aid to
          almost every country in the world, including Iraq, China, and even
          Russia? See{" "}
          <a
            href="https://www.foreignassistance.gov/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            foreignassistance.gov
          </a>
          .
        </p>

        <p>
          In{" "}
          <Link to="/perpetual-war" className="text-blue-600 hover:underline">
            Perpetual War
          </Link>
          : armies don't make peace — they enrage adversaries and generate huge
          profits from the resulting perpetual wars. The War on Iraq caused over
          200,000 civilian deaths by direct violence and the deaths of over
          100,000 children due to starvation. It was based on a lie and made a
          formidable enemy out of the entire Muslim world. That outrage led to
          the 9/11 attack and the War on Terrorism that continues to this day.
          The war in Ukraine, instead of ending quickly, drags on — the United
          States has provided Ukraine with more than $111 billion of taxpayer
          money since Russia's invasion, with absolutely no accounting.
        </p>

        <p>
          In{" "}
          <Link
            to="/environmentalism-hoax"
            className="text-blue-600 hover:underline"
          >
            Environmentalism Hoax
          </Link>
          : is it all just a hoax? Yes, and I can prove it with NASA satellite
          data. The earth has gotten greener in the last 20 years due to human
          activity. The extra carbon dioxide in the atmosphere (~100 ppm) was
          also a factor — but that was a change of only 0.01%, so one could
          expect the climate to change by a similar margin.
        </p>

        <p>
          In{" "}
          <Link
            to="/early-childhood-education"
            className="text-blue-600 hover:underline"
          >
            Early Childhood Education
          </Link>
          : I strongly recommend Glenn Doman's books{" "}
          <em>How To Teach Your Baby To Read</em> and{" "}
          <em>Teach Your Baby Math</em>. If you start early, you will not only
          have a lot of fun but will be shocked by what can be accomplished. My
          daughter read her first book at 24 months of age. I taught her cursive
          at 3½, and she read her first adult novel —{" "}
          <em>Santa Claus: The Movie</em> (244 pages) — at 4½. She was at the
          top of her class through college.
        </p>

        <p>
          In{" "}
          <Link to="/being-gay" className="text-blue-600 hover:underline">
            Being Gay
          </Link>
          : being gay is not genetic. There is evidence of environmental factors
          that can feminize the brain of one identical twin but not the other.
        </p>

        {/* ── About ── */}
        <div className="mt-10 pt-8 border-t border-gray-200">
          <img className="float-left mr-6 mb-4 w-65 rounded" src={RoyPic} />
          <p>
            My name is Roy Ireland. I have been an electronic engineer for over
            40 years. Back in the days of dial-up modems and bulletin boards, I
            could not grasp the concept of the Internet or see any practical
            application. Since then the internet has evolved into an almost
            limitless source of information, some of it very valuable. I have
            uncovered incredible insights on health and nutrition, cultural
            values, economics, and politics — and accumulated so much
            information that I had to create this website to avoid overwhelming
            people. Now I can pique their interest with just one or two tidbits,
            hand them my card, and invite them to explore more.
          </p>
        </div>
      </article>
    </div>
  );
};

export default Home;
