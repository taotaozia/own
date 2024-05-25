import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Cookies from "js-cookie";
import Home from "@/views/home/Home.vue";
import UserData from "@/views/user/UserData.vue";
import Company from "@/views/company/Company.vue";
import AGVCategory from "@/views/product/productAGV/Category.vue";
import AGVList from "@/views/product/productAGV/List.vue";
import AGVDetail from "@/views/product/Details.vue";
import AGVDownload from "@/views/product/Download.vue";
import StorageCategory from "@/views/product/productStorage/Category.vue";
import StorageList from "@/views/product/productStorage/List.vue";
import JointCategory from "@/views/product/productJoint/Category.vue";
import JointList from "@/views/product/productJoint/List.vue";

import AGVSummary from "@/views/project/project_agv/summary.vue";
import { useStore } from "vuex";
import { ref } from "vue";


const routes: Array<RouteRecordRaw> = [
  { path: "/login", name: "login", component: () => import("@/views/login/Login.vue") },
  {
    path: "/", name: "layout",
    component: () => import("@/views/Layout.vue"),
    children: [
      // ======== home =========
      { path: "/home", name: "home", meta: { title: "系统首页" }, component: Home },
      // ======== userData ========
      { path: "/userData", name: "userData", meta: { title: "个人资料" }, component: UserData },
      // ======== company ========
      { path: "/company", name: "company", meta: { title: "公司资料" }, component: Company },

      // ======== product =========
      {
        path: "/product", name: "product", component: () => import("@/views/product/Index.vue"),
        children: [
          { path: "downloads", name: "downloads", meta: { title: "下载内容" }, component: AGVDownload },
          { path: "details", name: "details", meta: { title: "详情页" }, component: AGVDetail },
          // *********** agv *************
          { path: "agvcategory", name: "agvcategory", meta: { title: "AGV产品类别" }, component: AGVCategory },
          { path: "agvlist", name: "agvlist", meta: { title: "AGV列表" }, component: AGVList },
          // *********** storage *************
          { path: "storagecategory", name: "storagecategory", component: StorageCategory },
          { path: "storagelist", name: "storagelist", meta: { title: "仓储列表" }, component: StorageList },
          // *********** joint *************
          { path: "jointcategory", name: "jointcategory", meta: { title: "关节产品类别" }, component: JointCategory },
          { path: "jointlist", name: "jointlist", meta: { title: "关节列表" }, component: JointList },
        ]
      },
      // ========= project ============
      {
        path: "/project", name: "project", component: () => import("@/views/project/Index.vue"),
        children: [
          // ======== summary =========
          { path: "agvsummary", name: "agvsummary", meta: { title: "AGV项目资源" }, component: AGVSummary }
        ]
      },
      // ========= manage ============
      { path: "/manage", name: "manage", component: () => import("@/views/ProjectManage/Index.vue"), children: [] },
      // ========= Edit ============
      { path: "/edit", name: "edit", component: () => import("@/views/edit/Index.vue"), children: [] }
    ]
  },
  { path: "/:pathMatch(.*)*", component: () => import("@/views/Utils/NotFound.vue") }
];

const router = createRouter({ history: createWebHistory(), routes });
let load = ref(0);
// 路由守卫
router.beforeEach(async (to, from, next) => {
  if (to.path === "/login") next();
  if (to.path === "/test") next();
  const adminID = Cookies.get("adminID");
  if (adminID === undefined && to.path !== "/login") return next("/login");
  if (load.value === 0 && to.path !== "Login") {
    load.value++;
    //再次调用存储菜单数据(前提是在存储的地方有调用添加路由规则)、或者直接调用动态添加路由规则事件
    addRoutes();
    //添加后跳转到应访问的地址
    next({ path: to.fullPath });
    // next({ ...to, replace: true });
  }
  next();
});

export function addRoutes() {
  const store = useStore();
  store.state.router.routers.forEach((item: any) => {
    router.addRoute(item.routerParent, {
      path: item.routerPath,
      name: item.routerName,
      meta: { title: item.routerTitle },
      component: () => import("@/views/" + item.routerComponent)
    } as any);
  });
  console.log("添加路由完成");
}

export default router;