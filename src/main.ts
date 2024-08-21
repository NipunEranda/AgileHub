import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.css";
import { store, key } from "./store";

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
  faHome,
  faBars,
  faChartLine,
  faUsers,
  faGear,
  faCircleUser,
  faPowerOff,
  faTrash,
  faNetworkWired,
  faDisplay,
  faMoon,
  faSun,
  faBell,
  faLock,
  faGlobe,
  faUser,
  faChevronRight,
  faFile,
  faHouseChimney,
  faPlus,
  faLanguage,
  faFolderOpen,
  faSave,
  faFileExport,
  faFileImport,
  faCircleInfo,
  faPen,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faHome,
  faBars,
  faChartLine,
  faUsers,
  faGear,
  faCircleUser,
  faPowerOff,
  faTrash,
  faNetworkWired,
  faDisplay,
  faMoon,
  faSun,
  faBell,
  faLock,
  faGlobe,
  faBars,
  faUser,
  faChevronRight,
  faFile,
  faHouseChimney,
  faPlus,
  faLanguage,
  faSave,
  faFileExport,
  faFileImport,
  faCircleInfo,
  faPen
);

createApp(App)
  .use(router)
  .use(store, key)
  .component("fai", FontAwesomeIcon)
  .component("alert", Alert)
  .component("Header", Header)
  .component("ActionModal", ActionModal)
  .component("Breadcrumb", BreadCrumb)
  .component("DropDown", DropDown)
  .mount("#app");
