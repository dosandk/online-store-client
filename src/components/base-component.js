export default class BaseComponents {
  subElements = {};

  beforeInit() { }

  init() {
    this.beforeRender();
    this.render();
    this.getSubElements();
    this.afterRender();
  }

  afterInit() { }

  beforeRender() {
    // This method will be called before render method
  }

  get template() {
    return ``;
  }

  render() {
    const element = document.createElement("div");

    element.innerHTML = this.template;

    this.element = element.firstElementChild;
  }

  afterRender() {
    // This method will be called after render method
  }

  getSubElements() {
    const elements = this.element.querySelectorAll("[data-element]");

    for (const subElement of elements) {
      const name = subElement.dataset.element;

      this.subElements[name] = subElement;
    }
  }

  update() {
    // TODO: Implement update method
  }

  beforeDestroy() { }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  dispatchEvent(type = "", payload = {}) {
    this.element.dispatchEvent(
      new CustomEvent(type, {
        detail: payload,
        bubbles: true,
      }),
    );
  }

  destroy() {
    this.beforeDestroy();
    this.remove();
    this.element = null;
    this.subElements = {};
    this.afterDestroy();
  }

  afterDestroy() { }
}