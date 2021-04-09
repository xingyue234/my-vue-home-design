import { request } from "@/service/request";
import { baseUrl } from "@/config/env";
import token from "./token";

export default {
	request(options = {}) {
		// 处理url前缀
		if (!options.url.includes("http")) {
			let prefix = "";

			if (process.env.NODE_ENV == "development") {
				prefix = this.proxy || baseUrl;
				
			} else {
				if (this.proxy) {
					prefix = this.url;
				} else {
					prefix = baseUrl;
				}
			}

			if (this.namespace) {
				prefix += "/" + this.namespace;
			}

			options.url = prefix + options.url;
		}

		// 处理 GET/POST 数据
		options.method = options.method || "GET";
		if (options.method === "GET" || options.method === "get") {
			options.data = options.params;
		}

		// 刷新token
		return token.refresh().catch(() => {
			return request(options);
		});
	},
	

	list (params) {
		console.log(this, 'this')
		return this.request({
			url: "app/operation/info/page",
			params: {
				...params
			}
		});
	},

	save (data) {
		return this.request({
			url: "app/operation/info/save",
			method: "POST",
			data
		});
	},

	delete (data) {
		return this.request({
			url: "app/operation/info/delete",
			method: "POST",
			data
		});
	},
	
	// APP 首页配置 详情
	info(params) {
		return this.request({
			url: "app/operation/info/info",
			params
		});
	},
	
	searchGoods(params) {
		return this.request({
			url: "app/operation/info/searchGoods",
			params
		});
	}
}