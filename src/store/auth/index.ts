import { State, store } from "../index";
import { User, _User } from "@/models/Auth";
import { Commit, ActionContext } from "vuex";
import Cookies from "js-cookie";
import * as util from "@/utils";
import axios from "axios";

export interface AuthState {
  currentUser: _User;
  users: _User[];
}

const AuthModule = {
  namespaced: true,
  state: (): AuthState => ({
    currentUser: User.createEmptyObject(),
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
        const response = await axios.get(
          `${process.env.VUE_APP_API_URL}/user/list`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("local._token")}`,
              withCredentials: true,
            },
          }
        );
        context.commit("setUsers", response.data.data);
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
          store.commit("setLoggedIn", true);
          location.href = "/dashboard";
        } else {
          context.commit("setCurrentUser", null);
          store.commit("setLoggedIn", false);
          location.href = "/";
        }
        // const lr = new Login(loginResponse);
        // if (lr.token && lr.user) {
        //   Cookies.set("local._token", lr.token, {
        //     secure: true,
        //     sameSite: "strict",
        //     path: "/",
        //   });
        //   Cookies.set("userId", lr.user._id);
        //   context.commit("setCurrentUser", lr.user);
        //   store.commit("setLoggedIn", true);
        //   location.reload();
        // } else {
        //   Cookies.remove("token");
        //   context.commit("setCurrentUser", null);
        //   store.commit("setLoggedIn", false);
        // }
      } catch (e) {
        console.log(e);
        store.dispatch("handleRequestErrors", e);
      }
    },
  },
};

const getDefaultState = () => {
  return {
    currentUser: User.createEmptyObject(),
    users: [],
  };
};

export default AuthModule;
