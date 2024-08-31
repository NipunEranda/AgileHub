<template>
  <div
    class="w-full text-zinc-700 bg-white dark:bg-zinc-700 dark:text-white dark-mode:text-zinc-200 dark-mode:bg-zinc-800 absolute top-0 z-10"
  >
    <div
      x-data="{ open: false }"
      class="flex flex-col xl:items-center xl:justify-between xl:flex-row w-full"
    >
      <div class="p-3 px-4 xl:pe-1 flex flex-row items-center justify-between">
        <a
          href="#"
          class="flex items-center text-lg font-semibold tracking-widest text-zinc-900 dark:text-white uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline"
          @click="$router.push('/dashboard')"
          >AgileHub</a
        >
        <button
          class="xl:hidden rounded-lg focus:outline-none focus:shadow-outline"
          x-on:click="open = !open"
        >
          <svg fill="currentColor" viewBox="0 0 20 20" class="w-6 h-6">
            <path
              x-show="!open"
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
            <path
              x-show="open"
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <nav
        x-bind:class="{ flex: open, hidden: !open }"
        class="flex-col flex-grow pb-4 xl:pb-0 hidden xl:flex xl:flex-row"
      >
        <!-- <a
          class="px-4 py-2 mt-2 text-sm font-semibold text-zinc-900 bg-zinc-200 rounded-lg dark-mode:bg-zinc-700 dark-mode:hover:bg-zinc-600 dark-mode:focus:bg-zinc-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-zinc-200 xl:mt-0 hover:text-zinc-900 focus:text-zinc-900 hover:bg-zinc-200 focus:bg-zinc-200 focus:outline-none focus:shadow-outline"
          href="#"
          >Blog</a
        > -->
        <div
          x-on:click.away="open = false"
          class="relative px-3 xl:px-1"
          x-data="{ open: false }"
        >
          <button
            x-on:click="open = !open"
            class="flex flex-row items-center w-full px-4 py-2 mt-2 text-sm font-semibold text-left bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:focus:bg-zinc-600 dark-mode:hover:bg-zinc-600 xl:w-auto xl:inline xl:mt-0 xl:ml-1 hover:text-zinc-900 focus:text-zinc-900 hover:bg-zinc-200 focus:bg-zinc-200 focus:outline-none focus:shadow-outline"
          >
            <span>Dashboards</span>
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              x-bind:class="{ 'rotate-180': open, 'rotate-0': !open }"
              class="inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform xl:-mt-1"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          <div
            x-show="open"
            x-transition:enter="transition ease-out duration-100"
            x-transition:enter-start="transform opacity-0 scale-95"
            x-transition:enter-end="transform opacity-100 scale-100"
            x-transition:leave="transition ease-in duration-75"
            x-transition:leave-start="transform opacity-100 scale-100"
            x-transition:leave-end="transform opacity-0 scale-95"
            class="absolute right-0 w-full mt-2 origin-top-right rounded-md shadow-lg xl:w-48 z-10"
          >
            <div
              class="w-max px-2 py-2 bg-white dark:bg-zinc-800 xl:dark:bg-zinc-700 rounded-md shadow dark-mode:bg-zinc-800 mx-3"
            >
              <a
                class="w-full block px-4 py-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-zinc-600 dark-mode:focus:bg-zinc-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-zinc-200 xl:mt-0 hover:text-zinc-900 focus:text-zinc-900 hover:bg-zinc-200 focus:bg-zinc-200 focus:outline-none focus:shadow-outline"
                href="#"
                >System Dashboard</a
              >
              <a
                class="w-full block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-zinc-600 dark-mode:focus:bg-zinc-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-zinc-200 xl:mt-0 hover:text-zinc-900 focus:text-zinc-900 hover:bg-zinc-200 focus:bg-zinc-200 focus:outline-none focus:shadow-outline"
                href="#"
                >Manage Dashboards</a
              >
            </div>
          </div>
        </div>
        <div
          x-on:click.away="open = false"
          class="relative px-3 xl:px-1"
          x-data="{ open: false }"
        >
          <button
            x-on:click="open = !open"
            class="flex flex-row items-center w-full px-4 py-2 mt-2 text-sm font-semibold text-left bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:focus:bg-zinc-600 dark-mode:hover:bg-zinc-600 xl:w-auto xl:inline xl:mt-0 xl:ml-1 hover:text-zinc-900 focus:text-zinc-900 hover:bg-zinc-200 focus:bg-zinc-200 focus:outline-none focus:shadow-outline"
          >
            <span>Projects</span>
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              x-bind:class="{ 'rotate-180': open, 'rotate-0': !open }"
              class="inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform xl:-mt-1"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          <div
            x-show="open"
            x-transition:enter="transition ease-out duration-100"
            x-transition:enter-start="transform opacity-0 scale-95"
            x-transition:enter-end="transform opacity-100 scale-100"
            x-transition:leave="transition ease-in duration-75"
            x-transition:leave-start="transform opacity-100 scale-100"
            x-transition:leave-end="transform opacity-0 scale-95"
            class="absolute right-0 w-full mt-2 origin-top-right rounded-md shadow-lg xl:w-48 z-10"
          >
            <div
              class="w-max px-2 py-2 bg-white dark:bg-zinc-800 xl:dark:bg-zinc-700 rounded-md shadow dark-mode:bg-zinc-800 mx-3"
            >
              <a
                class="w-full block px-4 py-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-zinc-600 dark-mode:focus:bg-zinc-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-zinc-200 xl:mt-0 hover:text-zinc-900 focus:text-zinc-900 hover:bg-zinc-200 focus:bg-zinc-200 focus:outline-none focus:shadow-outline"
                href="#"
                @click="$router.push('/projects')"
                >View Projects</a
              >
            </div>
          </div>
        </div>
        <div
          x-on:click.away="open = false"
          class="relative px-3 xl:px-1"
          x-data="{ open: false }"
        >
          <button
            x-on:click="open = !open"
            class="flex flex-row items-center w-full px-4 py-2 mt-2 text-sm font-semibold text-left bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:focus:bg-zinc-600 dark-mode:hover:bg-zinc-600 xl:w-auto xl:inline xl:mt-0 xl:ml-1 hover:text-zinc-900 focus:text-zinc-900 hover:bg-zinc-200 focus:bg-zinc-200 focus:outline-none focus:shadow-outline"
          >
            <span>Issues</span>
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              x-bind:class="{ 'rotate-180': open, 'rotate-0': !open }"
              class="inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform xl:-mt-1"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          <div
            x-show="open"
            x-transition:enter="transition ease-out duration-100"
            x-transition:enter-start="transform opacity-0 scale-95"
            x-transition:enter-end="transform opacity-100 scale-100"
            x-transition:leave="transition ease-in duration-75"
            x-transition:leave-start="transform opacity-100 scale-100"
            x-transition:leave-end="transform opacity-0 scale-95"
            class="absolute right-0 w-full mt-2 origin-top-right rounded-md shadow-lg xl:w-48 z-10"
          >
            <div
              class="w-max px-2 py-2 bg-white dark:bg-zinc-800 xl:dark:bg-zinc-700 rounded-md shadow dark-mode:bg-zinc-800 mx-3"
            >
              <a
                class="w-full block px-4 py-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-zinc-600 dark-mode:focus:bg-zinc-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-zinc-200 xl:mt-0 hover:text-zinc-900 focus:text-zinc-900 hover:bg-zinc-200 focus:bg-zinc-200 focus:outline-none focus:shadow-outline"
                href="#"
                >Search Issues</a
              >
              <a
                class="w-full block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-zinc-600 dark-mode:focus:bg-zinc-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-zinc-200 xl:mt-0 hover:text-zinc-900 focus:text-zinc-900 hover:bg-zinc-200 focus:bg-zinc-200 focus:outline-none focus:shadow-outline"
                href="#"
                >Import Issues</a
              >
              <a
                class="w-full block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-zinc-600 dark-mode:focus:bg-zinc-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-zinc-200 xl:mt-0 hover:text-zinc-900 focus:text-zinc-900 hover:bg-zinc-200 focus:bg-zinc-200 focus:outline-none focus:shadow-outline"
                href="#"
                >Open Issues</a
              >
              <a
                class="w-full block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-zinc-600 dark-mode:focus:bg-zinc-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-zinc-200 xl:mt-0 hover:text-zinc-900 focus:text-zinc-900 hover:bg-zinc-200 focus:bg-zinc-200 focus:outline-none focus:shadow-outline"
                href="#"
                >Created by Me</a
              >
            </div>
          </div>
        </div>
        <div
          x-on:click.away="open = false"
          class="relative px-3 xl:px-1"
          x-data="{ open: false }"
        >
          <button
            x-on:click="open = !open"
            class="flex flex-row items-center w-full px-4 py-2 mt-2 text-sm font-semibold text-left bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:focus:bg-zinc-600 dark-mode:hover:bg-zinc-600 xl:w-auto xl:inline xl:mt-0 xl:ml-1 hover:text-zinc-900 focus:text-zinc-900 hover:bg-zinc-200 focus:bg-zinc-200 focus:outline-none focus:shadow-outline"
          >
            <span>Boards</span>
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              x-bind:class="{ 'rotate-180': open, 'rotate-0': !open }"
              class="inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform xl:-mt-1"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          <div
            x-show="open"
            x-transition:enter="transition ease-out duration-100"
            x-transition:enter-start="transform opacity-0 scale-95"
            x-transition:enter-end="transform opacity-100 scale-100"
            x-transition:leave="transition ease-in duration-75"
            x-transition:leave-start="transform opacity-100 scale-100"
            x-transition:leave-end="transform opacity-0 scale-95"
            class="absolute right-0 w-full mt-2 origin-top-right rounded-md shadow-lg xl:w-48 z-10"
          >
            <div
              class="w-max px-2 py-2 bg-white dark:bg-zinc-800 xl:dark:bg-zinc-700 rounded-md shadow dark-mode:bg-zinc-800 mx-3"
            >
              <a
                class="w-full block px-4 py-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-zinc-600 dark-mode:focus:bg-zinc-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-zinc-200 xl:mt-0 hover:text-zinc-900 focus:text-zinc-900 hover:bg-zinc-200 focus:bg-zinc-200 focus:outline-none focus:shadow-outline"
                href="#"
                >View Boards</a
              >
            </div>
          </div>
        </div>
        <a
          class="hidden xl:flex px-4 py-2 mt-2 xl:ml-1 text-sm font-semibold text-zinc-50 bg-accent rounded-lg dark-mode:bg-zinc-700 dark-mode:hover:bg-zinc-600 dark-mode:focus:bg-zinc-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-zinc-200 xl:mt-0 focus:text-zinc-900 hover:bg-theme-primary-hover focus:bg-zinc-200 focus:outline-none focus:shadow-outline"
          href="#"
          >Create</a
        >
      </nav>
      <nav
        x-bind:class="{ flex: open, hidden: !open }"
        class="flex-col flex-grow pb-4 xl:pb-0 hidden xl:flex xl:flex-row xl:justify-end xl:pe-4 px-3 xl:px-1 items-center"
      >
        <input
          id="fileSearch"
          type="text"
          placeholder="&#128269; Search"
          v-model="searchText"
          class="fileSearch p-2 h-fit border text-zinc-900 dark:text-zinc-300 border-zinc-300 bg-zinc-50 text-xs dark:bg-zinc-700 dark:brightness-125 dark:border-zinc-600 dark:placeholder-zinc-400 dark:focus:placeholder-zinc-400 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-400 w-full"
        />
        <a
          class="items-center w-full xl:w-auto flex xl:hidden px-4 py-2 mt-2 xl:ms-4 text-sm font-semibold text-zinc-50 bg-theme-primary dark-mode:bg-zinc-700 dark-mode:hover:bg-zinc-600 dark-mode:focus:bg-zinc-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-zinc-200 xl:mt-0 hover:bg-theme-primary-hover focus:outline-none focus:shadow-outline rounded-lg xl:rounded-full"
          href="#"
          ><fai icon="bell" class="me-2" /> Notifications</a
        >
        <a
          class="hidden xl:flex px-3 text-2xl font-semibold text-zinc-50 dark-mode:bg-zinc-700 dark-mode:hover:bg-zinc-600 dark-mode:focus:bg-zinc-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-zinc-200 xl:mt-0 focus:outline-none focus:shadow-outline rounded-lg xl:rounded-full items-center hover:text-accent"
          href="#"
          ><fai icon="bell"
        /></a>
        <div
          x-on:click.away="open = false"
          x-on:click="open = !open"
          class="relative mt-2 p-1 px-4 w-full xl:w-auto cursor-pointer xl:px-1 xl:py-0 xl:mt-0 flex hover:bg-theme-primary-hover bg-theme-primary xl:hover:bg-transparent xl:bg-transparent rounded-lg"
          x-data="{ open: false }"
          @click="jQuery(`#header-profile-menu`).toggleClass('hidden')"
        >
          <button
            x-on:click="open = !open"
            class="flex flex-row xl:w-9 py-1 text-sm font-semibold text-left bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:focus:bg-zinc-600 dark-mode:hover:bg-zinc-600 xl:inline xl:mt-0 focus:outline-none focus:shadow-outline"
          >
            <img
              x-on:click="open = !open"
              :src="user?.avatar_url"
              alt=""
              class="rounded-full w-8 hidden xl:flex"
            />
            <span x-on:click="open = !open" class="items-center flex xl:hidden"
              ><fai icon="user" class="me-2" />{{ user.name }}</span
            >
          </button>
          <div
            x-show="open"
            x-transition:enter="transition ease-out duration-100"
            x-transition:enter-start="transform opacity-0 scale-95"
            x-transition:enter-end="transform opacity-100 scale-100"
            x-transition:leave="transition ease-in duration-75"
            x-transition:leave-start="transform opacity-100 scale-100"
            x-transition:leave-end="transform opacity-0 scale-95"
            class="absolute right-0 w-full origin-top-right rounded-md shadow-lg xl:w-48 mt-10 z-10"
          >
            <div
              class="px-2 py-2 bg-white dark:bg-zinc-700 xl:dark:bg-zinc-700 rounded-md shadow dark-mode:bg-zinc-800 mx-0"
            >
              <a
                class="block px-4 py-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-zinc-600 dark-mode:focus:bg-zinc-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-zinc-200 xl:mt-0 hover:text-zinc-900 focus:text-zinc-900 hover:bg-zinc-200 focus:bg-zinc-200 focus:outline-none focus:shadow-outline"
                href="#"
                ><fai icon="user" class="me-2" />Profile</a
              >
              <a
                class="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-zinc-600 dark-mode:focus:bg-zinc-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-zinc-200 xl:mt-0 hover:text-zinc-900 focus:text-zinc-900 hover:bg-zinc-200 focus:bg-zinc-200 focus:outline-none focus:shadow-outline"
                href="#"
                ><fai icon="gear" class="me-2" />Settings</a
              >
              <a
                class="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-zinc-600 dark-mode:focus:bg-zinc-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-zinc-200 xl:mt-0 hover:text-zinc-900 focus:text-zinc-900 hover:bg-zinc-200 focus:bg-zinc-200 focus:outline-none focus:shadow-outline"
                href="#"
                @click="store.dispatch('logout')"
                ><fai icon="power-off" class="me-2" />Log Out</a
              >
            </div>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script setup>
// import { getIcon } from "@/utils";
import { useRoute } from "vue-router";
import { onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { key } from "../store";
import jQuery from "jquery";

const store = useStore(key);
const route = useRoute();

const user = ref(store.state.auth.currentUser);

// let userTheme = ref(localStorage.getItem("userTheme"));
let activeTab = ref(null);

let searchText = ref(null);

// let open = ref(false);

watch(route, async () => {
  activeTab.value = route.name;
});

// function toggleMobileView(override, event) {
//   if (override == "close")
//     jQuery("#mobile-menu-2").removeClass("hidden").addClass("hidden");
//   else if (override == "open") jQuery("#mobile-menu-2").removeClass("hidden");
//   else jQuery("#mobile-menu-2").toggleClass("hidden");
// }

// function toggleTheme() {
//   if (userTheme.value == "dark") {
//     userTheme.value = "light";
//     document.documentElement.classList.remove("dark");
//   } else {
//     userTheme.value = "dark";
//     document.documentElement.classList.add("dark");
//   }
//   localStorage.setItem("userTheme", userTheme.value);
// }

onMounted(() => {
  activeTab.value = route.name;
});
</script>
