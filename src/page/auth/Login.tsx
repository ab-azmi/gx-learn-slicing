import Pakis from "./assets/images/pakis.jpg";
import Mountain from "./assets/images/mountain.jpg";
import LogoVerical from "../../assets/images/logo-vertical.svg";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useEffect, useState } from "react";
import clsx from "clsx";
import useLogin from "./hooks/useLogin";
const Login = () => {
  const {input, hanldleSubmit, handleInput} = useLogin();
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

  return (
    <div className="vh-100 vw-100 p-3 overflow-hidden">
      <div className="d-flex h-100 w-100">
        <div className="col-md-6 px-5 d-flex flex-column justify-content-between">
          <div className="w-70 mx-auto py-5">
            <img src={LogoVerical} alt="logo" className="mb-5" />
            <div className="mb-4">
              <h1 className="fs-2 lh-1">
                Welcome to <span className="fw-bold">GX Hybrid</span>
              </h1>
              <h1 className="fs-2 fw-bold lh-1">Work Schedule System v1.0</h1>
              <span className="text-muted">Login to your account below</span>
            </div>
            <form onSubmit={hanldleSubmit} className="d-flex flex-column gap-3">
              <Input
                value={input.email}
                onChange={handleInput}
                name="email"
                label="Email"
                placeholder="you@globalxtreme.net"
                type="email"
              />
              <Input
                value={input.password}
                onChange={handleInput}
                name="password"
                label="Password"
                placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
                type="password"
              />
              <Button type="submit">
                <span style={{ fontWeight: "500" }}>Sign In</span>
              </Button>
              <span className="text-muted text-center text-xs">
                Or Sign In Using
              </span>
              <Button type="button" style="outline">
                <span style={{ fontWeight: "500" }}>GX Employee OAuth 2.0</span>
              </Button>
            </form>
          </div>
          <div className="w-90 mx-auto">
            <hr />
            <div className="d-flex justify-content-between align-items-center text-xs text-muted">
              <p>©️ 2024 GX APP - Committed to better quality</p>
              <p>Design & Development by GlobalXtreme</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 h-100">
          <div className="position-relative h-100 w-100 slides">
            <div className="h-100 position-relative">
              <div className="login-image-gradient-layer rounded-4"></div>
              <img
                src={slides[currentSlide].image}
                alt="slide"
                className={clsx("object-fit-cover rounded-4")}
                style={{ width: "100%", height: "100%" }}
              />
            </div>

            <div className="text-white login-image-caption d-flex flex-column gap-2 w-80">
              <h6 className="fw-light">- {slides[currentSlide].by}</h6>
              <h3>"{slides[currentSlide].caption}"</h3>
            </div>
            <div className="login-image-nav">
              {slides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentSlide(index)}
                  className={currentSlide == index ? "active" : ""}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
