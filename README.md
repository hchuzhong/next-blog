# 初始代码

## 启动数据库

```
mkdir blog-data

// Docker desktop
docker run -v "/$PWD/blog-data":/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=blog -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres:12.2
```

## 清空之前的开发环境

```
docker kill <id>
docker rm <id>
rm -rf blog-data
```

## 创建数据库

```
docker exec -it <id> bash
psql -U blog
CREATE DATABASE blog_development ENCODING 'UTF8' LC_COLLATE 'en_US.utf8' LC_CTYPE 'en_US.utf8';
```

## 数据表

首先修改 ormconfig.json 中的 hots，然后运行

```
yarn m:run
node dist/seed.js
```

## 开发

```bash
yarn dev
# or
npm run dev
```

## 部署

```bash
git push
ssh blog@dev1 'bash -s' < bin/deploy.sh
```

nginx
```bash
docker run --name nginx1 --network=host -v /home/blog/nginx.conf:/etc/nginx/conf.d/default.conf -v /home/
blog/app/.next/static/:/usr/share/nginx/html/_next/static/ -d nginx:1.19.1
```

### session 所用 SECRET 需要自己本地新建一个 .env.local 文件然后在里面声明 SECRET=32位数字