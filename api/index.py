#!/usr/bin/env python

import cgi
#import cgitb
import bottle
#from bottle import route, response, hook
from bottle import Bottle, route, request

from wsgiref.handlers import CGIHandler

#cgitb.enable()

#@hook('after_request')
#def enable_cors():
#    response.headers['Access-Control-Allow-Origin'] = '*'

app = Bottle()
app.catchall = False

@app.route('/')
def index():
    return 'This is index'

@app.route('/hello/:name')
def hello(name='World'):
    return 'Hello %s (%s)' % (name, request.path)

@app.route('/auth/')
def auth():
    return 'This is auth'

#print "Content-type: text/html\n\n"
#print "<html><body>Hello</body</hello>"
#cgi.print_environ()

if __name__ == '__main__':
    #app.catchall = False
    #CGIHandler().run(bottle.default_app())
    CGIHandler().run(app)
