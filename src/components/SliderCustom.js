import React, { memo } from "react";
import Slider from "react-slick";
import { sliders } from "../utils/constant";

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
};
const SliderCustom = () => {
    return (
        <div className="relative w-full py-10">
            <Slider {...settings}>
                {sliders.map((slide) => (
                    <div key={slide.id} className="relative">
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-[400px] object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center text-white px-4">
                            <div className="bg-red-500 text-white text-lg font-bold py-1 px-3 rounded-full mb-4">
                                {slide.title}
                            </div>
                            <h2 className="text-3xl font-bold mb-2 w-3/5">
                                {slide.subtitle}
                            </h2>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default memo(SliderCustom);
