import React from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import Hero1 from "./Hero1";
import Hero2 from "./Hero2";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const HeroMain = () => {
  return (
    <div className="py-10">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{ delay: 2500, disableOnInteraction: true }}
        modules={[Autoplay]}
      >
        <SwiperSlide>
          <Hero1 />
        </SwiperSlide>
        <SwiperSlide>
          <Hero2 />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HeroMain;
