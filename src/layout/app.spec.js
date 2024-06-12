import App from "./app.js";
import productStore from "../storage/store.js";
import userStore from "../storage/user.js";

describe("App", () => {
  let app;

  beforeAll(() => {
    productStore.init();
    userStore.init();
    app = new App({
      router: {
        addRoute: () => {},
        listen: () => {},
      },
    });
  });

  afterAll(() => {
    productStore.destroy();
    userStore.destroy();
    app.destroy();
    app = null;
  });

  it("should be rendered correctly", async () => {
    expect(app.element).toBeDefined();
  });
});
