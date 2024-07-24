/*
 * @Author: 孙浩林 sunhaolin@steedos.com
 * @Date: 2024-07-24 10:32:13
 * @LastEditors: 孙浩林 sunhaolin@steedos.com
 * @LastEditTime: 2024-07-24 10:32:54
 * @FilePath: /steedos-oidc-server/utils/errors.js
 * @Description: 
 */
export class LoginError extends Error {
    constructor(message) {
        super(message);
        this.name = "LoginError";
    }
}

export class UserNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "UserNotFoundError";
    }
}