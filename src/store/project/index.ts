import axios from "axios";
import { State, store } from "../";
import { Commit, ActionContext } from "vuex";
import { _Project } from "@/models/Project";

export interface ProjectState {
  projects: _Project[];
}

const ProjectModule = {
  namespaced: true,
  state: (): ProjectState => ({
    projects: [],
  }),
  getters: {
    getProjects(state: ProjectState) {
      return state.projects;
    },
  },
  mutations: {
    resetState(state: ProjectState) {
      Object.assign(state, getDefaultState());
    },
    setProjects(state: ProjectState, data: _Project[]) {
      state.projects = data;
    },
  },
  actions: {
    resetState({ commit }: { commit: Commit }) {
      commit("resetState");
    },
    async loadProjects(
      context: ActionContext<ProjectState, State>
    ): Promise<void> {
      try {
        const projectsResponse = await axios.get(`/api/project`, {
          headers: {
            withCredentials: true,
          },
        });
        context.commit("setProjects", projectsResponse.data);
      } catch (e) {
        console.log(e);
        store.dispatch("handleRequestErrors", e);
      }
    },
    async addProject(
      context: ActionContext<ProjectState, State>,
      project: _Project
    ): Promise<void> {
      try {
        const projectsResponse = await axios.post(`/api/project`, project, {
          headers: {
            withCredentials: true,
          },
        });
        context.commit("setProjects", projectsResponse.data);
        return projectsResponse.data;
      } catch (e) {
        console.log(e);
        store.dispatch("handleRequestErrors", e);
      }
    },
    async updateProject(
      context: ActionContext<ProjectState, State>,
      project: _Project
    ): Promise<void> {
      try {
        const projectsResponse = await axios.put(`/api/project`, project, {
          headers: {
            withCredentials: true,
          },
        });
        context.commit("setProjects", projectsResponse.data);
        return projectsResponse.data;
      } catch (e) {
        console.log(e);
        store.dispatch("handleRequestErrors", e);
      }
    },
  },
};

const getDefaultState = () => {
  return {
    projects: [],
  };
};

export default ProjectModule;
