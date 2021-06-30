from flask import Flask, jsonify, render_template, request, session
import requests
import json
from keys import ACCESS_TOKEN, YELP_API_KEY, MAPS_API_KEY

app = Flask(__name__)

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

if __name__ == '__main__':

    app.run('0.0.0.0', debug=True)


