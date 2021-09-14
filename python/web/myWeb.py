# https://webpy.org/
# -*- coding: utf-8 -*-
# filename: main.py
# pip install web.py ||  python -m pip install web.py

import web
from handle import Handle

urls = (
    '/wx', 'Handle',
)

# class Handle(object):
#     def GET(self):
#         return "hello, this is handle view"

if __name__ == '__main__':
    app = web.application(urls, globals())
    app.run()