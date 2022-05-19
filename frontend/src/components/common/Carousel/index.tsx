import Slider from "react-slick";

// style
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

type Props = {
  children: React.ReactNode;
  setPhotoIndex: React.Dispatch<React.SetStateAction<number>>;
};

const Carousel = ({ children, setPhotoIndex }: Props) => {
  return (
    <Slider
      {...settings}
      beforeChange={(currentIndex, newIndex) => setPhotoIndex(newIndex)}
    >
      {children}
    </Slider>
  );
};

export default Carousel;
