const General = () => import("@/Settings/views/General.vue");
const OrderAndPayment = () => import("@/Settings/views/OrderAndPayment");
const ProductsSettings = () => import("@/Settings/views/ProductsSettings");
const WeighingScale = () => import("@/Settings/views/WeighingScale");
const CustomerDisplay = () => import("@/Settings/views/CustomerDisplay");
const EmailSettings = () => import("@/Settings/views/EmailSettings");
const PrintOptions = () => import("@/Settings/views/PrintOptions");
const DatabaseSettings = () => import("@/Settings/views/DatabaseSettings");
const LicenseSettings = () => import("@/Settings/views/LicenseSettings");
const AboutSettings = () => import("@/Settings/views/AboutSettings");

const routes = [
  {
    path: "/settings",
    name: "settings",
    redirect: "/settings/general",
    component: () =>
      import(
        /* webpackChunkName: "settings" */
        "@/Settings/layouts/SettingsLayout.vue"
      ),
    children: [
      {
        path: "/settings/general",
        name: "General",
        component: General,
      },
      {
        path: "/settings/orders",
        name: "Order & Payments",
        component: OrderAndPayment,
      },
      {
        path: "/settings/products",
        name: "Products",
        component: ProductsSettings,
      },
      {
        path: "/settings/weighing-scale",
        name: "Weighing",
        component: WeighingScale,
      },
      {
        path: "/settings/customers",
        name: "Customer display",
        component: CustomerDisplay,
      },
      {
        path: "/settings/emails",
        name: "Email settings",
        component: EmailSettings,
      },
      {
        path: "/settings/prints",
        name: "Print options",
        component: PrintOptions,
      },
      {
        path: "/settings/database",
        name: "Database",
        component: DatabaseSettings,
      },
      {
        path: "/settings/license",
        name: "License",
        component: LicenseSettings,
      },
      {
        path: "/settings/about",
        name: "About",
        component: AboutSettings,
      },
    ],
  },
];
export default routes;
