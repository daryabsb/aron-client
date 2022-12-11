import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { useRouter } from "vue-router";
import ordersAPI from "@/services/ordersAPI";
import { useUtils } from "@/Orders/orderComposables/useUtils";
import { modals } from "@/Orders/orderComposables/useModals";
import Order from "@/Orders/orderTemplates/Order";

import OrderItem from "@/Orders/orderTemplates/OrderItem";
import { useOrderItem } from "@/Orders/orderComposables/orderItemProperties";
Array.prototype.unique = function () {
  var a = this.concat();
  for (var i = 0; i < a.length; ++i) {
    for (var j = i + 1; j < a.length; ++j) {
      if (a[i].number === a[j].number) a.splice(j--, 1);
    }
  }
  return a;
};

export const useOrderStore = defineStore("orders", {
  // STATE
  state: () => ({
    cart: useStorage("cart", []),
    activeNumber: useStorage("activeNumber", ""),
    activeItem: useStorage("activeItem", {}),
    // const activeOrder = ref(useStorage("activeOrder", {}));
    paymentTypes: useStorage("paymentTypes", []),
    ...useUtils(),
  }),

  // GETTERS
  getters: {
    useActiveOrder(state) {
      const order = state.cart.find(
        (item) => item.number === state.activeNumber
      );
      return new Order(order);
    },
    useActiveItem(state) {
      // if (!this.useActiveOrder) return {};
      // if (!state.activeItem) return {};
      return this.useActiveOrder.items.find(
        (item) => item.number == state.activeItem.number
      );
    },
    usePaymentTypes(state) {
      return state.paymentTypes;
    },
  },

  // ACTIONS
  actions: {
    async generateNumber(target) {
      try {
        const response = await ordersAPI.getNumber(target);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async createCart(number) {
      const order = new Order({ number: number });
      this.cart = [order, ...this.cart].unique();
      this.updateChange();
      return order;
    },
    async deleteOrder(number = this.useActiveOrder.number) {
      const index = this.cart.findIndex((order) => order.number == number);

      if (index == 0) {
        this.cart[0].items = [];
        return;
        // this.activeNumber = await this.cart[0].number;
      } else if (index == 0 && this.cart.length == 1) {
        this.cart.shift();
        this.activeNumber = await this.cart[0].number;
      } else {
        this.cart.splice(index, 1);
        this.activeNumber = await this.cart[index - 1].number;
      }

      await this.router.push(`/store/order/${this.activeNumber}`);

      // this.router.push(`/store/order/${this.activeNumber}`);
      // const item = this.useActiveOrder.items[index];
    },
    async submitOrder(data) {
      // TASKS:
      // submit an order to the API
      try {
        const orderPayload = {
          number: this.useActiveOrder.number,
          discount: this.useActiveOrder.discount,
          discount_type: this.useActiveOrder.discount_type,

          orderItems: ["this.useActiveOrder.items", "and there it is"],
          status: true,
          total: this.useActiveOrder.totalPrice,
        };
        const ordersResponse = await ordersAPI.submitOrder(orderPayload);
      } catch (error) {
        console.log("submitOrderError", error);
      }

      try {
        this.useActiveOrder.items.forEach(async (item) => {
          const product = item.product.id;
          const price = this.useActiveOrder.itemTotal(item);
          const itemPayload = {
            number: item.number,
            round_number: 0,
            quantity: item.quantity,
            price: price,
            is_locked: false,
            discount: item.discount,
            discount_type: item.discount_type,
            is_featured: false,
            voided_by: 0,
            comment: "",
            bundle: "",
            user: 1,
            order: this.useActiveOrder.number,
            product: product,
          };
          const orderItemResponse = await ordersAPI.submitOrderItem(
            itemPayload
          );
        });
      } catch (error) {
        console.log("submitOrderItemsError", error);
      }
      const number = await this.generateNumber("order");
      const orderedIndex = this.cart.findIndex(
        (i) => i.number === this.useActiveOrder.number
      );
      await this.cart.splice(orderedIndex, 1);
      const newOrder = await this.createCart(`${number}`);
      return newOrder;
    },
    async loadPaymentTypes() {
      try {
        const ptResponse = await ordersAPI.getPaymentTypes();
        this.paymentTypes = await ptResponse.data;
      } catch (error) {
        console.log("loadPaymentTypes error", error);
      }
    },
    async createCartFromAPI() {
      // const storageCart = JSON.parse(localStorage.getItem("cart"));
      // let newOrders = [];
      try {
        const ordersResponse = await ordersAPI.getOrders();
        newOrders = ordersResponse.data.map(
          (order) => (order = new Order(order))
        );
        // All Items shoulld be converted to local  items
        newOrders.forEach((order) => {
          if (order.items.length > 0) {
            order.items.map(
              (item) => (item = useOrderItem(new OrderItem(item)))
            );
          }
        });
        this.cart = [...this.cart, ...newOrders].unique();
      } catch (error) {
        console.log(error);
      }
      this.updateChange();
      // return newOrders;
    },

    changeActiveOrderNumber(number) {
      this.activeNumber = number;
    },
    setActiveItem(item) {
      this.activeItem = item;
    },

    generateUID() {
      let firstPart = new Date();
      let secondPart = (Math.random() * (49999 - 101) + 101) | 0;
      firstPart = `${firstPart.getDate()}${firstPart.getMonth()}${firstPart.getFullYear()}`;
      secondPart = secondPart.toString();
      return firstPart + secondPart;
    },
    useOrderItemIndex(orderItem) {
      return this.useActiveOrder.items.findIndex(
        (item) => item.product.id === orderItem.product.id
      );
    },

    addToCart(orderItem) {
      const index = this.useOrderItemIndex(orderItem.value);
      if (index === -1) {
        const newItem = new OrderItem(orderItem.value);
        // PROBLEM PROBLEM PROBLEM
        this.useActiveOrder.items.push(orderItem.value);
        // this.useActiveOrder.items.push(newItem);
        const item = this.useActiveOrder.items.find(
          (i) => i.number === orderItem.value.number
        );
        this.setActiveItem(item);
      } else {
        this.addQty(orderItem.value, (orderItem.value.quantity = 1), index);
      }
      // updateLocalStorage();
      this.beep();
      this.updateChange();
    },
    deleteItem() {
      const index = this.useOrderItemIndex(this.activeItem);
      // const item = this.useActiveOrder.items[index];
      this.useActiveOrder.items.splice(index, 1);
    },
    addQty(orderItem, quantity, index) {
      if (!index) index = this.useOrderItemIndex(orderItem);
      const item = this.useActiveOrder.items[index];
      const afterAdd = item.quantity + quantity;
      if (afterAdd === 0) {
        this.useActiveOrder.items.splice(index, 1);
        this.clearSound();
      } else {
        item.quantity = afterAdd;
        this.setActiveItem(item);
        this.beep();
      }
      // updateLocalStorage();
      this.updateChange();
    },
    appllyItemDiscount(discountType, discount) {
      // const cartOrderItem = useActiveOrder.value.items.find(
      //   (item) => item.number === orderItem.number
      // );
      try {
        this.activeItem.discount = discount;
        this.activeItem.discount_type = discountType;

        // updateLocalStorage();
        this.updateChange();
      } catch (error) {
        console.log(error);
      }
    },
    appllyCartDiscount(discountType, discount) {
      const cartItem = this.cart.find(
        (item) => item.number === this.useActiveOrder.number
      );
      try {
        cartItem.discount = discount;
        cartItem.discount_type = discountType;

        // updateLocalStorage();
        this.updateChange();
      } catch (error) {
        console.log(error);
      }
    },
    applyRound(price, round) {
      const remainder = price % round;
      return remainder < round / 2
        ? price - remainder
        : price - remainder + round;
    },
    updateLocalStorage() {
      const storageCart = JSON.parse(localStorage.getItem("cart"));
      const activeOrderIndex = storageCart.findIndex(
        (order) => order.number === useActiveOrder.value.number
      );

      storageCart[activeOrderIndex] = this.useActiveOrder;
      localStorage.setItem("cart", JSON.stringify(storageCart));
    },
    getItemSubTotal(item) {
      item.price * item.quantity;
    },

    getItemTotalPrice(item) {
      return item.product.price * item.quantity;
    },

    calculateActiveOrderDiscount(total) {
      if (this.useActiveOrder.discountType === 0) {
        return (this.useActiveOrder.discount * total) / 100;
      } else {
        return this.useActiveOrder.discount;
      }
    },

    async openDiscountModal() {
      modals.openOrderDiscountModal = true;
    },
  },
});
