import React from "react";
import HeroMain from "../../Components/Hero/HeroMain";
import FeaturedClubs from "../../Components/FeaturedClubs/FeaturedClubs";
import HowBuzzHubWorks from "../../Components/HowItWork/HowBuzzHubWorks";

const Home = () => {
  return (
    <div>
      <section>
        <HeroMain />
      </section>
      <section>
        <FeaturedClubs />
      </section>
      <section>
        <HowBuzzHubWorks />
      </section>
    </div>
  );
};

export default Home;
