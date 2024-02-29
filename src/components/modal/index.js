import "./modal-style.css";

export default class Modal {
  subElements = {};
  status = "closed";

  onDocumentClick = (event) => {
    const isModal = event.target.closest('[data-element="modalContainer"]');

    if (!isModal) {
      this.close();
    }
  };

  onDocumentKeyDown = (event) => {
    if (event.code === "Escape") {
      event.preventDefault();
      this.close();
    }
  };

  constructor(component = {}) {
    this.component = component;
    this.controlSelector = "hidden";
    this.render();
    this.getSubElements();
    this.renderComponent();
  }

  addComponent(component = {}) {
    this.component = component;
    this.renderComponent();
  }

  get template() {
    return `<div class="app-modal hidden">
      <div class="modal__content" data-element="modalContainer">
        <div data-element="content">

        </div>
      </div>
    </div>`;
  }

  render() {
    const element = document.createElement("div");

    element.innerHTML = this.template;

    this.element = element.firstElementChild;
  }

  getSubElements() {
    const elements = this.element.querySelectorAll("[data-element]");

    for (const subElement of elements) {
      this.subElements[subElement.dataset.element] = subElement;
    }
  }

  renderComponent() {
    const { content } = this.subElements;

    if (Object.keys(this.component).length) {
      content.append(this.component.element);
    }
  }

  open() {
    document.body.append(this.element);

    this.addEventListeners();
    this.element.classList.remove(this.controlSelector);
  }

  close() {
    this.element.classList.add(this.controlSelector);
    this.remove();
    this.removeEventListeners();
    this.component.destroy();
  }

  addEventListeners() {
    document.addEventListener("keydown", this.onDocumentKeyDown);
    document.addEventListener("pointerdown", this.onDocumentClick, true);
  }

  removeEventListeners() {
    document.removeEventListener("keydown", this.onDocumentKeyDown);
    document.removeEventListener("pointerdown", this.onDocumentClick, true);
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    this.removeEventListeners();
    this.component.destroy();
  }
}
