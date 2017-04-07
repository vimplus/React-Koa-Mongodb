# React-Koa-Mongodb技术栈

## 安装依赖

```
yarn install
```

## 配置Nginx

```
server {
    listen          80;
    server_name     cims.thinktxt.com;

    location / {
        proxy_pass  http://127.0.0.1:9002;
    }
}

server {
    listen          80;
    server_name     static.cims.thinktxt.com;

    location / {
        proxy_pass  http://127.0.0.1:9000;
    }

}
```

## 配置Host

```
127.0.0.1 cims.thinktxt.com
127.0.0.1 static.cims.thinktxt.com
```

## 本地开发构建

本地开发环境用`gulp server`命令。`gulp server`会启动一个基于内存的WEB服务器，端口为9000，同时监听（watch）本地文件的变化，然后自动编译。

```
gulp server
```

## 启动Node服务

```
node server/index.js
```

启动服务后在浏览器输入`http://cims.thinktxt.com`即可预览。


## 发布生产

正式环境的构建主要是增加了混淆、压缩的插件。

```
gulp release
```

发布后可在`dist`目录查看所有静态资源
