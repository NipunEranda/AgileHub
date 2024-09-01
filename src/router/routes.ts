import { RouteRecordRaw } from "vue-router";
import Index from "../views/Index.vue";
import Dashboard from "@/views/Dashboard.vue";
import Projects from "@/views/Projects.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "index",
    component: Index,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
  },
  {
    path: "/projects",
    name: "projects",
    component: Projects,
  },
];

export default routes;
