import LogoVerical from "../../assets/images/logo-vertical.svg";
import Input from "../../components/Input";
import Button from "../../components/Button";
import useLogin from "./hooks/useLogin";
import Carousel from "./components/Carousel";
const Login = () => {
  const { input, hanldleSubmit, handleInput } = useLogin();

  return (
    <div className="vh-100 vw-100 p-3">
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
          <Carousel/>
        </div>
      </div>
    </div>
  );
};

export default Login;
