const isDev = process.env.NODE_ENV == "development";
 
 
const host = (function () {
	switch (process.env.NODE_ENV) {
		case "development":
			return "";
		case "production":
			return "";
		default:
			return "";
	}
})();

// 请求地址
const baseUrl = host + "/admin/";


export { baseUrl,  isDev };
