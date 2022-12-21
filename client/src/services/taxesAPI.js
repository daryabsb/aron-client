import API from "./API";
import { useUserStore } from "@/stores/user";

export default {
  getAll() {
    return API().get("/taxes/all/", useUserStore().useAuthHeader);
  },
  getVAT() {
    return API().get("/taxes/all/?key=vat", useUserStore().useAuthHeader);
  },
};
