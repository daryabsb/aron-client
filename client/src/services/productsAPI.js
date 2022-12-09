import API from "./API";
import { useUserStore } from "@/stores/user";
export default {
  getProducts() {
    return API().get("/product/all/", useUserStore().useAuthHeader);
  },
  getProductsByGroupId(groupId) {
    return API().get(
      `/product/all/?group=${groupId}`,
      useUserStore().useAuthHeader
    );
  },
  getSingleProduct(pid) {
    return API().get(`/product/all/${pid}/`, useUserStore().useAuthHeader);
  },
};
