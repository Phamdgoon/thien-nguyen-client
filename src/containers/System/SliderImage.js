import React, { memo } from "react";
import Slider from "react-slick";

const SliderImage = ({ images }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    if (images?.length === 1) {
        return (
            <div className="w-full">
                <img
                    src={images[0].image}
                    alt="Single Image"
                    className="w-full h-[400px] object-cover rounded-md"
                />
            </div>
        );
    }

    return (
        <div className="w-full">
            <Slider {...settings}>
                {images?.map((image, index) => (
                    <div key={index}>
                        <img
                            src={image.image}
                            alt={`Slide ${index}`}
                            className="w-full h-[400px] object-cover rounded-md"
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default memo(SliderImage);
