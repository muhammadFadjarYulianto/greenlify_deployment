from flask import jsonify, make_response

def success(values, message, code=200):
    res = {
        'status_code': code,
        'data': values,
        'message': message
    }
    return make_response(jsonify(res)), code

def badRequest(values, message, code=400):
    res = {
        'status_code': code,
        'data': values,
        'message': message
    }
    return make_response(jsonify(res)), code
