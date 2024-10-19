import Mountain from "../../assets/images/mountain.jpg";
import LogoVerical from "../../assets/images/logo-vertical.svg";
const Login = () => {
  return (
    <div className="vh-100 vw-100 p-3">
      <div className="d-flex h-100 w-100">
        <div className="col-md-6 p-5">
          <div className="w-70 mx-auto">
            <img src={LogoVerical} alt="logo" className="mb-4" />
            <h1 className="fs-2">
              Welcome to{" "}
              <span className="fw-bold">
                GX Hybrid Work Schedule System v1.0
              </span>
            </h1>
            <p className="text-muted">Login to your account below</p>
            <form action="">
              <div className="d-flex flex-column gap-1 form-group">
                <label htmlFor="email" className="fw-light">Email</label>
                <input type="text" className="form-control" placeholder="email@gmail.com"/>
              </div>
            </form>
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
            <div className="position-absolute bottom-0 start-0">
              <div className="text-white">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Eveniet, maiores!
                </p>
              </div>
              <div>
                <button>lool</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
