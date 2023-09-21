import flask
from flask import Flask, request, jsonify,session,redirect
from flask_session import Session
import bcrypt
import pymongo
from flask_cors import CORS
from functools import wraps

client =  pymongo.MongoClient('mongodb+srv://aadarshpokala02:hYHZasFKpOIMzI9P@foodjournal.2lg0191.mongodb.net/')
app=Flask("__main__")
app.config['SESSION_TYPE'] = 'mongodb'
app.config['SESSION_PERMANENT'] = False
app.config['SESSION_USE_SIGNER'] = True
app.config['SESSION_KEY_PREFIX'] = 'food_journal:'
sess=Session(app)
CORS(app)
gemail=[]

db = client.FoodJournal
my_table = db["Journal"]
login = db["Login"]
@app.route("/")
def my_index():
    return "hello"



@app.route("/signup", methods=["POST"])
def signup():
    global gemail
    data = request.get_json()
    email = data["email"]
    password = data["password"]
 
    # Check if a user with the same email already exists in MongoDB
    existing_user = login.find_one({"email": email})
    if existing_user:
        return jsonify({"error": "Email already exists"}), 409
    
    new_user = {
        'email': email,
        'password': password
    }
    inserted_user = login.insert_one(new_user)
 
    # Get the user's ID after insertion
    user_id = str(inserted_user.inserted_id)
    # Store the user's ID in the session
    gemail.append(data['email'])
    session["email"] = user_id
    print(session["email"],user_id,email)
    return jsonify({
        "id": user_id,
        "email": email
    }), 201
@app.route("/login", methods=["POST"])
def login_user():
    global gemail
    data = request.get_json()
    email = data["email"]
    password = data["password"]
    user = login.find_one({"email": email})
    if user is None:
        return jsonify({"error": "Unauthorized Access"}), 401

    if not user['password']==password:
        return jsonify({"error": "Unauthorized"}), 401
    gemail.append(data['email'])
    session["email"] = str(user['email'])

    
    return jsonify({
        "id": str(user["_id"]),
        "email": user["email"]
    })

@app.route('/submit', methods=['POST','GET'])
def submit_form():
    global gemail
    data = dict(request.get_json())
    data["email"] = gemail[-1]
    my_table.insert_one(data)
    response = {'message': 'Data received successfully'}
    return response
@app.route('/getData',methods=['POST','GET'])
def get_data():
    global gemail
    print(gemail)
    data = my_table.find({'email':gemail[-1]})
    details=[]
    for i in data:
        i.pop('_id')
        details.append(i)
    return jsonify(details)

if __name__ == "__main__":
    # Quick test configuration. Please use proper Flask configuration options
    # in production settings, and use a separate file or environment variables
    # to manage the secret key!
    app.secret_key = 'super secret key'
    app.config['SESSION_TYPE'] = 'filesystem'

    sess.init_app(app)

    app.debug = True
    app.run()