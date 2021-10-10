docker start 111 &&
cd /home/blog/app &&
git pull &&
yarn install --production=false &&
yarn build &&
docker kill app &&
docker build -t hcz/node-web-app . &&
docker run --name app --network=host -p 3000:3000 -d hcz/node-web-app
echo 'OK!'