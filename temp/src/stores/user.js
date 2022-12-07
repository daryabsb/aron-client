import { defineStore } from "pinia";
import axios from "axios";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    token: null,
  }),

  getters: {
    useUser(state) {
      // if (!state.token) {
      //   const token = localStorage.getItem("auth_token");
      //   state.token = token;
      // }
      return state.user;
    },
  },

  actions: {
    async fetchUser() {
      // localStorage.setItem("auth");
      const res = await axios.get("http://127.0.0.1:8000/api/user/me/", {
        headers: {
          Authorization: `Token ${this.token.token}`,
          // Authorization: `Token ${token.token}`,
          //   Authorization: token,
        },
      });

      const user = await res.data;
      this.user = user;
    },
    async signUp(email, password) {
      const res = await axios.post("http://127.0.0.1:8000/api/user/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { email, password },
      });
      const user = await res.json();
      this.user = user;
    },
    async signIn(data) {
      try {
        const res = await axios.post(
          "http://127.0.0.1:8000/api/user/token/",
          data
        );
        this.token = await res.data;
        localStorage.setItem("auth_token", res.data);
        const userResponse = await this.fetchUser();
        this.user = userResponse.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
