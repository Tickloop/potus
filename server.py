import json
from flask import Flask, render_template, request, jsonify

# loading in our model that we will be using
from models import feature_vector, linear_regr, dtree_regr

app = Flask(__name__, template_folder='public')

@app.route("/")
def home():
    return render_template('index.html')

@app.route("/potus", methods=['POST'])
def potus():
    # getting the data from the request
    data = json.loads(request.get_data())
    
    # converting the numbers from text to numbers
    data['height_in'] = float(data['height_in'])
    data['weight_lb'] = float(data['weight_lb'])
    data['birth_day'] = int(data['birth_day'])
    data['birth_month'] = int(data['birth_month'])
    data['political_party'] = int(data['political_party'])
    
    # creating the feature vector that we can use
    x_input = feature_vector(data)
    
    # the predicted likelyhood of becoming the president of USA
    linear_pred = linear_regr.predict([x_input])[0][0]
    dtree_pred = dtree_regr.predict([x_input])[0]
    
    # returning the data in json
    return jsonify({'pred': f"{int(min(linear_pred, dtree_pred))}% to {int(max(linear_pred, dtree_pred))}%"})
    # return jsonify({'pred': f"{int(linear_pred)}%"})

if __name__ == '__main__':
    app.run()

