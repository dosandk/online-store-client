import Modal from "./index.js";

class DummyComponent {
  element;
  destroy() {
    // just mock
  }
}

describe("Modal component", () => {
  let modal;
  let component;

  beforeEach(() => {
    component = new DummyComponent();
    modal = new Modal(component);

    document.body.append(modal.element);
  });

  afterEach(() => {
    modal.destroy();
    modal = null;
    document.body.innerHTML = "";
  });

  it("should be rendered correctly", () => {
    expect(modal.element).toBeInTheDocument();
    expect(modal.element).toBeVisible();
  });

  it("should have ability to be destroyed", () => {
    modal.destroy();

    expect(modal.element).not.toBeInTheDocument();
  });
});
