import productStore from "../../storage/store.js";
import { getOrders } from "../../api/payments.js";

import "./orders.css";

class OrderTable {
  constructor(order = {}) {
    this.order = order;
    this.render();
  }

  get template() {
    return `
      <table class="table caption-top">
        <caption>Order from ${this.orderDate}</caption>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Image</th>
            <th scope="col">Title</th>
            <th scope="col">Count</th>
            <th scope="col">Price</th>
            <th scope="col">Total</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody data-element="tbody">${this.getTableBody()}</tbody>
      </table>
    `;
  }

  get orderDate() {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "full",
      timeStyle: "long",
    }).format(this.order.created * 1000);
  }

  getTableBody() {
    if (!this.order.products.length) {
      return `<td colspan="7" class="text-center">There is no orders</td>`;
    }
    return this.order.products
      .map((product, index) => {
        return `
          <tr>
            <th scope="row">${index + 1}</th>
            <td>
             <div class="item-preview">
               <img src="${product.images[0]}" alt="${product.title}">
             </div>
            </td>
            <td class="w-25">${product.title}</td>
            <td>${product.quantity}</td>
            <td>${product.price}</td>
            <td>${product.quantity * product.price}</td>
            <td>${this.order.status}</td>
          </tr>
      `;
      })
      .join("");
  }

  render() {
    const wrapper = document.createElement("div");

    wrapper.innerHTML = this.template;

    this.element = wrapper.firstElementChild;
  }
}

export default class OrdersPage {
  constructor() {
    this.getOrders = getOrders;

    this.render();
    this.getSubElements();
    this.loadData();
  }

  async loadData() {
    try {
      const orders = await this.getOrders();

      this.update(orders);
    } catch (error) {
      this.element.dispatchEvent(
        new CustomEvent("show-error-alert", {
          bubbles: true,
          detail: error.message,
        }),
      );
    }
  }

  get template() {
    return `<div>
      <h2 class="app-page-title">Orders</h2> 

      <div data-element="ordersList"></div>
    </div>`;
  }

  getTableHead() {
    return `
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Image</th>
          <th scope="col">Title</th>
          <th scope="col">Count</th>
          <th scope="col">Price</th>
          <th scope="col">Total</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
    `;
  }

  update(orders = []) {
    const { ordersList } = this.subElements;

    if (!orders.length) {
      ordersList.append("There are no orders yet.");
    }

    const fragment = new DocumentFragment();

    for (const order of orders) {
      const orderTable = new OrderTable(order);

      fragment.append(orderTable.element);
    }

    ordersList.append(fragment);
  }

  render() {
    const wrapper = document.createElement("div");

    wrapper.innerHTML = this.template;

    this.element = wrapper.firstElementChild;
  }

  getSubElements() {
    const result = {};
    const subElements = this.element.querySelectorAll("[data-element]");

    for (const item of subElements) {
      result[item.dataset.element] = item;
    }

    this.subElements = result;
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    this.element = null;
    this.subElements = {};
  }
}