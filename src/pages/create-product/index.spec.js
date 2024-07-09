import CreateProductPage from "./index";

const categories = ["Monitors", "Laptops", "Video cards"];
const brands = ["Asus", "Acer", "Apple"];
const image = {
  data: {
    link: "link to my image",
  },
};
const product = {
  title: "new product",
  price: 100,
  brand: "asus",
  rating: 1,
  category: "laptops",
  images: ["https://link-to-my-image"],
};

const file = new File(["my super content"], "example.png", {
  type: "image/png",
});

describe("CreateProduct page", () => {
  let page;

  beforeEach(() => {
    fetchMock.mockResponses(
      [JSON.stringify(categories), { status: 200 }],
      [JSON.stringify(brands), { status: 200 }],
      [JSON.stringify(image), { status: 200 }],
      [JSON.stringify(product), { status: 200 }],
    );

    page = new CreateProductPage();

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

  it("should correctly create product", async () => {
    const { form } = page.subElements;
    const { title, price, brand, rating, category, image } = form.elements;

    title.value = product.title;
    price.value = product.price;
    brand.value = product.brand;
    rating.value = product.rating;
    category.value = product.category;

    Object.defineProperty(image, "files", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: [file],
    });

    image.value = [file];

    image.removeAttribute("required");

    const showAlertSpy = jest.spyOn(page, "showAlert");

    form.submit();

    // NOTE: flush all promises
    await new Promise(process.nextTick);

    expect(showAlertSpy).toHaveBeenCalledWith(
      "success",
      "Product was successfully created.",
    );
  });

  it("should render page title", () => {
    const title = page.element.querySelector(".app-page-title");

    expect(title).toHaveTextContent("Create Product");
  });

  it("should have ability to be destroyed", () => {
    page.destroy();

    expect(page.element).not.toBeInTheDocument();
  });
});
