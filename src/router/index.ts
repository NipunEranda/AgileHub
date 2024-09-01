import { createRouter, createWebHistory } from "vue-router";
import { useStore } from "vuex";
import { key } from "../store";
import routes from "./routes";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to /*, from*/) => {
  const store = useStore(key);

  if (store.state.auth) {
    if (!store.state.auth.currentUser) {
      if (to.name == "index") return;
      else return "/";
    } else {
      if (to.name == "index") return "/dashboard";
      else return;
    }
  }
});

export default router;
