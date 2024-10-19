import Mountain from "../../assets/images/mountain.jpg";
import Pakis from "../../assets/images/pakis.jpg";
import LogoVerical from "../../assets/images/logo-vertical.svg";
import Input from "../../components/Input";
import Button from "../../components/Button";
const Login = () => {

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
            <form action="" className="d-flex flex-column gap-3">
              <Input label="Email" placeholder="you@gmail.com" type="email" />
              <Input label="Password" placeholder="password" type="password" />
              <Button>
                <span style={{ fontWeight: "500" }}>Sign In</span>
              </Button>
              <span className="text-muted text-center text-xs">
                Or Sign In Using
              </span>
              <Button style="outline">
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
          <div className="position-relative h-100 w-100">
            <div className="h-100 position-relative">
              <div className="login-image-gradient-layer rounded-4"></div>
              <img
                src={Mountain}
                alt="logo"
                className="object-fit-cover rounded-4"
                style={{ width: "100%", height: "100%" }}
              />
            </div>

            <div className="text-white login-image-caption d-flex flex-column gap-2 w-80">
              <h6 className="fw-light">- Gordon B. Hinckley</h6>
              <h3>
                "Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eveniet, maiores!"
              </h3>
            </div>
            <div className="login-image-nav">
              <button className="active"></button>
              <button ></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
