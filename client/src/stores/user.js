import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: useStorage("user", {}),
    token: useStorage("token", ""),
    signedIn: useStorage("signedIn", false),
  }),

  getters: {
    useUser(state) {
      return state.user;
    },
    isAuthenticated(state) {
      return state.signedIn;
    },
    useAuthHeader(state) {
      return {
        headers: {
          Authorization: `Token ${this.token}`,
        },
      };
    },
  },

  actions: {
    async fetchUser() {
      // localStorage.setItem("auth");
      const res = await axios.get(
        "http://127.0.0.1:8000/api/user/me/",
        this.useAuthHeader
      );

      const user = await res.data;
      this.user = user;
      this.signedIn = true;
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
    async signIn(email, password) {
      console.log("from login page", email, password);
      try {
        const res = await axios.post("http://127.0.0.1:8000/api/user/token/", {
          email,
          password,
        });
        this.token = await res.data.token;
        localStorage.setItem("auth_token", res.data.token);
        await this.fetchUser();
      } catch (error) {
        console.log(error);
      }
    },
    signOut() {
      this.user = {};
      this.token = "";
      this.signedIn = false;
    },
  },
});
