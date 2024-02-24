// NOTE: this import needed for bootstrap navigation toaster icon
import { Offcanvas } from "bootstrap";
import Modal from "../modal/index.js";
import LoginForm from "../login-form/index.js";
import { isAuthorized } from "../../router/guards/index.js";
import { signOut } from "../../api/auth.js";

export default class NavigationBar {
  subElements = {};

  links = [
    { name: "Home", path: "/home", guard: () => true },
    {
      name: "Create product",
      path: "/create-product",
      guard: () => isAuthorized(),
    },
    { name: "Orders", path: "/orders", guard: () => isAuthorized() },
  ];

  buttons = [
    { name: "Login", guard: () => !isAuthorized() },
    { name: "Logout", guard: () => isAuthorized() },
  ];

  constructor() {
    this.render();
    this.getSubElements();
    this.update();
  }

  createLinks() {
    const fragment = new DocumentFragment();

    for (const link of this.links) {
      const li = document.createElement("li");

      if (!link.guard()) {
        continue;
      }

      li.innerHTML = `
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="${link.path}">${link.name}</a> 
        </li> 
      `;

      fragment.append(li);
    }

    this.subElements.navList.append(fragment);
  }

  createBtns() {
    const fragment = new DocumentFragment();

    for (const button of this.buttons) {
      const li = document.createElement("li");

      if (!button.guard()) {
        continue;
      }

      li.innerHTML = `
        <li class="nav-item">
          <button type="button" class="btn btn-link" data-element="${button.name.toLowerCase()}Btn">${button.name}</button>
        </li>
      `;

      fragment.append(li);
    }

    this.subElements.navList.append(fragment);
  }
  update() {
    this.subElements.navList.innerHTML = "";
    this.createLinks();
    this.createBtns();
    this.getSubElements();
    this.initEventListeners();
  }

  getSubElements() {
    const result = {};
    const subElements = this.element.querySelectorAll("[data-element]");

    for (const item of subElements) {
      result[item.dataset.element] = item;
    }

    this.subElements = result;
  }

  initEventListeners() {
    const { loginBtn, logoutBtn } = this.subElements;

    if (loginBtn) {
      loginBtn.addEventListener("click", () => {
        const modal = new Modal();

        const loginForm = new LoginForm(() => {
          modal.close();
        });

        modal.addComponent(loginForm);
        modal.open();
      });
    }

    if (logoutBtn) {
      logoutBtn.addEventListener("click", async () => {
        try {
          await signOut();

          this.element.dispatchEvent(
            new CustomEvent("show-success-alert", {
              bubbles: true,
              detail: "Logout success",
            }),
          );
          this.element.dispatchEvent(
            new CustomEvent("logout", {
              bubbles: true,
            }),
          );
        } catch (error) {
          this.element.dispatchEvent(
            new CustomEvent("show-error-alert", {
              bubbles: true,
              detail: error.message,
            }),
          );
        }
      });
    }
  }

  get template() {
    return `
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid p-0">

          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarNav">
            <ul data-element="navList" class="navbar-nav justify-content-end flex-grow-1"></ul>
          </div>
        </div>
      </nav>
    `;
  }

  render() {
    const wrapper = document.createElement("div");

    wrapper.innerHTML = this.template;

    this.element = wrapper.firstElementChild;
  }
}