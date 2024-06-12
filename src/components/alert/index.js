import { Alert } from "bootstrap";
import BaseComponent from "../base-component";

export default class CustomAlert extends BaseComponent {
  timerId;
  constructor(type = "success", message = "") {
    super();
    this.type = type;
    this.message = message;

    this.init();

    // NOTE: register alert for closing
    new Alert(this.element);

    this.timerId = setTimeout(() => {
      this.close();
    }, 2000);
  }

  close() {
    clearTimeout(this.timerId);

    const alert = Alert.getInstance(this.element);

    if (alert) {
      alert.close();
    }
  }

  get template() {
    return `
      <div class="alert alert-${this.type} alert-dismissible fade show fixed-top w-100" role="alert" data-cy="alert">
        ${this.message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
  }

  bereforeDestroy() {
    this.close();
  }
}
