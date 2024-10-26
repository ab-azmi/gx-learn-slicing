import LogoVerical from "@/assets/images/logo-vertical.svg";
import Input from "@/components/Input";
import Button from "@/components/Button";
import useLogin from "@/page/auth/hooks/useLogin";
import Carousel from "@/page/auth/components/Carousel";
const Login = () => {
  const { input, hanldleSubmit, handleInput } = useLogin();

  return (
    <div className="vh-100 vw-100 p-3">
      <div className="d-flex h-100 w-100">
        <div className="col-lg-6 px-5 d-flex flex-column justify-content-between h-100">
          <div className="w-lg-60 w-md-100 mx-auto py-3 d-flex flex-column justify-content-center gap-3 h-100">
            <img
              src={LogoVerical}
              alt="logo"
              className="mb-5"
              style={{ width: "7rem" }}
            />
            <div className="mb-4">
              <h1 className="fs-3 lh-1">
                Welcome to <span className="fw-bold">GX Hybrid</span>
              </h1>
              <h1 className="fs-3 fw-bold lh-1">Work Schedule System v1.0</h1>
              <span className="fw-light">Login to your account below</span>
            </div>
            <form onSubmit={hanldleSubmit} className="d-flex flex-column gap-4">
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
              <div className="mt-3 w-100 d-flex flex-column gap-3">
                <Button type="submit">
                  <span>Sign In</span>
                </Button>
                <span className="text-muted text-center text-xs">
                  Or Sign In Using
                </span>
                <Button type="button" style="outline">
                  <span>
                    GX Employee OAuth 2.0
                  </span>
                </Button>
              </div>
            </form>
          </div>
          <div className="w-90 mx-auto">
            <div className="d-flex justify-content-between align-items-center text-xs text-muted pt-3 border-top">
              <span>©️ 2024 GX APP - Committed to better quality</span>
              <span>Design & Development by GlobalXtreme</span>
            </div>
          </div>
        </div>
        <div className="col-md-6 h-100">
          <Carousel />
        </div>
      </div>
    </div>
  );
};

export default Login;
