/*
 * @Author: test
 * @Date: 2025-10-12 20:12:46
 * @LastEditTime: 2026-04-29 14:54:41
 * @FilePath: /kxrcp-download/src/router/modules/remaining.ts
 * @Description:
 */
const Layout = () => import("@/layout/index.vue");

export default [
  {
    path: "/",
    name: "office",
    component: () => import("@/views/office/index.vue"),
    meta: {
      title: "官网",
      showLink: false,
      rank: 101
    }
  },

  {
    path: "/redirect",
    component: Layout,
    meta: {
      title: "加载中...",
      showLink: false,
      rank: 102
    },
    children: [
      {
        path: "/redirect/:path(.*)",
        name: "Redirect",
        component: () => import("@/layout/redirect.vue")
      }
    ]
  }
] satisfies Array<RouteConfigsTable>;
