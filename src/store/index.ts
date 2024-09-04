// store.ts
import { InjectionKey } from "vue";
import { createStore, Store, ActionContext } from "vuex";

import AuthModule, { AuthState } from "./auth";
import ProjectModule, { ProjectState } from "./project";

import createPersistedState from "vuex-persistedstate";

// define your typings for the store state
export interface State {
  auth: AuthState;
  project: ProjectState;
  loggedIn: boolean;
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: { loggedIn: false } as State,
  modules: {
    auth: AuthModule,
    project: ProjectModule,
  },
  mutations: {
    setLoggedIn(state: State, data: boolean) {
      state.loggedIn = data;
    },
  },
  actions: {
    handleRequestErrors(context: ActionContext<State, State>, data) {
      if (data.response.status == 401) {
        this.dispatch("logout");
      }
    },
    logout() {
      this.commit("auth/resetState");
      this.commit("setLoggedIn", false);
      fetch("/api/auth/logout", { credentials: "include" });
      location.href = "/";
    },
  },
  plugins: [createPersistedState()],
});
