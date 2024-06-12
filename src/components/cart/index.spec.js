import Cart from "./index.js";
import { products } from "../../fixtures/products.js";
import productStore from "../../storage/store.js";

describe("Cart component", () => {
  let cart;

  beforeAll(() => {
    productStore.init();
  });

  afterAll(() => {
    productStore.destroy();
  });

  beforeEach(() => {
    const [p1, p2, p3] = products;

    localStorage.setItem(p1.id, JSON.stringify(p1));
    localStorage.setItem(p2.id, JSON.stringify(p2));
    localStorage.setItem(p3.id, JSON.stringify(p3));

    cart = new Cart();

    document.body.append(cart.element);
  });

  afterEach(() => {
    localStorage.clear();
    cart.destroy();

    document.body.innerHTML = "";
  });

  it("should be rendered correctly", () => {
    expect(cart.element).toBeInTheDocument();
    expect(cart.element).toBeVisible();
  });

  it("should render total price correctly", () => {
    const { total } = cart.subElements;

    expect(total).toHaveTextContent("600");
  });

  it("should increase total price after product added", () => {
    const firstProduct = cart.element.querySelector(
      "[data-element='counterContainer']",
    );

    const addBtn = firstProduct.querySelector(".count-btn[data-counter='1']");

    addBtn.click();

    const { total } = cart.subElements;

    expect(total).toHaveTextContent("700");
  });

  it("should decrease total price after product removed", () => {
    const firstProduct = cart.element.querySelector(
      "[data-element='counterContainer']",
    );

    const addBtn = firstProduct.querySelector(".count-btn[data-counter='-1']");

    addBtn.click();

    const { total } = cart.subElements;

    expect(total).toHaveTextContent("500");
  });

  it("should have ability to be destroyed", () => {
    cart.destroy();

    expect(cart.element).not.toBeInTheDocument();
  });
});
