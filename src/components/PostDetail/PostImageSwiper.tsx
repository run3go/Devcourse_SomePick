import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import type { CSSProperties } from "styled-components";

type ArrowProps = {
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
};

function CustomPrevArrow({ onClick }: ArrowProps) {
  return (
    <div
      onClick={onClick}
      className="absolute z-10 left-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 cursor-pointer rounded-full"
    >
      ◀
    </div>
  );
}

function CustomNextArrow({ onClick }: ArrowProps) {
  return (
    <div
      onClick={onClick}
      className="absolute z-10 right-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 cursor-pointer rounded-full"
    >
      ▶
    </div>
  );
}

export default function PostImageSwiper({ post }: { post: Post }) {
  const images = post.images ?? [];
  const settings = {
    arrows: true,
    infinite: false,
    slidesToShow: images.length >= 2 ? 2.4 : 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };
  return (
    <>
      <div className="slider-container">
        <Slider {...settings}>
          {images.map((url, index) => (
            <div key={index} className="px-[2px]">
              <div className="w-full h-[600px] relative mb-12">
                <img
                  key={index}
                  className="w-full h-full  object-cover object-center"
                  src={url}
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
