import Store from "@/store";

import { request } from "@/service/request";
import { baseUrl } from "@/config/env";

export default {
	isExpire() {
		const nowTime = Date.parse(new Date());

		let expired = {
			token: false,
			refreshToken: false
		};

		for (let i in expired) {
			const value = localStorage.getItem(`${i}${Storage.suffix}`) || undefined
			expired[i] = value - nowTime <= 0;
		}

		return expired;
	},

	refresh (force) {
		const expire = this.isExpire();
		const refreshToken = localStorage.getItem("refreshToken");
		

		return new Promise((resolve, reject) => {
			if (force || (expire.token && refreshToken)) {
				request({
						url: baseUrl + "/app/comm/refreshToken",
						method: "POST",
						data: {
							refreshToken
						}
					})
					.then(res => {
						Store.commit("SET_TOKEN", res);

						// let page = last(getCurrentPages());
						// let {
						// 	refresh
						// } = page.$vm;

						// if (refresh) {
						// 	refresh();
						// }

						resolve();
					})
					.catch(() => {
						Store.dispatch("userLogout");
						resolve();
					});
			} else {
				reject();
			}
		});
	}
}
