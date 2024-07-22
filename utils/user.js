/*
 * @Author: 孙浩林 sunhaolin@steedos.com
 * @Date: 2024-07-21 17:34:18
 * @LastEditors: 孙浩林 sunhaolin@steedos.com
 * @LastEditTime: 2024-07-22 15:13:40
 * @FilePath: /steedos-oidc-server/utils/user.js
 * @Description: 
 */
import axios from 'axios';

import jwt from 'jsonwebtoken'

import consts from './consts.js'

import { hashPassword } from './encryption.js'

export const absoluteUrl = (url) => `${process.env.STEEDOS_ROOT_URL}${url}`

/**
 * 
 * @param {String} login 
 * @param {String} password 
 * @returns user
 * {
      _id: '6556c7eccf734f2c24c6e1c0',
      name: 's',
      locale: 'zh-cn',
      verifyCode: '',
      created: '2023-11-17T01:54:52.095Z',
      modified: '2024-05-06T08:14:09.370Z',
      email: 's@s.com',
      email_verified: null,
      emails: [Array],
      steedos_id: '6556c7eccf734f2c24c6e1c0',
      utcOffset: 8,
      last_logon: '2024-07-21T09:31:51.715Z',
      modified_by: '6556c7eccf734f2c24c6e1c0',
      login_failed_number: 1,
      lockout: false,
      avatar: '668373e5c5b31ea79b7f1cbe',
      id: '6556c7eccf734f2c24c6e1c0'
    }
 */
export const login = async (login, password) => {

    const body = {
        "device_id": "",
        "user": {
            "email": login,
            "mobile": "",
            "username": "",
            "spaceId": ""
        },
        "password": hashPassword(password),
        "token": "",
        "locale": "zh-cn"
    }

    const url = absoluteUrl(consts.LOGIN_URL)

    const result = await axios.post(url, body)

    console.log(result.data)

    return result.data.user
}

/**
 * 获取user信息
 * @param {String} userId 
 * @returns user
 */
export const getBydId = async (userId) => {
    const secret = process.env.STEEDOS_OIDC_SERVER_JWT_SECRET // 密钥
    const options = { expiresIn: 30 } // 30秒有效
    const token = jwt.sign({
        userId
    }, secret, options);

    const url = absoluteUrl(consts.GETUSERBYID_URL)

    const body = { token }

    const result = await axios.post(url, body)

    console.log(result.data)

    return result.data.data
}
