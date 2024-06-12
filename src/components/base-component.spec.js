import BaseComponent from "./base-component.js";

describe("Base component", () => {
  let component;

  beforeEach(() => {
    component = new BaseComponent();
  });

  afterEach(() => {
    component.destroy();
    component = null;
  });

  it("should have init method", () => {
    expect(component.init).toBeDefined();
  });

  it("should have render method", () => {
    expect(component.render).toBeDefined();
  });

  it("should have beforeRender method", () => {
    expect(component.beforeRender).toBeDefined();
  });

  it("should have afterRender method", () => {
    expect(component.afterRender).toBeDefined();
  });

  it("should have destroy method", () => {
    expect(component.destroy).toBeDefined();
  });

  it("should have beforeDestroy method", () => {
    expect(component.beforeDestroy).toBeDefined();
  });

  it("should have afterDestroy method", () => {
    expect(component.afterDestroy).toBeDefined();
  });

  it("should have dispatchEvent method", () => {
    expect(component.dispatchEvent).toBeDefined();
  });

  it("should have ability to be destroyed", () => {
    component.destroy();

    expect(component.element).not.toBeInTheDocument();
  });
});
