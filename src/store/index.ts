// store.ts
import { InjectionKey } from "vue";
import { createStore, Store, ActionContext } from "vuex";

import AuthModule, { AuthState } from "./auth";

import createPersistedState from "vuex-persistedstate";

// define your typings for the store state
export interface State {
  auth: AuthState;
  loggedIn: boolean;
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: { loggedIn: false } as State,
  modules: {
    auth: AuthModule,
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
      this.state.loggedIn = false;
      location.href = "/";
    },
  },
  plugins: [createPersistedState()],
});
