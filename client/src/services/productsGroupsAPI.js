import API from "./API";
import { useUserStore } from "@/stores/user";

export default {
  getProductGroups() {
    return API().get("/product/groups/", useUserStore().useAuthHeader);
  },
  getProductsByGroupId(groupId) {
    return API().get(
      `/product/all/?group=${groupId}`,
      useUserStore().useAuthHeader
    );
  },
  filterGroups(id) {
    return API().get(
      `/product/groups/?group=${id}`,
      useUserStore().useAuthHeader
    );
  },
};
