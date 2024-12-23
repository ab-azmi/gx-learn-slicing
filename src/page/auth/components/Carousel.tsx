import { useEffect, useState } from "react";
import CakeOne from "@/assets/images/cake1.jpg";
import CakeTwo from "@/assets/images/cake2.jpg";
import CakeThree from "@/assets/images/cake3.jpg";
import { motion, AnimatePresence } from "framer-motion";

const carouselObj = (image: string, caption: string, by: string) => {
  return {
    image,
    caption,
    by,
  };
};

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const slides = [
    carouselObj(
      CakeOne,
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, maiores!",
      "Gordon B. Hinckley"
    ),
    carouselObj(
      CakeTwo,
      "Seperti masyarakat di wilayah terpencil lainnya, disini juga sama",
      "John D Doe"
    ),
    carouselObj(
      CakeThree,
      "Consectetur adipisicing elit. Eveniet, lainnya, disini juga sama",
      "Meaowrice L"
    ),
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const handleClick = (index: number) => {
    setCurrentSlide(index);
  };

  const slideVariants = {
    hiddenLeft: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
    exitLeft: {
      opacity: 0,
      transition: {
        duration: 1,
      },
    },
  };

  return (
    <div className="position-relative h-100 w-100 slides">
      <div className="h-100 position-relative">
        <div className="login-image-gradient-layer rounded-4"></div>
        <AnimatePresence>
          <motion.img
            key={slides[currentSlide].image}
            variants={slideVariants}
            initial="hiddenLeft"
            animate="visible"
            exit="exitLeft"
            src={slides[currentSlide].image}
            alt="slide"
            className="object-fit-cover rounded-4 position-absolute h-100 w-100"
          />
        </AnimatePresence>
      </div>

      <div className="text-white login-image-caption d-flex flex-column gap-2 w-80">
        <AnimatePresence>
          <motion.div
            key={slides[currentSlide].image}
            variants={slideVariants}
            initial={"hiddenLeft"}
            animate="visible"
            exit={"exitLeft"}
          >
            <h6 className="fw-light">- {slides[currentSlide].by}</h6>
            <h3>"{slides[currentSlide].caption}"</h3>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="login-image-nav">
        {slides.map((_, index) => (
          <button
            key={_.by}
            type="button"
            onClick={() => handleClick(index)}
            className={currentSlide == index ? "active" : ""}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
