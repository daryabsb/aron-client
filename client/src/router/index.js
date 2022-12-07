import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/user";

import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      authRequired: false,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
    meta: {
      authRequired: false,
    },
  },
  {
    path: "/store",
    name: "store",
    redirect: "/store/orders",
    component: () =>
      import(/* webpackChunkName: "about" */ "../layouts/StoreLayout.vue"),
    children: [
      {
        path: "/store/orders",
        name: "orders",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/OrderStore.vue"),
        meta: {
          authRequired: true,
        },
      },
    ],
    meta: {
      authRequired: true,
    },
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
    meta: {
      authRequired: false,
    },
  },
];

const router = createRouter({
  // eslint-disable-next-line
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to) => {
  // ✅ This will work because the router starts its navigation after
  // the router is installed and pinia will be installed too
  const store = useUserStore();
  // console.log("router", to.meta.authRequired && store.signedIn);
  console.log("router", to, store.signedIn);
  if (to.meta.authRequired && !store.signedIn) return "/login";
});
export default router;
