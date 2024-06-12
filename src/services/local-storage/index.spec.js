import LocalStorageService from "./index.js";

describe("LocalStorageService", () => {
  let localStorageService;

  beforeEach(() => {
    localStorageService = new LocalStorageService(global.localStorage);
  });

  afterEach(() => {
    localStorageService.removeAll();
  });

  it("should add an item to localStorage", () => {
    const key = "testKey";
    const value = { name: "Test", age: 25 };

    localStorageService.add(key, value);

    expect(localStorageService.get(key)).toEqual(value);
  });

  it("should remove an item from localStorage", () => {
    const key = "testKey";
    const value = { name: "Test", age: 25 };

    localStorageService.add(key, value);
    localStorageService.remove(key);

    expect(localStorageService.get(key)).toBeNull();
  });

  it("should get all items from localStorage", () => {
    const data = {
      key1: { name: "Test1", age: 25 },
      key2: { name: "Test2", age: 30 },
    };

    Object.keys(data).forEach((key) => {
      localStorageService.add(key, data[key]);
    });

    expect(localStorageService.getAll()).toEqual(data);
  });

  it("should remove all items from localStorage", () => {
    const data = {
      key1: { name: "Test1", age: 25 },
      key2: { name: "Test2", age: 30 },
    };

    Object.keys(data).forEach((key) => {
      localStorageService.add(key, data[key]);
    });

    localStorageService.removeAll();

    expect(localStorageService.getAll()).toBeNull();
  });
});
