import LogoVertical from "@/assets/images/logo.png";
import Input from "@/components/Input";
import Button from "@/components/Button";
import useLogin from "@/page/auth/hooks/useLogin";
import Carousel from "@/page/auth/components/Carousel";
import CheckBox from "@/components/CheckBox";
import handleInput from "@/helpers/input.helper";
const Login = () => {
  const { input, errors, loading, handleSubmit, setInput } = useLogin();

  return (
    <div className="vh-100 vw-100 p-3">
      <div className="d-flex h-100 w-100">
        <div className="col-lg-6 px-5 d-flex flex-column justify-content-between h-100">
          <div className="w-70 mx-auto py-3 d-flex flex-column justify-content-center gap-3 h-100">
            <img
              src={LogoVertical}
              alt="logo"
              className="mb-3 align-self-center"
              style={{ width: "6rem" }}
            />
            <div className="mb-3">
              <h1 className="fs-3 fw-bold lh-1">
                Welcome Back to Cake Festival
              </h1>
              <span className="fw-light">Login to your account below</span>
            </div>
            <form onSubmit={handleSubmit} className="d-flex flex-column gap-4">
              <Input
                value={input.email}
                onChange={(e) => handleInput(e, setInput, input)}
                name="email"
                label="Email"
                required
                placeholder="you@globalxtreme.net"
                type="email"
                errors={errors?.email}
              />
              <Input
                value={input.password}
                onChange={(e) => handleInput(e, setInput, input)}
                name="password"
                required
                label="Password"
                placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
                type="password"
                errors={errors?.password}
              />
              <div className="flex-between">
                <CheckBox checked={input.remember || false} onChange={() => setInput({
                  ...input,
                  remember: !input.remember
                })} label="Remember me"/>
                
                <a href="/" className="text-decoration-none text-decoration-underline text-primary">
                  Forgot Password?
                </a>
              </div>
              <div className="mt-3 w-100 d-flex flex-column gap-3">
                <Button type="submit" disabled={loading}>
                  {loading ? "Loading..." : "Sign In"}
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
