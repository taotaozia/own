import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Cookies from "js-cookie";
import Home from "@/views/home/Home.vue";
import UserData from "@/views/user/UserData.vue";
import Company from "@/views/company/Company.vue";
import AGVCategory from "@/views/product/product_agv/Category.vue";
import AGVList from "@/views/product/product_agv/List.vue";
import AGVDetail from "@/views/product/product_agv/Details.vue";
import AGVDownload from "@/views/product/product_agv/Download.vue";
import StorageCategory from "@/views/product/product_storage/Category.vue";
import StorageList from "@/views/product/product_storage/List.vue";
import StorageDetail from "@/views/product/product_storage/Details.vue";
import StorageDownload from  "@/views/product/product_storage/Download.vue"
import ShutCategory from "@/views/product/product_shutdown/Category.vue";

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
          // *********** agv *************
          { path: "agvcategory", name: "agvcategory", meta: { title: "AGV产品类别" }, component: AGVCategory },
          { path: "agvlist", name: "agvlist", meta: { title: "AGV列表" }, component: AGVList },
          { path: "agvdetails", name: "agvdetails", meta: { title: "AGV详情页" }, component: AGVDetail },
          { path: "agvdownloads", name: "agvdownloads", meta: { title: "AGV下载内容" }, component: AGVDownload },
          // *********** storage *************
          { path: "storagecategory", name: "storagecategory", meta: { title: "仓储产品类别" }, component: StorageCategory },
          { path: "storagelist", name: "storagelist", meta: { title: "仓储列表" }, component: StorageList },
          { path: "storagedetails", name: "storagedetails", meta: { title: "仓储详情页" }, component: StorageDetail },
          { path: "storagedownloads", name: "storagedownloads", meta: { title: "仓储下载内容" }, component: StorageDownload },
          // *********** shutdown *************
          { path: "shutcategory", name: "shutcategory", meta: { title: "关节产品类别" }, component: ShutCategory }
        ]
        // end product
      },
      // ========= project ============
      {
        path: "/project", name: "project", component: () => import("@/views/project/Index.vue"),
        children: [
          // ======== summary =========
          { path: "agvsummary", name: "agvsummary", meta: { title: "AGV项目资源" }, component: AGVSummary }
        ]
      },

      // ========= Edit ============
      { path: "/edit", name: "edit", component: () => import("@/views/edit/Index.vue"), children: [] }
      // end layout children
    ]
  },
  { path: "/:pathMatch(.*)*", component: () => import("@/views/Utils/NotFound.vue") }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});
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