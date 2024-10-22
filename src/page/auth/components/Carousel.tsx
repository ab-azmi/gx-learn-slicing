import { useEffect, useState } from "react";
import Pakis from "../assets/images/pakis.jpg";
import Mountain from "../assets/images/mountain.jpg";
import { motion, AnimatePresence } from "framer-motion";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const slides = [
    {
      image: Pakis,
      caption:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, maiores!",
      by: "Gordon B. Hinckley",
    },
    {
      image: Mountain,
      caption:
        "Seperti masyarakat di wilayah terpencil lainnya, disini juga sama",
      by: "John D Doe",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const handleClick = (index: number) => {
    setCurrentSlide(index);
  };

  const slideVariants = {
    hiddenLeft: {
      x: "-5%",
      opacity: 0,
    },
    visible: {
      x: "0",
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
    exitLeft: {
      opacity: 0,
    },
  };

  return (
    <div className="position-relative h-100 w-100 slides">
      <AnimatePresence>
        <div className="h-100 position-relative">
          <div className="login-image-gradient-layer rounded-4"></div>
          <motion.img
            key={currentSlide}
            variants={slideVariants}
            initial={"hiddenLeft"}
            animate="visible"
            exit={"exitLeft"}
            src={slides[currentSlide].image}
            alt="slide"
            className="object-fit-cover rounded-4 position-absolute"
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        <div className="text-white login-image-caption d-flex flex-column gap-2 w-80">
          <motion.div
            key={currentSlide}
            variants={slideVariants}
            initial={"hiddenLeft"}
            animate="visible"
            exit={"exitLeft"}
          >
            <h6 className="fw-light">- {slides[currentSlide].by}</h6>
            <h3>"{slides[currentSlide].caption}"</h3>
          </motion.div>
        </div>
        <div className="login-image-nav">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleClick(index)}
              className={currentSlide == index ? "active" : ""}
            ></button>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default Carousel;