

# 爬取一下掘金博客上最新的十条信息
curl -s -H "Accept: application/vnd.github.v3+json" https://api.github.com/repos/alibaba/hooks/contributors | jq '.[] | {login: .login, contributions: .contributions}'
