import CustomAlert from "./index.js";

describe("Alert component", () => {
  let alert;

  beforeEach(() => {
    jest.useFakeTimers();

    alert = new CustomAlert();

    document.body.append(alert.element);
  });

  afterEach(() => {
    alert.destroy();
    alert = null;
    document.body.innerHTML = "";
  });

  it("should be rendered correctly", () => {
    expect(alert.element).toBeInTheDocument();
    expect(alert.element).toBeVisible();
  });

  it("should have success type by default", () => {
    expect(alert.element).toHaveClass("alert-success");
  });

  it("should be removed after 2 seconds", () => {
    jest.spyOn(global, "setTimeout");
    jest.runAllTimers();

    expect(window.setTimeout).toHaveBeenCalled();
    expect(alert.element).not.toBeVisible();
  });

  it("should have ability to be destroyed", () => {
    alert.destroy();

    expect(alert.element).not.toBeInTheDocument();
  });
});
