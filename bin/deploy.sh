docker start 361 &&
cd /home/blog/app &&
git pull &&
yarn install --production=false &&
yarn build &&
git apply migrate.patch;
yarn compile &&
yarn m:run &&
git reset --hard HEAD &&
docker kill app &&
docker rm app &&
docker build -t hcz/node-web-app . &&
docker run --name app --network=host -p 3000:3000 -d hcz/node-web-app
echo 'OK!'