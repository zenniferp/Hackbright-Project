from flask import Flask, jsonify, render_template, request, session
import requests
import json
import os

app = Flask(__name__)
app.secret_key = 'secret'
access_token =  #this prob needs to go inthe search bar jsx

#TODO look up how Efren did API_KEY for helix

@app.route('/')
def home():
    """show main page"""
    return render_template('main.html')

#make a route on my server (/api/yelpsearch), in that route, hit the yelp api using the request library
#store that data in a variable, return the variable. 
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

    # what do I return? study react
    return render_template('main.html')

# @app.route('api/search/details')
#     """When a user clicks, open up information... ?"""

# Declare API routes for AJAX requests here; what does this mean?
# If you want to return data from yelp api from frontend and use it in the backend, you could add a route here and save the returned data as a variable
# For example, if the user wants to save data from searching, store data in a state. Then create a post req, using data from state. It will hit a route in my server. Inside the view function, you can define a fn to add it to ur database.

if __name__ == '__main__':

    app.run('0.0.0.0', debug=True)
