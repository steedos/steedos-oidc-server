/*
 * @Author: 孙浩林 sunhaolin@steedos.com
 * @Date: 2024-07-21 17:34:18
 * @LastEditors: baozhoutao@steedos.com
 * @LastEditTime: 2024-07-31 11:48:46
 * @FilePath: /steedos-oidc-server/utils/user.js
 * @Description: 
 */
import axios from 'axios';

import jwt from 'jsonwebtoken'

import consts from './consts.js'

import { hashPassword } from './encryption.js'

import { LoginError, UserNotFoundError } from './errors.js'

const absoluteUrl = (url) => `${process.env.STEEDOS_ROOT_URL}${url}`

const addExtraFields = (user) => {
    if (user.avatar) {
        user.picture = absoluteUrl(consts.AVATAR_URL + user.avatar)
    }
    user.given_name = user.name
    return user
}

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

function isValidEmail(login) {
    // 邮箱格式的正则表达式
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(login);
}

function isValidPhoneNumber(login) {
    // 手机号格式的正则表达式（以中国手机号为例）
    const phonePattern = /^1[3-9]\d{9}$/;
    return phonePattern.test(login);
}

export const login = async (login, password) => {
    try {
        const loginUser = {
            "email": "",
            "mobile": "",
            "username": "",
            "spaceId": ""
        }

        if(isValidEmail(login)){
            loginUser.email = login
        }else if(isValidPhoneNumber(login)){
            loginUser.mobile = login
        }else{
            loginUser.username = login
        }

        const body = {
            "device_id": "",
            "user": loginUser,
            "password": hashPassword(password),
            "token": "",
            "locale": "zh-cn"
        }

        const url = absoluteUrl(consts.LOGIN_URL)
        const result = await axios.post(url, body)

        const user = addExtraFields(result.data.user)
        return user
    } catch (error) {
        throw new LoginError(error.message)
    }
}

/**
 * 获取user信息
 * @param {String} userId 
 * @returns user
 */
export const getById = async (userId) => {
    try {
        const secret = process.env.STEEDOS_OIDC_SERVER_JWT_SECRET // 密钥
        const options = { expiresIn: 30 } // 30秒有效
        const token = jwt.sign({
            userId
        }, secret, options);

        const url = absoluteUrl(consts.GETUSERBYID_URL)

        const body = { token }

        const result = await axios.post(url, body)

        const user = addExtraFields(result.data.data)
        return user
    } catch (error) {
        throw new UserNotFoundError(error.message)
    }
}

/**
 * 
 * @param {String} name 
 * @param {String} login
 * @param {String} password 
 * @returns 
 * {
        "_id": "669f083f7e328015243621ba",
        "name": "s4",
        "locale": "zh-cn",
        "verifyCode": "",
        "spaceId": "",
        "services": {
            "password": {
                "bcrypt": "$2a$10$a/UYgb6ZUsxv4Oc.v2/jbOvzoGCWGyAjk2XrCOV37huGWUR2JWIBG"
            }
        },
        "created": "2024-07-23T01:32:47.921Z",
        "modified": "2024-07-23T01:32:47.921Z",
        "email": "s4@s.com",
        "email_verified": null,
        "emails": [
            {
                "address": "s4@s.com",
                "verified": null
            }
        ],
        "steedos_id": "669f083f7e328015243621ba",
        "id": "669f083f7e328015243621ba"
    }
 */
export const register = async (name, login, password) => {
    const url = absoluteUrl(consts.REGISTER_URL)

    const body = {
        "password": hashPassword(password),
        "name": name,
        "locale": "zh-cn",
        "verifyCode": "",
        "spaceId": "", // 没有spaceId
        "email": login
    }

    const result = await axios.post(url, body)
    return result.data.user
}

/**
 * 
 * @param {*} email 
 * @returns null
 */
export const forgetPassword = async (email) => {
    const url = absoluteUrl(consts.RESET_PASSWORD_BY_EMAIL_URL)

    const body = {
        "email": email
    }

    const result = await axios.post(url, body)
    return result.data
}
