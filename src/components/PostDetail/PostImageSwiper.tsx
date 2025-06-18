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

  if (images.length === 1) {
    // 1장
    return (
      <div className="flex justify-center mb-12">
        <img
          src={images[0]}
          alt="post"
          className="max-w-full max-h-[600px] object-contain rounded-2xl"
        />
      </div>
    );
  }

  // 2장 이상
  const settings = {
    arrows: true,
    infinite: false,
    slidesToShow: 2.4,
    slidesToScroll: 1,
    swipeToSlide: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {images.map((url, index) => (
          <div key={index} className="px-[2px]">
            <div className="w-full h-[600px] relative mb-12">
              <img
                src={url}
                className="w-full h-full object-cover object-center rounded-2xl"
                alt={`post-${index}`}
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
