import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";

const GenericCarousel = ({ children }: { children: React.ReactNode[] }) => {
  return (
    <Swiper
      modules={[Scrollbar, Autoplay]}
      grabCursor={true}
      freeMode={{ enabled: false, sticky: false }}
      centeredSlides={true}
      spaceBetween={10}
      autoplay={{ delay: 2000, pauseOnMouseEnter: true }}
      breakpoints={{
        768: {
          slidesPerView: 2,
          centeredSlides: false,
        },
        320: {
          slidesPerView: "auto",
        },
      }}
      scrollbar={{ draggable: true, enabled: true }}
    >
      {children.map((child, index) => (
        <SwiperSlide key={index} className="rounded-full">
          {child}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default GenericCarousel;
