from flask import Flask, jsonify, render_template, request, session
import requests
import json
from keys import ACCESS_TOKEN, API_KEY

app = Flask(__name__)

@app.route('/')
def home():
    """show main page"""
    return render_template('main.html')

# Declare API routes for AJAX requests here
# make a route on my server (/api/yelpsearch), in that route, hit the yelp api using the request library
# store that data in a variable, return the variable. 
# see example API lab

@app.route('/api/search', methods=['POST'])
def search_rooftop():
    """Get address and radius from user input and return results of rooftop bars in Yelp"""
    street = request.form.get("street")
    city = request.form.get("city")
    state = request.form.get("state")
    radius = request.form.get("radius")

    # Define the API Key, endpoing, and header
    endpoint = 'https://api.yelp.com/v3/businesses/search'
    headers = {'Authorization': 'Bearer %s' % API_KEY}

    # Define the parameters
    parameters = {  'term': 'rooftop',
                    'limit': 50,
                    'location': f"{street}, {city}, {state}",
                    'radius': radius}
    # Make a request to the Yelp API
    response = requests.get(url=endpoint, params=parameters, headers=headers)

    # Translate the returned JSON string to a dict
    rooftop_data = response.json()

    return rooftop_data

# @app.route('api/search/details')
#     """When a user clicks, open up information... ?"""

# TODO: improve form, add miles, use lat and longitude to pull in google map api

if __name__ == '__main__':

    app.run('0.0.0.0', debug=True)
