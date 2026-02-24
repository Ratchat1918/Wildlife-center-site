from flask import Flask, make_response, request
import os
from dotenv import load_dotenv
from pymongo import MongoClient
from pymongo.server_api import ServerApi
from bson.json_util import dumps
from bson import ObjectId
from flask_cors import CORS
from flask_bcrypt import Bcrypt
import jwt
from datetime import datetime, timezone, timedelta
import re

app = Flask(__name__)
bcrypt=Bcrypt(app)

load_dotenv()
mongo_uri = os.getenv('MONGO_URI')

client = MongoClient(mongo_uri, server_api=ServerApi('1'),)
try:
    client.admin.command('ping')
    print("connected to mongoDb succesfully")
except Exception as e:
    print(f"failed to connect to mongoDb, error: {e}")

db = client['WildLifeCenter']
client_collection = db['client']
dates_collection = db["Dates"] 

class customError(Exception):
    def __init__(self, message, error_code):
        super().__init__(message)
        self.message = message
        self.error_code = error_code
    def __str__(self):
        return f"{self.message} (Error Code: {self.error_code})"
    
def validate_email(email):
    pattern = (r"^(?!\.)(?!.*\.\.)[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+"r"@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$")
    return re.match(pattern, email)
def validate_password(password):
    number_list = ["1","2","3","4","5","6","7","8","9","0"]
    symbols_list = ["@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "+", "=", "!", "?", "<", ">", "/", "\\", "|", "~", "`"]
    contains_number = any(number in password for number in number_list)
    contains_symbols = any(symbol in password for symbol in symbols_list)
    if(contains_symbols==False):
        print("doesnt contain symbols")
        return False
    if(contains_number==False):
        print("doesnt contain numbers")
        return False
    if(len(password)<10):
        print("password is too short")
        return False
    if(len(password)>20):
        print("password is too long")
        return False
    return True

@app.route('/', methods = ['GET'])
def main():
    try:
        data = client_collection.find({})
        response = make_response(dumps(data), 200)
        return response
    except Exception as e:
        return f"failed to fetch users, error: {e}"

@app.route('/add_user', methods = ['POST'])
def add_user():
    data = request.json
    try:
        duplicate = client_collection.find_one({"email":data["email"]})
        if(duplicate!=None):
            raise customError("duplicate email",400)
        if(not validate_email(data["email"])):
            raise customError("invalid email",400)
        if(validate_password(data["password"])==False):
            raise customError("invalid password",400)
        hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        client_collection.insert_one({
            "email": data["email"],
            "password":hashed_password,
            "reservations":[]
            })
        response = make_response("data sent succesfully",200)
        return response
    except Exception as e:
        return f"failed to fetch users, error: {e}"

@app.route('/get_user/<user_id>',methods = ['GET'])
def get_user(user_id):
    try:
        data = client_collection.find_one({"_id":ObjectId(user_id)})
        response = make_response(f"User: {data}", 200)
        return response
    except Exception as e:
        return f"failed to find user, error: {e}"

@app.route('/delete_user/<user_id>',methods = ['DELETE'])
def delete_user(user_id):
    try:
        user_resarvations = client_collection.find_one({"_id":ObjectId(user_id)})["reservations"]
        if(len(user_resarvations)>0):
            for resarvation_id in user_resarvations:
                print("Deleted: ",resarvation_id)
                dates_collection.find_one_and_delete({"_id":ObjectId(resarvation_id)})
        user_todelete = client_collection.find_one_and_delete({"_id":ObjectId(user_id)})
        response = make_response(f"{user_todelete} deleted succesfully", 200)
        return response
    except Exception as e:
        return f"failed to delete user, error: {e}"
    
@app.route('/login', methods = ['GET'])
def login():
    data =request.json
    request_email = data["email"]
    request_password = data["password"]
    try:
        user = client_collection.find_one({"email":request_email})
        password_correct = bcrypt.check_password_hash(user["password"], request_password)
        secret = os.getenv('SECRET')
        if(password_correct):
            token = jwt.encode({'id':str(user["_id"]), "email": user["email"], 'exp': datetime.now()+timedelta(hours=1)}, secret)
            response = make_response({"token": token, "user_id": str(user["_id"])})
            response.set_cookie('token', token, httponly=True, secure=True, samesite='Strict')
            return response
        else:
            raise customError("Password is incorrect", 401)
    except Exception as e:
        return f"failed to login user error: {e}"
    


@app.route('/get_resarvations', methods = ['GET'])
def get_resarvations():
    try:
        data = dates_collection.find({})
        response = make_response(f"Resarvations: {dumps(data)}", 200)
        return response
    except Exception as e:
        return f"failed to fetch dates, error: {e}"

@app.route('/add_resarvation/<user_id>', methods = ['POST', 'PUT'])
def add_resarvation(user_id):
    resarvation_data = request.json
    try:
        user = client_collection.find_one({"_id":ObjectId(user_id)})
        if(user==None):
            raise customError("user is Null", 400)
        date_resarvation = ObjectId()
        dates_collection.insert_one({
            "_id":date_resarvation,
            "date":resarvation_data["date"]
        })
        client_collection.update_one({"_id":ObjectId(user_id)}, {"$push": {"reservations": date_resarvation}})
        response = make_response(f"users resarvations updated succesfully", 200)
        return response
    except Exception as e:
        return f'failed to create resarvation, error: {e}'
    
@app.route('/delete_resarvations/<user_id>/<resarvation_id>', methods = ['GET', 'DELETE'])
def delete_resarvations(user_id, resarvation_id):
    try:
        user = client_collection.find_one({"_id":ObjectId(user_id)})
        user_resarvations = user["reservations"]
        if(ObjectId(resarvation_id) not in user_resarvations):
            raise customError("Resarvation not in user",404)
        dates_collection.find_one_and_delete({"_id":ObjectId(resarvation_id)})
        client_collection.update_one({"_id":ObjectId(user_id)}, {"$pull":{"reservations": ObjectId(resarvation_id)}})
        response = make_response(f"users resarvations updated succesfully", 200)
        return response
    except Exception as e:
        return f"failed to delete resarvation, error: {e}"

if __name__ == '__main__':
    app.run()
    