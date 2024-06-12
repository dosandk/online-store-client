import Page from "./index.js";
import productStore from "../../storage/store.js";

const categories = ["Monitors", "Laptops", "Video cards"];
const brands = ["Asus", "Acer", "Apple"];
const products = [
  {
    id: "76w0hz7015kkr9kjkav",
    images: [
      "https://content2.rozetka.com.ua/goods/images/big_tile/370191080.jpg",
    ],
    title:
      "Acer Aspire 5 A515-57-59VX Steel Gray (NX.KN4EU.00C) / Intel Core i5-12450H / RAM 16 ГБ / SSD 512 ГБ",
    rating: 2.89,
    price: 15999,
    category: "laptops",
    brand: "acer",
  },
];

describe("Page", () => {
  let page;

  beforeAll(() => {
    productStore.init();
  });

  afterAll(() => {
    productStore.destroy();
  });

  beforeEach(() => {
    fetchMock.mockResponses(
      [JSON.stringify(categories), { status: 200 }],
      [JSON.stringify(brands), { status: 200 }],
      [
        JSON.stringify(products),
        {
          status: 200,
          headers: {
            "X-Total-Count": "100",
          },
        },
      ],
    );

    page = new Page();

    document.body.append(page.element);
  });

  afterEach(() => {
    fetchMock.resetMocks();
    page.destroy();
    page = null;
    document.body.innerHTML = "";
  });

  it("should be rendered correctly", () => {
    expect(page.element).toBeInTheDocument();
    expect(page.element).toBeVisible();
  });

  it("should redirect to cart page", async () => {
    // TODO: implement it
  });

  it("should have ability to be destroyed", () => {
    page.destroy();

    expect(page.element).not.toBeInTheDocument();
  });
});
