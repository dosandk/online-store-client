import BaseComponent from "../base-component.js";
import { signin } from "../../api/auth.js";

import "./login-form.css";

export default class LoginForm extends BaseComponent {
  constructor(onSuccessCallback = () => {}, onErrorCallback = () => {}) {
    super();
    this.signin = signin;

    this.onSuccessCallback = onSuccessCallback;
    this.onErrorCallback = onErrorCallback;

    this.init();
    this.initEventListeners();
  }

  get template() {
    return `<div class="login-form-wrapper">
      <form class="login-form" data-element="formElement" novalidate>
        <fieldset data-element="fieldset">
          <div class="container mt-5 mb-5">
            <div class="row justify-content-center">
              <div class="col-md-8">
                <h2 class="mb-4">Login</h2>
                <form id="loginForm">
                  <div class="mb-3">
                    <label for="username" class="form-label">Username</label>
                    <input
                      type="email"
                      class="form-control"
                      id="username"
                      name="email"
                      required
                      data-cy="email"
                    />
                    <div class="invalid-feedback">Please fill email</div>
                  </div>
                  <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input
                      type="password"
                      class="form-control"
                      id="password"
                      name="password"
                      required
                      data-cy="password"
                    />
                    <div class="invalid-feedback">Please fill password</div>
                  </div>
                  <button type="submit" data-element="loginBtn" class="btn btn-primary" data-cy="login-submit-btn">Login</button>

                  <div class="invalid-feedback" data-cy="invalid-credentials">Invalid Credentials</div>
                </form>
              </div>
            </div>
          </div>
        </fieldset>
      </form>
    </div>`;
  }

  onSuccess() {
    this.stopLoading();
    this.dispatchEvent("login", {});
    this.onSuccessCallback();
  }

  onError() {
    this.stopLoading();
    this.onErrorCallback();
  }

  startLoading() {
    const { fieldset, loginBtn } = this.subElements;

    fieldset.setAttribute("disabled", "true");

    loginBtn.innerHTML = `
      <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
      <span role="status">Loading...</span>
    `;
  }

  stopLoading() {
    const { fieldset, loginBtn } = this.subElements;

    fieldset.removeAttribute("disabled");
    loginBtn.innerHTML = "Login";
  }

  initEventListeners() {
    const { formElement } = this.subElements;

    formElement.addEventListener("submit", async (event) => {
      event.preventDefault();

      if (!formElement.checkValidity()) {
        formElement.classList.add("was-validated");
        return;
      }

      const formData = Object.fromEntries(new FormData(formElement));

      try {
        this.startLoading();
        await this.signin({
          body: JSON.stringify(formData),
        });
        this.showAlert("success", "Login success");
        this.onSuccess();
      } catch (error) {
        this.showAlert("error", "Login error");
        formElement.classList.remove("was-validated");
        this.showValidationErrors(error);
        this.onError();
      }
    });
  }

  showAlert(type = "", message = "") {
    this.dispatchEvent(`show-${type}-alert`, message);
  }

  showValidationErrors() {
    const errorMsgElement = this.element.querySelector("button");

    errorMsgElement.classList.add("is-invalid");
  }
}
