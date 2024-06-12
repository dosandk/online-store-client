import userStore from "./user.js";

describe("UserStore", () => {
  let addEventListenerSpy;

  beforeEach(() => {
    addEventListenerSpy = jest.spyOn(document, "addEventListener");
    userStore.init();
  });

  afterEach(() => {
    userStore.destroy();
    addEventListenerSpy.mockClear();
  });

  it("should initialize login listener", () => {
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "login",
      expect.any(Function),
      { signal: userStore.abortController.signal },
    );
  });

  it("should initialize logout listener", () => {
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "logout",
      expect.any(Function),
      { signal: userStore.abortController.signal },
    );
  });
});
