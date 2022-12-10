// import { useCart } from "@/Orders/orderComposables";
const routes = [
  {
    path: "/store",
    name: "StoreHome",
    // redirect: "/store/order",
    // component: StoreFront,
    component: () =>
      import(
        /* webpackChunkName: "store" */
        "@/Orders/layouts/StoreLayout.vue"
      ),
    children: [],
    meta: {
      authRequired: true,
    },
  },
  {
    path: "/store/order",
    name: "StoreProducts",
    redirect: { name: "Store Board" },
    component: () =>
      import(
        /* webpackChunkName: "store" */
        "@/Orders/views/StoreOrder.vue"
      ),
    children: [
      {
        path: "/store/order/:number",
        name: "Store Board",
        component: () =>
          import(
            /* webpackChunkName: "store" */
            "@/Orders/views/OrderItemsList.vue"
          ),
        meta: {
          authRequired: true,
        },

        beforeEnter: (to, from, next) => {
          // console.log("to", to);
          // console.log(from);
          to.params.from = from.path;
          next();
        },
        // props: (route) => ({ number: parseInt(route.params.number) }),
        props: true,
      },
    ],
  },
];

export default routes;
