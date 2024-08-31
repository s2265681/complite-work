#!/bin/bash

# parse zip field from json: 
# {
#   "id": "1",
#   "name": "John",
#   "age": "22",
#   "city": "New York",
#   "address": {
#     "street": "123 Main St",
#     "zip": "10001"
#   }
# }

# 从 data.json 中获取 zip 字段的值

# 1. 使用 jq
jq '.address.zip' data.json


# sh parse_json.sh