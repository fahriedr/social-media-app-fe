import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

type CarouselProps = {
    items: React.ReactNode[];
};

const Carousel = ({ items }: CarouselProps) => {
    return (
        <Swiper 
            spaceBetween={10}
            slidesPerView={1}
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            // className="post-carousel"
        >
            {items.map((item, idx) => (
                <SwiperSlide key={idx}>{item}</SwiperSlide>
            ))}
        </Swiper>
    );
};

export default Carousel;
