from flask import Flask, request, jsonify
from flask_cors import CORS

import util

app = Flask(__name__)

@app.route("/bhp")
def hello():
    return "hello fenbiwgo"

@app.route("/get_locations")
def get_locations():
    response = jsonify({
        "locations" : util.load_locations()
    })
    return response

@app.route("/get_price", methods = ['POST'])
def get_predicted_price():
    total_sqft = float(request.form["total_sqft"])
    bathroom = int(request.form["bathroom"])
    bhk = int(request.form["bhk"])
    location = request.form["location"]
    # total_sqft = float(request.form["1500"])
    # bathroom = int(request.form["2"])
    # bhk = int(request.form["3"])
    # location = request.form["5th phase jp nagar"]

    response = jsonify({
        "estimate_price": util.predict_price(total_sqft, bathroom, bhk, location)
    })
    return response


if __name__ == "__main__":
    CORS(app)
    app.run()
