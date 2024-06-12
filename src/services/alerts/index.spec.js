import alertsService from "./index.js";

describe("AlertsService", () => {
  it("should initialize listeners when initialized", () => {
    const addEventListenerSpy = jest.spyOn(document, "addEventListener");

    alertsService.init();

    expect(addEventListenerSpy).toHaveBeenCalledTimes(2);
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "show-success-alert",
      expect.any(Function),
      { signal: alertsService.abortController.signal },
    );
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "show-error-alert",
      expect.any(Function),
      { signal: alertsService.abortController.signal },
    );
  });

  it("should show success alert", () => {
    const message = "Test success message";

    alertsService.showAlert("success", message);

    const alertElement = document.body.querySelector(".alert");

    expect(alertElement).toHaveClass("alert-success");
    expect(alertElement).toHaveTextContent(message);
  });

  it("should show error alert", () => {
    const message = "Test error message";

    alertsService.showAlert("danger", message);

    const alertElement = document.body.querySelector(".alert");

    expect(alertElement).toHaveClass("alert-danger");
    expect(alertElement).toHaveTextContent(message);
  });
});
