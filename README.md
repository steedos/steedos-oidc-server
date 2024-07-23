<!--
 * @Author: 孙浩林 sunhaolin@steedos.com
 * @Date: 2024-07-17 16:32:41
 * @LastEditors: 孙浩林 sunhaolin@steedos.com
 * @LastEditTime: 2024-07-23 14:46:59
 * @FilePath: /steedos-oidc-server/README.md
 * @Description: 
-->
# steedos-oidc-server

启动项目需要执行以下几步配置：

## 配置环境变量

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

## 配置configuration.json

自定义oidc配置如clients属性等，需在根目录下新建 `configuration.json` 文件，结构如下：

```json
{
    "clients": [
        {
            "client_id": "oidc_client",
            "client_secret": "a_different_secret",
            "grant_types": [
                "authorization_code"
            ],
            "response_types": [
                "code"
            ],
            "redirect_uris": [
                "http://localhost:3001/cb"
            ]
        }
    ],
}
```

参考文档 https://github.com/panva/node-oidc-provider/blob/main/docs/README.md

## 启动项目

```markdown
node express.js
```