import json
import pickle
import numpy as np

all_columns = None
locations = None
model = None

def predict_price(total_sqft, bathroom, bhk, location):
    # try:
    #     loc_index = all_columns.index(location)
    # except:
    #     loc_index = -1

    loc_index = all_columns.index(location)
    x = np.zeros(int(len(all_columns)))

    x[0] = total_sqft
    x[1] = bathroom
    x[2] = bhk
    if loc_index >=0:
        x[loc_index] = 1
    x = list(map(int, x))
    print(round(model.predict([x])[0] * 100000, 2))

    return round(model.predict([x])[0] , 2)
    # print(x)


def load_locations():
    print("Loading Locations")
    return locations

def load_artifacts():
    print("Loading Artifacts...")
    global all_columns
    global model
    global locations

    with open("./artifacts/columns.json", "r") as f:
        all_columns = json.load(f)['data_columns']
        locations =  all_columns[3:]

    with open("./artifacts/pickle_model", "rb") as f:
        model = pickle.load(f)

load_artifacts()

# def predict_price(total_sqft, bathroom, bhk, location):
predict_price(950, 1, 1, "bannerghatta road")

# print(len(all_columns))