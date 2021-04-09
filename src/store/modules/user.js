import { Storage } from "@/cool";

export default {
	state: {
		token: localStorage.getItem("token") || "",
		info: null
	},

	actions: {

		userLogout({ commit }) {
			commit("CLEAR_TOKEN");
		},

	},

	mutations: {
		SET_TOKEN(state, { token, refreshToken}) {
			state.token = token;

			localStorage.setItem("token", token);
			localStorage.setItem("refreshToken", refreshToken);
		},

		CLEAR_TOKEN(state) {
			state.token = null;
			localStorage.removeItem("token");
			localStorage.removeItem("refreshToken");
		},

	}
};
