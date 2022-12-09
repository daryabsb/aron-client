import { createRouter, createWebHistory } from "vue-router";
import orderRoutes from "@/Orders/orderRoutes";
import { useUserStore } from "@/stores/user";

const Status = () => import("@/pages/admin/Status.vue");
const Credits = () => import("@/pages/admin/Credits.vue");
const Archives = () => import("@/pages/admin/Archives.vue");
const Settings = () => import("@/pages/admin/Settings.vue");
const Documentation = () => import("@/pages/admin/Documentation.vue");

const allRoutes = [];

const mainRoutes = [
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/pages/Login.vue"),
    meta: {
      authRequired: false,
    },
  },
  {
    path: "/shop",
    name: "shop",
    redirect: "/shop/orders",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/layouts/StoreLayout.vue"),
    children: [
      {
        path: "/shop/orders",
        name: "shop-orders",
        component: () =>
          import(/* webpackChunkName: "about" */ "@/pages/StoreHome.vue"),
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
    name: "Archives",
    path: "/admin/archives",
    component: Archives,
  },
  {
    name: "Credits",
    path: "/admin/credits",
    component: Credits,
  },
  {
    name: "Documentation",
    path: "/admin/documentation",
    component: Documentation,
  },
  {
    name: "Settings",
    path: "/admin/settings",
    component: Settings,
  },
  {
    name: "Status",
    path: "/admin/status",
    component: Status,
  },
];

const routes = allRoutes.concat(
  mainRoutes,
  // posRoutes,
  orderRoutes
  // managementRoutes
);

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
  // console.log("router", to, store.signedIn);
  if (to.meta.authRequired && !store.signedIn) return "/login";
});
export default router;
