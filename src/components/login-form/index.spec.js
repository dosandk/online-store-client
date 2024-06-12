import LoginForm from "./index.js";

describe("LoginForm component", () => {
  let loginForm;

  beforeEach(() => {
    loginForm = new LoginForm();

    document.body.append(loginForm.element);
  });

  afterEach(() => {
    loginForm.destroy();
    loginForm = null;
    document.body.innerHTML = "";
  });

  it("should be rendered correctly", () => {
    expect(loginForm.element).toBeInTheDocument();
    expect(loginForm.element).toBeVisible();
  });

  it("should have ability to be destroyed", () => {
    loginForm.destroy();

    expect(loginForm.element).not.toBeInTheDocument();
  });
});
