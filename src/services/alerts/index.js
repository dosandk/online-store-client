import CustomAlert from "../../components/alert/index.js";

class AlertsService {
  abortController = new AbortController();
  activeAlert;

  init() {
    this.initListeners();
  }

  initListeners() {
    document.addEventListener(
      "show-success-alert",
      (event) => {
        this.showAlert("success", event.detail);
      },
      { signal: this.abortController.signal },
    );
    document.addEventListener(
      "show-error-alert",
      (event) => {
        this.showAlert("danger", event.detail);
      },
      { signal: this.abortController.signal },
    );
  }

  showAlert(type = "", message = "") {
    if (this.activeAlert) {
      this.activeAlert.close();
    }

    const alert = new CustomAlert(type, message);

    document.body.prepend(alert.element);

    this.activeAlert = alert;
  }

  destroy() {
    this.abortController.abort();
  }
}

const alertsService = new AlertsService();

export default alertsService;
