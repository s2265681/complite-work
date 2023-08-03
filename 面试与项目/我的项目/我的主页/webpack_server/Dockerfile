 
# Dockerfile
FROM keymetrics/pm2:latest-alpine
WORKDIR /usr/src/app
ADD . /usr/src/app
RUN /bin/sh -c yarn i
EXPOSE 3000

#pm2在docker中使⽤用命令为pm2-docker
CMD ["pm2-runtime", "start", "process.yml"]


# ps -ef|grep 3000
# 使用
#  docker build -t mypm2 .
# 运⾏行行 docker run -p 3000:3000 -d mypm2

 

#  koa-generic-session

#  docker run --name my-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=shang5036 -d mysql:latest

# docker run --name test -i -t ubuntu /bin/bash

# docker build -t webpage .
# docker run --name webpage -d -p 60001:3000 webpage