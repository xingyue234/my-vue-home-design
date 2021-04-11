import store from "@/store/index.js";
import { request } from "@/service/request";
import { baseUrl } from "@/config/env";

setTimeout(() => {
	// token固定
	store.commit("SET_TOKEN", {
		token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlSWRzIjpbIjEiXSwidXNlcklkIjoiMSIsInBhc3N3b3JkVmVyc2lvbiI6ODMsImlhdCI6MTYxODA0MDk5MSwiZXhwIjoxNjE4NjQ1NzkxfQ.gOtUO0wRb9BUg_FJkqqKY0fXy6esBuhIK2xy_SjUxZU'
	});
}, 1000)

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
		const refreshToken = localStorage.getItem("token");
		

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
						store.commit("SET_TOKEN", res);

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
