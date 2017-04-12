# React-Koa-Mongodb技术栈

## 安装依赖

如果本机没有安装过yarn，请先执行`npm install -g yarn`;

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


## 拓展服务配置

### 本地数据库（MongoDB）

#### 安装

* 打开终端，执行`brew install mongodb`

* 在根目录 / 下创建 `data/db` 目录，用于放置`mongodb`数据，并且给该目录设置用户（txBoy）权限

```bash
sudo mkdir -p /data/db
sudo chown txBoy /data/db
```

#### 启动

```
mongod
```

或者指定`数据库路径`和`端口`启动:

```
mongod --dbpath=/data/db --port=27017
```

### MongoDB客户端

推荐MongoDB可视化操作客户端[Robomongo](https://robomongo.org/download)
