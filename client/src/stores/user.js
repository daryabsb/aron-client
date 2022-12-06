import { defineStore } from "pinia";
import axios from "axios";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    token: null,
  }),

  actions: {
    async fetchUser(token) {
      console.log("TOKEN", `token${token.token}`);
      const res = await axios.get("http://127.0.0.1:8000/api/user/me/", {
        headers: {
          Authorization: `Token ${token.token}`,
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
        await this.fetchUser(this.token);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
