import LocalStorageService from "../services/local-storage/index.js";

class ProductStore {
  abortController = new AbortController();

  init() {
    this.storage = new LocalStorageService(window.localStorage);

    this.initListeners();
  }

  initListeners() {
    document.addEventListener(
      "add-to-cart",
      (event) => {
        this.add(event.detail);
      },
      { signal: this.abortController.signal },
    );
    document.addEventListener(
      "remove-from-cart",
      (event) => {
        this.remove(event.detail.id);
      },
      { signal: this.abortController.signal },
    );
    document.addEventListener(
      "increase-counter",
      (event) => {
        const id = event.detail;
        const product = this.get(id);

        if (product === null) {
          throw `There is no product with id: ${id}`;
        }

        product.count += 1;

        this.add(product);
      },
      { signal: this.abortController.signal },
    );

    document.addEventListener(
      "decrease-counter",
      (event) => {
        const id = event.detail;
        const product = this.get(id);

        if (product === null) {
          throw `There is no product with id: ${id}`;
        }

        const newCount = product.count - 1;

        if (newCount === 0) {
          this.remove(id);
        } else {
          this.add({ ...product, ...{ count: newCount } });
        }
      },
      { signal: this.abortController.signal },
    );
  }

  get(id = "") {
    return this.storage.get(id);
  }

  add(product = {}) {
    if (typeof product.count === "undefined") {
      product.count = 1;
    }

    this.storage.add(product.id, product);

    document.dispatchEvent(
      new CustomEvent("added-to-cart", {
        detail: product.id,
        bubbles: true,
      }),
    );
  }

  remove(id = "") {
    this.storage.remove(id);

    document.dispatchEvent(
      new CustomEvent("removed-from-cart", {
        detail: id,
        bubbles: true,
      }),
    );
  }

  getAll() {
    return this.storage.getAll() || [];
  }

  removeAll() {
    const items = this.getAll();

    for (const item of Object.values(items)) {
      this.remove(item.id);
    }
  }

  getProductPrice(id = "") {
    const product = this.get(id);

    if (product === null) return 0;

    return product.price * product.count;
  }

  getTotal() {
    let total = 0;
    const products = this.getAll();

    for (const product of Object.values(products)) {
      total += product.price * product.count;
    }

    return total;
  }

  getProductCount(id = "") {
    const product = this.get(id);

    if (product === null) return 0;

    return product.count;
  }

  getProductsCount() {
    const products = this.getAll();
    let total = 0;

    for (const product of Object.values(products)) {
      total += product.count;
    }

    return total;
  }

  destroy() {
    this.abortController.abort();
    this.storage = null;
  }
}

const productStore = new ProductStore();

export default productStore;
