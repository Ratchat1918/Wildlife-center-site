from flask import Flask, request
import os
from dotenv import load_dotenv
from pymongo import MongoClient
from pymongo.server_api import ServerApi
from bson import ObjectId
from bson.json_util import dumps
from flask_cors import CORS
from flask_bcrypt import Bcrypt

app = Flask(__name__)
bcrypt=Bcrypt(app)

load_dotenv()
mongo_uri = os.getenv('MONGO_URI')

client =MongoClient(mongo_uri, server_api=ServerApi('1'))
try:
    client.admin.command('ping')
    print("connected to mongoDb succesfully")
except:
    print(f"failed to connect to mongoDb, error")

db = client['Users']
collection = db['client']

class duplicateError(Exception):
    def __init__(self, message, error_code):
        super().__init__(message)
        self.message = message  # Add this line
        self.error_code = error_code
    def __str__(self):
        return f"{self.message} (Error Code: {self.error_code})"
    
class userIsNullError(Exception):
    def __init__(self, message, error_code):
        super().__init__(message)
        self.message = message  # Add this line
        self.error_code = error_code
    def __str__(self):
        return f"{self.message} (Error Code: {self.error_code})"

@app.route('/', methods = ['GET'])
def main():
    try:
        data = collection.find({})
        return dumps(data)
    except:
        return f"failed to fetch users"

@app.route('/add_user', methods = ['POST'])
def add_user():
    data = request.json
    try:
        duplicate = collection.find_one({"email":data["email"]})
        if(duplicate!=None):
            raise duplicateError("duplicate email",400)
        hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        user_id = collection.count_documents({})+1
        collection.insert_one({
            '_id':user_id,
            "email": data["email"],
            "password":hashed_password,
            "reservations":[]
            })
    except:
        return f"failed to post data"
    return "data sent succesfully"

@app.route('/get_user/<int:user_id>',methods = ['GET'])
def get_user(user_id):
    try:
        data = collection.find_one({"_id":user_id})
        return f'{data}'
    except Exception as e:
        return f"failed to find user, error: {e}"

@app.route('/delete_user/<int:user_id>',methods = ['DELETE'])
def delete_user(user_id):
    try:
        data = collection.find_one_and_delete({"_id":user_id})
        return f'{data} deleted succesfully'
    except Exception as e:
        return f"failed to delete user, error: {e}"

reservations_db = client["Resarvations"]
dates_collection = reservations_db["Dates"]

@app.route('/get_resarvations', methods = ['GET'])
def get_resarvations():
    try:
        data = dates_collection.find({})
        return dumps(data)
    except Exception as e:
        return f"failed to fetch dates, error: {e}"

@app.route('/add_resarvation/<int:user_id>', methods = ['POST', 'PUT'])
def add_resarvation(user_id):
    resarvation_data = request.json
    try:
        user = collection.find_one({"_id":user_id})
        if(user==None):
            raise userIsNullError("user is Null", 400)
        duplicate = dates_collection.find_one({"date":resarvation_data["date"]})
        if(duplicate!=None):
            raise duplicateError("duplicate date",400)
        resarvation_id = dates_collection.count_documents({})+1
        dates_collection.insert_one({
            '_id':resarvation_id,
            "date":resarvation_data["date"]
        })
        collection.update_one({"_id":user_id}, {"$push": {"reservations": resarvation_id}})
        return f"users resarvations updated succesfully"
    except Exception as e:
        return f'failed to create resarvation, error: {e}'

if __name__ == '__main__':
    app.run()