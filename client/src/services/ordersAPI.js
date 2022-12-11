import API from "./API";
import { useUserStore } from "@/stores/user";

export default {
  getOrders() {
    return API().get("/orders/all/", useUserStore().useAuthHeader);
  },
  getSingleOrderItem(oid) {
    return API().get(`/orders/items/${oid}/`, useUserStore().useAuthHeader);
  },
  getNumber(target) {
    return API().get(
      `/orders/number/?target=${target}`,
      useUserStore().useAuthHeader
    );
  },
  submitOrder(data) {
    const headers = useUserStore().useAuthHeader;
    return API().post("/orders/all/", data, headers);
  },

  submitOrderItem(data) {
    const headers = useUserStore().useAuthHeader;
    return API().post("/orders/items/", data, headers);
  },

  // PAYMENT CALLS
  getPaymentTypes() {
    return API().get("/orders/payment-types/", useUserStore().useAuthHeader);
  },
  // getProductsByGroupId(groupId) {
  //   return API().get(`/product/all/?group=${groupId}`);
  // },
  // filterGroups(id) {
  //   return API().get(`/product/groups/?group=${id}`);
  // },
};
