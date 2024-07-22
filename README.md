<!--
 * @Author: 孙浩林 sunhaolin@steedos.com
 * @Date: 2024-07-17 16:32:41
 * @LastEditors: 孙浩林 sunhaolin@steedos.com
 * @LastEditTime: 2024-07-22 15:19:28
 * @FilePath: /steedos-oidc-server/README.md
 * @Description: 
-->
# steedos-oidc-server

## 环境变量

```markdown
# 端口
PORT=3000
# 服务地址
ISSUER=http://localhost:3000
# 数据库配置
MONGODB_URI=mongodb://127.0.0.1:27017/oidc-provider
# 正式环境production、开发环境development
NODE_ENV=production
# 是否调试模式
DEBUG=false
# steedos 访问地址
STEEDOS_ROOT_URL=
# jwt加密，用于接口认证
STEEDOS_OIDC_SERVER_JWT_SECRET=
```