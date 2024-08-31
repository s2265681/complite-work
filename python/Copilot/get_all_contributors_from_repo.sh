# get all contributors from a repo

# 获取 ahooks repo 的所有贡献者和贡献者的贡献数

curl -s -H "Accept: application/vnd.github.v3+json" https://api.github.com/repos/alibaba/hooks/contributors | jq '.[] | {login: .login, contributions: .contributions}'


# 获取 ahooks repo 的最近10个issue并写入json中 json的格式为[{name: 'issue1', url: 'url1'}, {name: 'issue2', url: 'url2']
curl -s -H "Accept: application/vnd.github.v3+json" https://api.github.com/repos/alibaba/hooks/issues | jq '.[] | {name: .title, url: .url}' | head -n 10


