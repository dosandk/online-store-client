import PaymentStatusPage from "./index";

describe("PaymentStatus page", () => {
  let page;

  beforeEach(() => {
    page = new PaymentStatusPage();

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

  it("should have ability to be destroyed", () => {
    page.destroy();

    expect(page.element).not.toBeInTheDocument();
  });
});
