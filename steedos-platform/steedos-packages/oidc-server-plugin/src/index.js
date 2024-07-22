/*
 * @Author: 孙浩林 sunhaolin@steedos.com
 * @Date: 2024-06-18 09:38:39
 * @LastEditors: 孙浩林 sunhaolin@steedos.com
 * @LastEditTime: 2024-07-22 13:46:21
 * @FilePath: /steedos-oidc-server/steedos-platform/steedos-packages/oidc-server-plugin/src/index.js
 * @Description: 
 */
"use strict";
const path = require('path');
const project = require('../package.json');
const packageName = project.name;
const packageLoader = require('@steedos/service-package-loader');
const chalk = require('chalk');

if ('development' === process.env.NODE_ENV) {
	delete require.cache[require.resolve("./rests")];
	delete require.cache[require.resolve("./methods")];
}
const rests = require('./rests')
const methods = require('./methods')
/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 * 软件包服务启动后也需要抛出事件。
 */
module.exports = {
	name: packageName,
	namespace: "steedos",
	mixins: [packageLoader],
	/**
	 * Settings
	 */
	settings: {
		rest: "/oidc-server-plugin",
		jwt_secret: process.env.STEEDOS_OIDC_SERVER_JWT_SECRET
	},
	metadata: {
		$package: {
			name: project.name,
			path: path.join(__dirname, ".."),
			isPackage: true
		}
	},

	/**
	 * Dependencies
	 */
	dependencies: [],

	/**
	 * Actions
	 */
	actions: {
		...rests,
	},

	/**
	 * Events
	 */
	events: {

	},

	/**
	 * Methods
	 */
	methods: methods,

	/**
	 * Service created lifecycle event handler
	 */
	async created() {

	},

	/**
	 * Service started lifecycle event handler
	 */
	async started() {
		if (!this.settings.jwt_secret) {
			console.log(chalk.red(`【@steedos/oidc-server-plugin】请配置STEEDOS_OIDC_SERVER_JWT_SECRET环境变量`));
		}
	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {

	}
};
