import "@testing-library/jest-dom";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

beforeAll(() => {
  window[Symbol.for("app-config")] = {
    BACKEND_URL: "http://example.com/",
  };
});

afterAll(() => {
  window[Symbol.for("app-config")] = {};
});
