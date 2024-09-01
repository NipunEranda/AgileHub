import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import { store, key } from "./store";
import "./assets/main.css";

import Alert from "./components/Alert.vue";
import Header from "./components/Header.vue";
import ActionModal from "./components/modals/ActionModal.vue";
import BreadCrumb from "./components/BreadCrumb.vue";
import DropDown from "./components/DropDown.vue";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import {
  faGear,
  faPowerOff,
  faTrash,
  faMoon,
  faSun,
  faBell,
  faUser,
  faChevronRight,
  faFile,
  faPlus,
  faPen,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faGear,
  faPowerOff,
  faTrash,
  faMoon,
  faSun,
  faBell,
  faUser,
  faChevronRight,
  faFile,
  faPlus,
  faPen
);

const app = createApp(App);

app
  .use(router)
  .use(store, key)
  .component("fai", FontAwesomeIcon)
  .component("alert", Alert)
  .component("Header", Header)
  .component("ActionModal", ActionModal)
  .component("Breadcrumb", BreadCrumb)
  .component("DropDown", DropDown)
  .mount("#app");
