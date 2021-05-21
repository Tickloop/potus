from flask import Flask, render_template, request, jsonify
app = Flask(__name__, template_folder='public')

@app.route("/")
def home():
    return render_template('index.html')

import pickle
import json
from models import feature_vector

@app.route("/potus", methods=['POST'])
def potus():
    data = json.loads(request.get_data())
    
    data['height_in'] = float(data['height_in'])
    data['weight_lb'] = float(data['weight_lb'])
    data['birth_day'] = int(data['birth_day'])
    data['birth_month'] = int(data['birth_month'])
    # data['political_party'] = 1 if data['politial_party']
    x_input = feature_vector(data)
    model = pickle.load(open('pres_model.pkl', 'rb'))
    pred = model.predict([x_input])[0]
    
    return jsonify({'pred': pred})

if __name__ == '__main__':
    app.run()

