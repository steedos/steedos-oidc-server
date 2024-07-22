/*
 * @Author: 孙浩林 sunhaolin@steedos.com
 * @Date: 2024-07-22 13:22:10
 * @LastEditors: 孙浩林 sunhaolin@steedos.com
 * @LastEditTime: 2024-07-22 13:57:04
 * @FilePath: /steedos-oidc-server/steedos-platform/steedos-packages/oidc-server-plugin/src/rests/getUserById.js
 * @Description: 
 */
"use strict";
const jwt = require('jsonwebtoken')
module.exports = {
    rest: {
        method: 'POST',
        path: '/getUserById', // /service/api/oidc-server-plugin/getUserById
        authorization: false,
        authentication: false
    },
    params: {
        token: { type: 'string' } // jwt token
    },
    async handler(ctx) {
        const { token } = ctx.params;

        if (!token) {
            throw new Error('token is not set')
        }

        const secret = this.settings.jwt_secret

        if (!secret) {
            throw new Error('jwt_secret is not set')
        }

        // 解密
        const payload = jwt.verify(token, secret)

        // {
        //     userId: 'xxx',
        //     iat: 1669266046,
        //     exp: 1669269646
        // }

        const userId = payload.userId

        const user = await this.getObject('users').findOne(userId, {
            fields: [
                '_id',
                'name',
                'locale',
                'verifyCode',
                'created',
                'modified',
                'email',
                'email_verified',
                'emails',
                'steedos_id',
                'utcOffset',
                'last_logon',
                'modified_by',
                'login_failed_number',
                'lockout',
                'avatar',
            ]
        })

        return {
            'status': 0, // 返回 0，表示当前接口正确返回，否则按错误请求处理
            'msg': '',
            'data': user
        }
    }
}