<template>
  <div class="relative pt-4">
    <!-- Search Project and Add project button -->
    <div class="flex w-100">
      <input
        id="fileSearch"
        type="text"
        placeholder="&#128269; Search"
        v-model="searchText"
        class="fileSearch p-2 border text-zinc-900 dark:text-zinc-300 border-zinc-300 bg-zinc-50 text-xs dark:bg-zinc-800 dark:brightness-125 dark:border-zinc-600 dark:placeholder-zinc-400 focus:outline-none focus:border-zinc-500 dark:focus:border-zinc-500 mb-3 w-5/6"
      />
      <button
        class="w-1/6 bg-zinc-50 border-zinc-300 hover:brightness-95 text-zinc-600 dark:bg-zinc-800 dark:brightness-125 dark:hover:border-zinc-500 dark:border-zinc-600 dark:text-white border ms-1 h-[2.125rem] text-sm"
        @click="openNewProjectModal"
      >
        <fai icon="fa-plus" />
        <span class="hidden sm:inline ml-2">New Project</span>
      </button>
    </div>

    <div>
      <div class="relative overflow-x-auto">
        <table
          class="w-full text-sm text-left rtl:text-right text-zinc-950 dark:text-zinc-300"
        >
          <thead
            class="text-xs text-zinc-700 uppercase bg-zinc-100 dark:bg-zinc-700 dark:text-zinc-400"
          >
            <tr>
              <th scope="col" class="px-6 py-3">Project</th>
              <th scope="col" class="px-6 py-3">Key</th>
              <th scope="col" class="px-6 py-3">Project Type</th>
              <th scope="col" class="px-6 py-3">Project Lead</th>
              <th scope="col" class="px-6 py-3">Project Category</th>
              <th scope="col" class="px-6 py-3">URL</th>
              <th style="width: 1%"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="bg-white border-b dark:bg-zinc-800 dark:border-zinc-700 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-600 dark:text-zinc-200"
              v-for="(project, p) in filteredProjects"
              :key="p"
            >
              <th
                scope="row"
                class="px-6 py-2 font-bold text-zinc-900 whitespace-nowrap dark:text-zinc-200 dark:hover:text-accent"
              >
                {{ project.name }}
              </th>
              <td class="px-6 py-2">{{ project.key }}</td>
              <td class="px-6 py-2">
                {{ projectTypes.filter((t) => t.id == project.type)[0].name }}
              </td>
              <td class="px-6 py-2">
                {{ users.filter((u) => u.id == project.lead)[0].name }}
              </td>
              <td class="px-6 py-2">
                {{
                  projectCategories.filter((t) => t.id == project.category)[0]
                    .name
                }}
              </td>
              <td class="px-6 py-2">{{ project.url }}</td>
              <td class="py-2 float-end w-max">
                <fai
                  icon="pen"
                  class="me-3 dark:hover:text-white"
                  @click="openEditProjectModal(project)"
                /><fai
                  icon="trash"
                  class="me-3 dark:hover:text-white"
                  @click="openActionModal('delete', project, p)"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Main Modal -->
    <div id="mainModal" tabindex="-1" class="relative hidden">
      <div
        class="fixed inset-0 bg-zinc-50 dark:bg-zinc-700 bg-opacity-30 dark:bg-opacity-60"
      ></div>
      <div class="fixed inset-0 w-screen overflow-y-auto">
        <div
          class="flex h-screen sm:min-h-screenWH items-end justify-center p-4 text-center sm:items-start sm:mt-20 sm:p-0"
        >
          <div
            id="mainModal"
            class="relative overflow-hidden rounded-lg text-left w-full sm:w-11/12 md:w-11/12 lg:w-10/12 xl:w-8/12 shadow-md shadow-zinc-500 dark:shadow-zinc-950"
          >
            <!-- Header -->
            <div
              class="flex items-center justify-between p-4 bg-zinc-300 bg-opacity-50 dark:bg-zinc-800 border-b-2 border-zinc-200 dark:border-zinc-700"
            >
              <h3
                class="text-xl font-semibold text-zinc-900 dark:text-white"
                v-text="mainModal.title"
              ></h3>
              <button
                @click="hideModal('mainModal')"
                type="button"
                class="text-zinc-900 dark:text-zinc-50 bg-transparent rounded-lg text-lg w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:text-white hover:bg-zinc-300 dark:hover:bg-zinc-600 dark:bg-zinc-700"
              >
                &times;
              </button>
            </div>
            <!-- Header -->

            <!-- Body -->
            <div
              class="bg-zinc-50 dark:bg-zinc-800 p-5 h-fit max-h-[600px] overflow-auto"
            >
              <div class="p-2">
                <div class="mb-6">
                  <label
                    for="name"
                    class="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
                    >Project Name</label
                  >
                  <input
                    id="name"
                    type="text"
                    v-model="project.name"
                    class="fileSearch p-2 border text-zinc-900 dark:text-zinc-300 border-zinc-300 bg-zinc-50 text-sm dark:bg-zinc-800 dark:brightness-125 dark:border-zinc-600 dark:placeholder-zinc-400 focus:outline-none focus:border-zinc-500 dark:focus:border-zinc-500 w-full rounded-lg"
                  />
                </div>

                <div class="mb-6">
                  <label
                    for="name"
                    class="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
                    >Project Key</label
                  >
                  <input
                    id="name"
                    type="text"
                    v-model="project.key"
                    class="fileSearch p-2 border text-zinc-900 dark:text-zinc-300 border-zinc-300 bg-zinc-50 text-sm dark:bg-zinc-800 dark:brightness-125 dark:border-zinc-600 dark:placeholder-zinc-400 focus:outline-none focus:border-zinc-500 dark:focus:border-zinc-500 w-full rounded-lg"
                  />
                </div>

                <div class="mb-6">
                  <label
                    for="name"
                    class="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
                    >Project Type</label
                  >
                  <select
                    id="category"
                    class="p-2 border cursor-pointer text-zinc-900 dark:text-zinc-300 border-zinc-300 bg-zinc-50 text-sm dark:bg-zinc-800 dark:brightness-125 dark:border-zinc-600 dark:placeholder-zinc-400 focus:outline-none focus:border-zinc-500 dark:focus:border-zinc-500 w-full rounded-lg"
                    v-model="project.type"
                  >
                    <option value="0">Select Type</option>
                    <option
                      v-for="projectType in projectTypes"
                      v-text="projectType.name"
                      :value="projectType.id"
                      :key="projectType.id"
                    ></option>
                  </select>
                </div>

                <div class="mb-6">
                  <label
                    for="name"
                    class="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
                    >Project Category</label
                  >
                  <select
                    id="category"
                    class="p-2 border cursor-pointer text-zinc-900 dark:text-zinc-300 border-zinc-300 bg-zinc-50 text-sm dark:bg-zinc-800 dark:brightness-125 dark:border-zinc-600 dark:placeholder-zinc-400 focus:outline-none focus:border-zinc-500 dark:focus:border-zinc-500 w-full rounded-lg"
                    v-model="project.category"
                  >
                    <option value="0">Select Category</option>
                    <option
                      v-for="projectCategory in projectCategories"
                      v-text="projectCategory.name"
                      :value="projectCategory.id"
                      :key="projectCategory.id"
                    ></option>
                  </select>
                </div>

                <div class="mb-6">
                  <label
                    for="name"
                    class="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
                    >Project Lead</label
                  >
                  <select
                    id="category"
                    class="p-2 border cursor-pointer text-zinc-900 dark:text-zinc-300 border-zinc-300 bg-zinc-50 text-sm dark:bg-zinc-800 dark:brightness-125 dark:border-zinc-600 dark:placeholder-zinc-400 focus:outline-none focus:border-zinc-500 dark:focus:border-zinc-500 w-full rounded-lg"
                    v-model="project.lead"
                  >
                    <option value="0">Select a Project Lead</option>
                    <option
                      v-for="user in users"
                      v-text="user.name"
                      :value="user.id"
                      :key="user.id"
                    ></option>
                  </select>
                </div>

                <div class="mb-6">
                  <label
                    for="name"
                    class="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
                    >Project URL</label
                  >
                  <input
                    id="name"
                    type="text"
                    v-model="project.url"
                    class="fileSearch p-2 border text-zinc-900 dark:text-zinc-300 border-zinc-300 bg-zinc-50 text-sm dark:bg-zinc-800 dark:brightness-125 dark:border-zinc-600 dark:placeholder-zinc-400 focus:outline-none focus:border-zinc-500 dark:focus:border-zinc-500 w-full rounded-lg"
                  />
                </div>
              </div>
            </div>
            <!-- Body -->

            <!-- Modal footer -->
            <div
              class="flex items-center p-2 border-t dark:bg-zinc-800 dark:brightness-125 border-zinc-200 rounded-b dark:border-zinc-600 justify-end"
            >
              <button
                @click="hideModal('mainModal')"
                type="button"
                class="py-2.5 px-5 me-2 text-sm font-medium text-zinc-900 focus:outline-none bg-white rounded-lg border border-zinc-200 hover:bg-zinc-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-zinc-100 dark:focus:ring-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-600 dark:hover:text-white dark:hover:bg-zinc-700"
              >
                Cancel
              </button>
              <button
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                @click="mainModalProcess"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Modal -->
    <div id="actionModal" tabindex="-1" class="relative hidden">
      <div
        class="fixed inset-0 bg-zinc-50 dark:bg-zinc-700 bg-opacity-30 dark:bg-opacity-60"
      ></div>
      <div class="fixed inset-0 w-screen overflow-y-auto">
        <div
          class="flex h-screen sm:min-h-screenWH items-end justify-center p-4 text-center sm:items-start sm:mt-20 sm:p-0"
        >
          <div
            id="actionModal"
            class="relative overflow-hidden rounded-lg text-left w-full sm:w-auto shadow-md shadow-zinc-500 dark:shadow-zinc-950"
          >
            <!-- Header -->
            <div
              class="flex items-center justify-between p-4 bg-zinc-300 bg-opacity-50 dark:bg-zinc-800 border-b-2 border-zinc-200 dark:border-zinc-700"
            >
              <h3
                class="text-xl font-semibold text-zinc-900 dark:text-white"
                v-text="actionModal.title"
              ></h3>
              <button
                @click="hideModal('actionModal')"
                type="button"
                class="text-zinc-900 dark:text-zinc-50 bg-transparent rounded-lg text-lg w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:text-white hover:bg-zinc-300 dark:hover:bg-zinc-600 dark:bg-zinc-700"
              >
                &times;
              </button>
            </div>
            <!-- Header -->

            <!-- Body -->
            <div
              class="bg-zinc-50 dark:bg-zinc-800 p-5 h-fit max-h-[600px] w-full sm:w-fit px-0 sm:px-20 text-center overflow-auto"
              v-html="actionModal.content"
            ></div>
            <!-- Body -->

            <!-- Modal footer -->
            <div
              class="flex items-center p-2 border-t dark:bg-zinc-800 dark:brightness-125 border-zinc-200 rounded-b dark:border-zinc-600 justify-end"
            >
              <button
                @click="hideModal('actionModal')"
                type="button"
                class="py-2.5 px-5 me-2 text-sm font-medium text-zinc-900 focus:outline-none bg-white rounded-lg border border-zinc-200 hover:bg-zinc-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-zinc-100 dark:focus:ring-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-600 dark:hover:text-white dark:hover:bg-zinc-700"
              >
                Cancel
              </button>
              <button
                type="button"
                class="text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                :class="{
                  'bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800':
                    actionModal.type == 'add',
                  'bg-red-600 hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-800 dark:focus:ring-red-800':
                    actionModal.type == 'remove',
                }"
                @click="actionModalProcess"
              >
                {{ actionModal.processName }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, ref, Ref } from "vue";
