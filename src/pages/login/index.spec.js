import LoginPage from "./index";

describe("Login page", () => {
  let page;

  beforeEach(() => {
    page = new LoginPage();

    document.body.append(page.element);
  });

  afterEach(() => {
    page.destroy();

    document.body.innerHTML = "";
  });

  it("should be rendered correctly", () => {
    expect(page.element).toBeInTheDocument();
    expect(page.element).toBeVisible();
  });

  it("should render loginForm component", () => {
    const { loginForm } = page.subElements;

    expect(loginForm).toBeInTheDocument();
    expect(loginForm).toBeVisible();
  });

  it("should have onLoginSuccess method", () => {
    expect(page.onLoginSuccess).toBeDefined();
  });

  it("should have onLoginError method", () => {
    expect(page.onLoginError).toBeDefined();
  });

  it("should have ability to be destroyed", () => {
    page.destroy();

    expect(page.element).not.toBeInTheDocument();
    expect(page.components).toEqual({});
  });
});
