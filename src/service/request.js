import { Token } from "@/cool";
import axios from 'axios'
function request(options) {
	// const { isLoading } = options || {};

	// if (isLoading) {
	// 	uni.showLoading({
	// 		title: "加载中",
	// 		mask: true
	// 	});
	// }

	// Token 校验
	let Authorization = localStorage.getItem("token") || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlSWRzIjpbIjEiXSwidXNlcklkIjoiMSIsInBhc3N3b3JkVmVyc2lvbiI6ODMsImlhdCI6MTYxODA0MDk5MSwiZXhwIjoxNjE4NjQ1NzkxfQ.gOtUO0wRb9BUg_FJkqqKY0fXy6esBuhIK2xy_SjUxZU";

	const ignore = {
		token: ["/app/comm/verifyCode", "/app/comm/refreshToken"]
	};

	ignore.token.forEach(e => {
		if (options.url.includes(e)) {
			Authorization = "";
		}
	});

	return new Promise((resolve, reject) => {
		axios({
			...options,
			headers: {
				Authorization,
				...options.header
			}
		}).then((res) => {
			const { code, data, message } = res.data;
						
			if (res.statusCode == 401) {
				if (!Authorization) {
					window.location.href = window.location.origin + '/login'
				} else {
					Token.refresh(true);
				}
			}
						
			switch (code) {
				case 1000:
					resolve(data);
					break;
				default:
					reject({ message, code });
			}
		}).catch((err) => {
			reject({ message: err.errMsg });
		})
	});
}

export { request };
