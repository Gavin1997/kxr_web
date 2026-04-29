/*
 * @Author: test
 * @Date: 2025-10-12 20:12:46
 * @LastEditTime: 2026-04-29 14:55:26
 * @FilePath: /kxrcp-download/src/router/modules/home.ts
 * @Description:
 */
const { VITE_HIDE_HOME } = import.meta.env;
const Layout = () => import("@/layout/index.vue");

export default {
  path: "/home",
  name: "Home",
  component: Layout,
  redirect: "/office",
  meta: {
    icon: "ep/home-filled",
    title: "首页",
    rank: 0
  },
  children: [
    {
      path: "/office",
      name: "office",
      component: () => import("@/views/office/index.vue"),
      meta: {
        title: "首页",
        showLink: VITE_HIDE_HOME === "true" ? false : true
      }
    }
  ]
} satisfies RouteConfigsTable;
