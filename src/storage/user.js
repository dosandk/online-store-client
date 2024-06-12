import LocalStorageService from "../services/local-storage/index.js";

class UserStore {
  abortController = new AbortController();

  init() {
    // TODO: just temp solution. implement prefix for store
    this.storage = new LocalStorageService(window.sessionStorage);

    this.initListeners();
  }

  initListeners() {
    document.addEventListener(
      "login",
      () => {
        this.login();
      },
      { signal: this.abortController.signal },
    );

    document.addEventListener(
      "logout",
      () => {
        this.logout();
      },
      { signal: this.abortController.signal },
    );
  }

  isAuthorized() {
    return this.storage.get("isAuthorized");
  }

  login() {
    this.storage.add("isAuthorized", true);
  }

  logout() {
    this.storage.remove("isAuthorized");
  }

  destroy() {
    this.abortController.abort();
  }
}

const userStore = new UserStore();

export default userStore;
