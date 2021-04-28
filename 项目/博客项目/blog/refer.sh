# 执行脚本 sh refer.sh +提交修改的参数
cd /Users/shangjiawei/Desktop/my\ all/node/blog_h5
npm run build
git add .
git commit -m $1
git push
#origin development
# cd ~/desktop
# mkdir development
# cd development
# git clone -b development https://e.coding.net/casewhen/flamingo-web.git
cd ~/.ssh
ssh root@39.96.71.193 "cd /home/rock/www/website/blog;sudo git pull"
# ssh root@39.96.71.193
# s2265681@163.com
# "cd /home/rock/www/website/blog;sudo git pull"
# ssh -i flamingo-test-nx.pem ubuntu@ec2-52-82-39-98.cn-northwest-1.compute.amazonaws.com.cn "cd test/dev;sudo git pull"
# 退出
exit
