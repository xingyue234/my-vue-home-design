import { request } from "@/service/request";
import { baseUrl } from "@/config/env";
import token from "./token";


const isDev = process.env.NODE_ENV == "development";

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
	
	/**
	 * OSS 文件上传
	 */
	ossUpload(file, options) {
		const { onUploadProgress } = options || {};
	
		return new Promise((resolve, reject) => {
			this.request({
				url: "comm/ossSign"
			})
				.then((res) => {
					let data = new FormData();
	
					for (let i in res) {
						if (i != "host") {
							data.append(i, res[i]);
						}
					}
	
					const stru = (file.name || "").split(".");
					const fileName = file.uid + "." + stru[stru.length - 1];
	
					data.append("key", `app/${fileName}`);
					data.append("file", file);
	
					this.request({
						url: isDev ? "/oss-upload" : res.host,
						method: "POST",
						headers: {
							"Content-Type": "multipart/form-data"
						},
						data,
						onUploadProgress
					})
						.then(() => {
							resolve(`${res.host}/app/${fileName}`);
						})
						.catch((err) => {
							reject(err);
						});
				})
				.catch((err) => {
					reject(err);
				});
		});
	},

	// 素材列表
	spaceList (params) {
		return this.request({
			url: "app/space/info/page",
			params: {
				...params
			}
		});
	},
	
	
	list (params) {
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
	info (params) {
		return this.request({
			url: "app/operation/info/info",
			params
		});
	},
	
	searchGoods (params) {
		return this.request({
			url: "app/operation/info/searchGoods",
			params
		});
	},
	
	searchGoodsByGroup (params) {
		return this.request({
			url: "group/goods/page",
			params
		});
	},
	
	searchGroup (params) {
		return this.request({
			url: "group/info/page",
			params
		});
	},
	
	searchCategory (params) {
		return this.request({
			url: "goods/category/list",
			params
		});
	}
}