export default class LocalStorageService {
  #storage;

  constructor(storage) {
    this.#storage = storage;
  }

  add(key, value) {
    return this.#storage.setItem(key, JSON.stringify(value));
  }

  get(key) {
    return JSON.parse(this.#storage.getItem(key));
  }

  remove(key) {
    this.#storage.removeItem(key);
  }

  getAll() {
    const keys = Object.keys(this.#storage);

    if (keys.length === 0) return null;

    return keys.reduce((accum, key) => {
      accum[key] = this.get(key);
      return accum;
    }, {});
  }

  removeAll() {
    const allRecords = this.getAll();

    if (allRecords === null) return;

    const serviceKeys = Object.keys(allRecords);

    serviceKeys.forEach((key) => {
      this.remove(key);
    });
  }
}