import { useStore } from "vuex";
import { key } from "../store";
import { showModal, hideModal } from "@/utils";
import projectTypes from "@/assets/json/projectTypes.json";
import projectCategories from "@/assets/json/projectCategories.json";
import { Project } from "@/models/Project";
import jQuery from "jquery";

const store = useStore(key);
let searchText = ref("");
let mainModal = ref({
  title: "",
  type: "add",
});
let actionModal = ref({
  title: "",
  type: "remove",
  content: "",
  processName: "",
});
let users = ref([]);
let projects = ref([]);
let filteredProjects = ref([]);

let project: Ref<Project[]> = ref(Project.createEmptyObject());

function openNewProjectModal() {
  mainModal.value = {
    title: "New Project",
    type: "edit",
  };
  project.value = Project.createEmptyObject();
  showModal("mainModal");
}

function openEditProjectModal(p) {
  mainModal.value = {
    title: "Edit Project",
    type: "edit",
  };
  project.value = p;
  showModal("mainModal");
}

function openActionModal(action, project, p) {
  actionModal.value = {
    title: "Remove Project",
    type: "remove",
    content: `Are you sure to remove <b>${project.name}</b> project?`,
    processName: "Remove",
  };
  showModal("actionModal");
}

async function mainModalProcess() {
  if (mainModal.value.type == "add") {
    projects.value = await store.dispatch("project/addProject", project.value);
    filteredProjects.value = projects.value;
  } else {
    projects.value = await store.dispatch(
      "project/updateProject",
      project.value
    );
    filteredProjects.value = projects.value;
  }
  hideModal("mainModal");
}

async function actionModalProcess() {
  if (actionModal.value.type == "remove") {
    console.log(project.value);
  }
}

async function loadData() {
  await Promise.all(
    [
      store.dispatch("auth/loadUsers"),
      store.dispatch("project/loadProjects"),
    ].map(async (process, p) => {
      await process;
    })
  );
}

watch(searchText, (newValue) => {
  if (newValue.trim() != "") {
    filteredProjects = ref(
      projects.value.filter((p) =>
        p.name.toLowerCase().includes(newValue.toLowerCase())
      )
    );
  } else filteredProjects = ref(jQuery.extend(true, [], projects.value));
});

onMounted(async () => {
  // Load Data
  await loadData();
  users.value = store.state.auth.users;
  projects.value = store.state.project.projects;
  filteredProjects.value = store.state.project.projects;
});
</script>
