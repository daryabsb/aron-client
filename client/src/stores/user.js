import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import usersAPI from "@/services/usersAPI";

import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: useStorage("user", {}),
    machineID: useStorage("machineID", ""),
    token: useStorage("token", ""),
    signedIn: useStorage("signedIn", false),
    register: useStorage("register", []),
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
    useCashRegister(state) {
      return state.register.find(
        (counter) => counter.number == state.machineID
      );
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
    // CASH REGISTER
    async loadCashRegisterData() {
      try {
        const registerResponse = await usersAPI.getCashRegister(
          this.useAuthHeader
        );
        this.register = registerResponse.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getMachineID() {
      const util = require("util");
      const exec = util.promisify(require("child_process").exec);
      const promise = exec("wmic csproduct get uuid");
      const child = promise.child;
      const { stdout, stderr } = await promise;
      this.machineID = stdout.split("\n")[1].trim();
      return this.machineID;
    },
    pingServer(url = "") {
      const ping = require("web-pingjs");

      ping(url)
        .then(function (delta) {
          console.log("Ping time was " + String(delta) + " ms");
        })
        .catch(function (err) {
          console.error("Could not ping remote URL", err);
        });
    },
  },
});
