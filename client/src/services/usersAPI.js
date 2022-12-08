import API from "./API";

export default {
  getLoggedInUser() {
    return API().get("/user/me/");
  },
  getCashRegister(headers) {
    return API().get("/orders/counters/", headers);
  },
  // getProductsByGroupId(groupId) {
  //   return API().get(`/product/all/?group=${groupId}`);
  // },
  // filterGroups(id) {
  //   return API().get(`/product/groups/?group=${id}`);
  // },
};
