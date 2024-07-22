/*
 * @Author: 孙浩林 sunhaolin@steedos.com
 * @Date: 2024-07-21 09:56:33
 * @LastEditors: 孙浩林 sunhaolin@steedos.com
 * @LastEditTime: 2024-07-22 09:38:18
 * @FilePath: /steedos-oidc-server/utils/encryption.js
 * @Description: 
 */
import { default as bcrypt } from 'bcryptjs';
import { createHash } from 'crypto';

export const hashPassword = function (password, algorithm = "sha256") {
  if (typeof password === 'string') {
    const hash = createHash(algorithm);
    hash.update(password);
    return hash.digest('hex');
  }

  return password.digest;
};

export const verifyPassword = async function (password, hash) {
  return await bcrypt.compare(password, hash);
}

export const checkPassword = async function (password, hash, algorithm = "sha256") {
  const pass = hashPassword(password, algorithm);
  const isPasswordValid = await verifyPassword(pass, hash)
  return isPasswordValid;
}
