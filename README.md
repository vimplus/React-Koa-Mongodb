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

## 开发构建

```
gulp server
```

启动服务后在浏览器输入`http://localhost:9000`即可预览。


## 发布生产

```
gulp release
```
