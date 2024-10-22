import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../page/App";
import userEvent from "@testing-library/user-event";

const mockedUseNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const mod = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );
  return {
    ...mod,
    useNavigate: () => mockedUseNavigate,
  };
});

describe("Button Component", () => {
  beforeEach(() => {
    render(<App />, {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={["/login"]}>{children}</MemoryRouter>
      ),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("renders page title", () => {
    const title = screen.getByText("Welcome to");
    expect(title).toBeDefined();
    const title2 = screen.getByText("GX Hybrid");
    expect(title2).toBeDefined();
    const title3 = screen.getByText("Work Schedule System v1.0");
    expect(title3).toBeDefined();
  })

  test("renders login button", () => {
    const buttons = screen.getAllByRole("button", { name: "Sign In" });
    expect(buttons).toBeDefined();
  });

  test("renders inputs email and password", () => {
    const email = screen.getByRole("textbox", { name: /email/i });
    expect(email).toBeDefined();
    const password = screen.getByLabelText(/password/i);
    expect(password).toBeDefined();
  })

  test("should navigate to '/' when click login", async () => {
    //get the button
    const button = screen.getByText("Sign In");
    //check if the button is defined
    expect(button).toBeDefined();
    //click the button
    await userEvent.click(button);
    //check if the push function is called
    expect(mockedUseNavigate).toBeCalledWith("/");
  });

  test("should toggle show and hide password", async () => {
    expect(screen.getByLabelText(/password/i)).toHaveProperty('type', 'password');
    await userEvent.click(screen.getByTestId("show-password-toggle"));
    expect(screen.getByLabelText(/password/i)).toHaveProperty('type', 'text');
  })


});
