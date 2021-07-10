from flask import Flask, jsonify, render_template, request, session, flash, redirect
import requests
import json
import crud
from model import connect_to_db, User
from jinja2 import StrictUndefined
from keys import ACCESS_TOKEN, YELP_API_KEY, MAPS_API_KEY

app = Flask(__name__)

app.secret_key = "dev"
app.jinja_env.undefined = StrictUndefined

@app.route('/')
def home():
    """show main page"""
    return render_template('main.html')

@app.route('/api/search', methods=['POST'])
def search_rooftop():
    """Get address and radius from user input and return results of rooftop bars in Yelp"""
    street = request.json.get("street")
    city = request.json.get("city")
    state = request.json.get("state")
    radius = request.json.get("radius")

    # Convert user's input to meters
    radius = int(radius)*1607

    # Define the API Key, endpoing, and header
    endpoint = 'https://api.yelp.com/v3/businesses/search'
    headers = {'Authorization': 'Bearer %s' % YELP_API_KEY}

    # Define the parameters
    parameters = {  'term': 'rooftop bar',
                    'limit': 10,
                    'location': f"{street}, {city}, {state}",
                    'radius': radius}
   
    # Make a request to the Yelp API
    response = requests.get(url=endpoint, params=parameters, headers=headers)

    # Translate the returned JSON string to a dict
    rooftop_data = response.json()

    return jsonify(rooftop_data)

@app.route('/api/favorite', methods=['POST'])
def save_favorite():

    yelp_id=request.json.get("result_id")
    user_id = User.query.first().user_id
    print("result_id", yelp_id)
    crud.create_favorite(user_id, yelp_id)
    return jsonify({"success": True})

@app.route('/api/unfavorite', methods=['POST'])
def unsave_favorite():

    yelp_id=request.json.get("result_id")
    user_id = User.query.first().user_id
    print("result_id", yelp_id)
    crud.remove_favorite(user_id, yelp_id)
    return jsonify({"success": True})

if __name__ == '__main__':

    connect_to_db(app)
    app.run('0.0.0.0', debug=True)


