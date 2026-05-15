import Linkify from "linkify-react";// src/pages/health/NutritionEssentials.jsx
import { useEffect, useState } from "react";





const NutritionEssentials = () => {


    const [hoveredLink, setHoveredLink] = useState(null);

  useEffect(() => {

    const links = document.querySelectorAll(".article-content a");

    links.forEach((link) => {

      link.addEventListener("mouseenter", () => {
        setHoveredLink(link.href);
      });

      link.addEventListener("mouseleave", () => {
        setHoveredLink(null);
      });

    });

  }, []);

useEffect(() => {

  const links = document.querySelectorAll(".article-content a");

  links.forEach((link) => {

    link.addEventListener("mouseenter", () => {
      setHoveredLink(link.href);
    });

    link.addEventListener("mouseleave", () => {
      setHoveredLink(null);
    });

  });

}, []);

  const body = `
    I recognized years ago that seed oils are to be avoided. In general, plants evolved providing fruit for animals to eat in exchange for helping spread the seeds. Seeds evolved with toxins and other features to protect them from being eaten and digested. I do the best that I can to avoid seed oils but it is impossible to avoid all. Canola oil, Soybean oil, Sunflower oil, and Palm oil are in almost everything.  Avocado oil is the only vegetable oil that is made without the seed because the seed is too toxic and cannot be used. Even olive oil is made with pits included. Although it is expensive, I love avocado oil mayonnaise with avocado toast in the morning. I use avocado oil for cooking or frying. I found potato chips made with avocado oil at Sprouts Market. Use Pomi strained tomato sauce for anything requiring tomato sauce because the seeds and the skin have been removed.  

When ordering my favorite hamburger, the Teriyaki Char from The Habit, I request no mayonnaise because of the inevitable seed oil. However, I will have to admit I can’t resist the teriyaki sauce.  

Some seeds, in spite of toxins, can be safely eaten, beans for example. However, Dr. Stephen Gundry, a popular author, recommends cooking them in a pressure cooker because the higher heat completely destroys the toxins. Caned beans, peas, and lentils also have been subjected to this higher heat.   

Nuts are seeds that can be eaten but they are notorious for allergens. That is evidence of plant protections remaining in spite of being roasted. Raw nuts are to be avoided. 
 
An article published in Scientific American, December 1, 2011, states: “A specific micro-RNA in rice was shown to bind to and inhibit the activity of receptors controlling the removal of LDL--“bad” cholesterol--from the bloodstream.”  Therefore, I do not eat rice.  

There was another Scientific American article, September 1, 2010, titled, “It's Not Dementia, It's Your Heart Medication” The heart medications discussed were Statin drugs for lowering cholesterol. Cholesterol is a problem especially for older people and it can be traced to lack of sunshine. The body not only makes vitamin D with sunshine but also makes the good cholesterol. The brain and muscles require a lot of cholesterol. Since the body needs cholesterol, if it can not get enough good cholesterol, it makes the bad cholesterol because it can do that it can do without the sunshine. I bought an ultraviolet lamp that produces narrow-band UVB rays that I turn on every morning when I am doing my morning routine before getting dressed. Just a few minutes each day, even during cold winters, adds up over time. My cholesterol problem has disappeared.   

I found a scholarly article that recommended mixing detergent with carcinogens when doing laboratory experiments to help the carcinogen penetrate the cell wall. See: https://roysrant.com/detergent-vs-soap     I concluded that it is best to avoid detergent since it is impossible to avoid carcinogens. There is a powerful detergent called sodium laurel sulfate (SLS) in most toothpaste and mouthwash and it took me a long time to find a Listerine type mouthwash that did not have detergent in it. I found Doctor Tichenor’s Mouthwash Concentrate, the same formula since 1864. I use it full strength as an aluminum free deodorant. I also use it mixed with Xylitol, Potassium Nitrate, Calcium Carbonate, and water for toothpaste and mouthwash. I use Dr. Bonner’s Castile Soap in the shower but often I just rinse. Human skin oil evolved over thousands of years to provide natural protection. Do not use powerful detergents to wash it off. I think doing that will increase the risk of skin cancer. In the kitchen I rinse the dishes with water. Any oil film I regard as not a problem, oil is not required to be kept in the refrigerator because its natural defenses against bacteria and viruses. I use Dr. Bonner’s Castile Soap when rinsing isn’t enough. (What is typically called soap is actually SLS detergent.)  

I do not eat pork because of the risk of autoimmune diseases such as MS and Graves’ disease. Pig DNA is too close to human DNA. There are other risks: https://www.healthline.com/nutrition/is-pork-bad 
 
There is evidence that the long term use of antibiotics increases the risk of colon and other cancers.  https://www.verywellhealth.com/colon-cancer-antibiotics-5218642  80% of the antibiotics sold in the US are consumed by farm animals. Antibiotic free meat is more expensive but worth the added cost.  

I recommend Anti-Cancer supplements, BHT, Taurine, Selenium, Vitamins D, E, and K, Garlic, Ginger, Turmeric, Fish Oil, Coenzyme Q10, B Complex, Resveratrol, Glutathione, Boswellia Extract, just to name a few.  

Especially BHT not only because its powerful anti-cancer properties but also its anti-viral properties. According to the American Cancer Society, “Viruses Can Lead to Cancer.” And according to metro.co.uk “A common herpes virus doubles dementia risk.”  BHT shown to inactivate Herpes Virus including Genital Herpes:  https://pmc.ncbi.nlm.nih.gov/articles/PMC352602/pdf/aac00271-0085.pdf  Do a Google search of: “BHT and viruses” and “Anticancer properties of BHT”  for more information.  

Recommended maximum BHT dosage is 6mg per pound  (13mg per kg.) according to Steven Fowkes Toxicology report for BHT, page 63 of: “The BHT Book, a practical guide for resolving viral disease”  https://projectwellbeing.com/wp-content/uploads/2020/03/BHTbook-StevenWmFowkes-200302.pdf  

When ordering from Amazon or other on-line distributor, the container will say, “Open one capsule and add to any oil up to .02%.” That is done to cover their tail. Just ignore it. Check out the user reviews. 
 
In spite of the anti-viral evidence from clinical studies, I know from personal experience that even taking 1000mg of  BHT per day will not prevent or cure Shingles. Take the Shingles vaccine!

Cancer as well as people need protein to grow and survive. Protein is composed of amino acids. Research has found that there are amino acids that are essential for cancer growth and survival that are not essential for human growth and survival. For the Methionine Restriction Cancer Cure see: https://roysrant.com/cancer At the very least this can make chemotherapy more effective.  

For people with cataracts, I recommend CAN-C eye drops. They not only dissolve cataracts but improve vision. I was diagnosed with cataracts 2 years ago and driving at night became a problem. I found CAN-C eye drops on Amazon that claimed to be able to dissolve cataracts so I gave then a try. After about 4  months using them once a day, I noticed a significant improvement. The colors looked so vibrant, driving at night became no problem. Also, my vision went from 20:40 with astigmatism to 20:20 with no astigmatism, reversing the affect that over 50 years of aging had on my vision.  

For people with knee pain wanting to avoid knee replacement, I recommend Pruity Products Joint Gel. 4 years ago I was diagnosed with osteoarthritis, characterized by the breakdown of cartilage in joints, leading to pain, stiffness, and reduced mobility. Pruity Products Joint Gel claimed to be able to rebuild cartilage. I tried and in 3 weeks the pain was greatly reduced. Since Pruity Products Joint Gel is composed of porcine (pork)gelatin and MSM, there are cheaper alternatives. See: https://roysrant.com/joint-health   I tried switching to beef gelatin but it did not work. It has to be close to human DNA. I felt that the risk of knee replacement surgery was greater than the risk of eating this one form of pork.   
  `;

  


return (

  <>

    {hoveredLink && (

      <div className="fixed bottom-6 right-6 w-[400px] p-4 bg-white border border-gray-300 shadow-2xl z-50">

        <h2 className="text-sm font-bold mb-2">
          Link Preview
        </h2>

        <p className="text-sm break-all">
          {hoveredLink}
        </p>

      </div>

    )}

    <section className="max-w-4xl mx-auto px-6 py-16">

      <h1 className="text-4xl mb-10">
        Nutrition Essentials, the abridged version
      </h1>

      <div className="article-content">

        <Linkify>

          <div className="whitespace-pre-wrap text-[20px] leading-[2] text-gray-700">
            {body}
          </div>

        </Linkify>

      </div>

    </section>

  </>
);

};

export default NutritionEssentials;