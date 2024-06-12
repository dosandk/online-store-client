import PaymentsPage from "./index";
import productStore from "../../storage/store.js";

describe("Payments page", () => {
  let page;

  beforeAll(() => {
    productStore.init();
  });

  afterAll(() => {
    productStore.destroy();
  });

  beforeEach(() => {
    page = new PaymentsPage();

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

  it("should render page title", () => {
    const title = page.element.querySelector(".app-page-title");

    expect(title).toHaveTextContent("Payment Page");
  });

  it("should have ability to be destroyed", () => {
    page.destroy();

    expect(page.element).not.toBeInTheDocument();
  });
});
