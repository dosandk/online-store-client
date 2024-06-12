import productStore from "./store.js";
import { products } from "../fixtures/products.js";

describe("ProductStore", () => {
  let addEventListenerSpy;

  beforeEach(() => {
    addEventListenerSpy = jest.spyOn(document, "addEventListener");

    const [p1, p2, p3] = products;

    localStorage.setItem(p1.id, JSON.stringify(p1));
    localStorage.setItem(p2.id, JSON.stringify(p2));
    localStorage.setItem(p3.id, JSON.stringify(p3));

    productStore.init();
  });

  afterEach(() => {
    productStore.destroy();
    addEventListenerSpy.mockClear();
    localStorage.clear();
  });

  it("should initialize add-to-cart listener", () => {
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "add-to-cart",
      expect.any(Function),
      { signal: productStore.abortController.signal },
    );
  });

  it("should initialize remove-from-cart listener", () => {
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "remove-from-cart",
      expect.any(Function),
      { signal: productStore.abortController.signal },
    );
  });

  it("should initialize increase-counter listener", () => {
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "increase-counter",
      expect.any(Function),
      { signal: productStore.abortController.signal },
    );
  });

  it("should initialize decrease-counter listener", () => {
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "decrease-counter",
      expect.any(Function),
      { signal: productStore.abortController.signal },
    );
  });
});
