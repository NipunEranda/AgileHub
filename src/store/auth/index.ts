import { State, store } from "../index";
import { _User } from "@/models/Auth";
import { Commit, ActionContext } from "vuex";
import Cookies from "js-cookie";
import * as util from "@/utils";
import axios from "axios";

export interface AuthState {
  currentUser: _User | null;
  users: _User[];
}

const AuthModule = {
  namespaced: true,
  state: (): AuthState => ({
    currentUser: null,
    users: [],
  }),
  getters: {
    getCurrentUser(state: AuthState) {
      return state.currentUser;
    },
    getUsers(state: AuthState) {
      return state.users;
    },
  },
  mutations: {
    resetState(state: AuthState) {
      Object.assign(state, getDefaultState());
      Object.keys(Cookies.get()).map((key) => {
        Cookies.remove(key);
      });
    },
    setUsers(state: AuthState, data: _User[]) {
      state.users = data;
    },
    setCurrentUser(state: AuthState, data: _User) {
      state.currentUser = data;
    },
  },
  actions: {
    resetState({ commit }: { commit: Commit }) {
      commit("resetState");
    },
    updateCurrentUser(context: ActionContext<AuthState, State>, data: _User) {
      context.commit("updateCurrentUser", data);
    },
    async loadUsers(context: ActionContext<AuthState, State>): Promise<void> {
      try {
        const response = await axios.get(`/api/auth/users`, {
          headers: {
            withCredentials: true,
          },
        });
        context.commit("setUsers", response.data);
      } catch (e) {
        console.log(e);
        store.dispatch("handleRequestErrors", e);
      }
    },
    async login(
      context: ActionContext<AuthState, State>,
      code: string
    ): Promise<void> {
      try {
        util.showLoadingScreen();
        const loginResponse = await axios.get(`/api/auth/login/${code}`);
        if (loginResponse.status == 200) {
          context.commit("setCurrentUser", loginResponse.data);
          store.commit("setLoggedIn", true);
          location.reload();
        } else {
          context.commit("setCurrentUser", null);
          store.commit("setLoggedIn", false);
          location.reload();
        }
      } catch (e) {
        console.log(e);
        store.dispatch("handleRequestErrors", e);
      }
    },
  },
};

const getDefaultState = () => {
  return {
    currentUser: null,
    users: [],
  };
};

export default AuthModule;
