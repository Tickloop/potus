import numpy as np
import pandas as pd

# importing the data from the csv file
data = pd.read_csv('Data/Historical Presidents Physical Data cleaned.csv')

# columns to be used
cols_x = ['height_in', 'weight_lb', 'birth_day', 'birth_month', 'birth_state', 'presidency_begin_age', 'political_party']
cols_y = ['percentage_votes']

# our input variable X and target variable Y
X = data[cols_x]
Y = data[cols_y]

# converting categorical data to numerical data
X['political_party'].replace({
    'Democratic-Republican':'Republican',
    'Whig':'Republican',
    'Unaffiliated':'Republican',
    'Federalist':'Republican',
    'National Union': 'Republican'
}, inplace=True)

X['political_party'].replace({
    'Republican': 0,
    'Democrat': 1
}, inplace=True)

# turning all the state names to lowercases
X['birth_state'].str.lower()

# calculating frequencies for birth_day, birth_monty, and birth_state
FREQ_BD = X['birth_day'].value_counts()
FREQ_BM = X['birth_month'].value_counts()
FREQ_BS = X['birth_state'].value_counts()

# now we create feature vectors

def feature_vector(x):
    f = []

    # appended directly 
    f.append(x['height_in'])
    f.append(x['weight_lb'])
    
    # these are derived frequencies to be used as feature vectors
    f.append(FREQ_BD[x['birth_day']]) if x['birth_day'] in FREQ_BD else f.append(0)
    f.append(FREQ_BM[x['birth_month']]) if x['birth_month'] in FREQ_BM else f.append(0)
    f.append(FREQ_BS[x['birth_state']]) if x['birth_state'] in FREQ_BS else f.append(0)
    
    # adding the politcal party as a feature as well
    f.append(x['political_party'])

    # returns a numpy array for easy model training 
    return np.asarray(f)

# creating numpy arrays for X and Y
X = np.asarray([feature_vector(row) for i, row in X.iterrows()])
Y = np.asarray(Y)

def parse_input():
    height_in = float(input('Enter height(in): '))
    weight_lb = float(input('Enter weight(lbs): '))
    birth_day = int(input('Enter birth day(1-31): '))
    birth_month = int(input('Enter birth month(1-12): '))
    birth_state = input('Enter birth state: ').lower()
    political_party = input('Enter your political inclincation: ').lower()
    political_party = 1 if political_party == 'democrat' else 0

    x = {
        'height_in': height_in,
        'weight_lb': weight_lb,
        'birth_day': birth_day,
        'birth_month': birth_month,
        'birth_state': birth_state,
        'political_party': political_party
    }

    return feature_vector(x)

# creating a Linear Regrssion model
from sklearn.linear_model import LinearRegression
linear_regr = LinearRegression()
linear_regr.fit(X, Y)


# creating a Decision Tree Regressor model
from sklearn.tree import DecisionTreeRegressor
dtree_regr = DecisionTreeRegressor(random_state=42)
dtree_regr.fit(X, Y)


# creating a Neural Network Regressor model
from sklearn.neural_network import MLPRegressor
ml_regr = MLPRegressor(max_iter=500)
ml_regr.fit(X, Y.reshape(Y.shape[0]))


# creating a KNN Regressor model
from sklearn.neighbors import KNeighborsRegressor
knn_regr = KNeighborsRegressor()
knn_regr.fit(X, Y)

def print_pred(pred):
    print(f'There is a {round(pred, 3)}% chance that you become the next president of USA!')

def print_score():
    # Score values for the different models
    print('\n========== Calculating the scores of each of the models ===========')
    print('The score indicates how well a regressor performs, 1.0 being the best!\n')
    print(f'Linear Regressor: {round(linear_regr.score(X, Y), 3)}')
    print(f'Decision Tree: {round(dtree_regr.score(X, Y), 3)}')
    print(f'Neural Network: {round(ml_regr.score(X, Y), 3)}')
    print(f'K-Nearest Neighbor: {round(knn_regr.score(X, Y), 3)}')

def main():
    # getting the input
    X_input = parse_input()

    # predicting the percentage for different models
    pred = linear_regr.predict([X_input])[0][0]
    print('\n========== Using a linear regressor ==========')
    print_pred(pred)
    
    pred = dtree_regr.predict([X_input])[0]
    print('\n========== Using a Decision Tree =============')
    print_pred(pred)
    
    pred = ml_regr.predict([X_input])[0]
    print('\n========== Using a Neural Network ============')
    print_pred(pred)
    
    pred = knn_regr.predict([X_input])[0][0]
    print('\n========== Using K-Nearest Neighbors  ========')
    print_pred(pred)

    # printing the scores
    print_score()

import pickle

def save_model():
    model_choice = input('Enter which model to serialize: ')
   
    with open(f'pres_model_{model_choice}.pkl', 'wb') as file:
        if model_choice == "1":
            pickle.dump(linear_regr, file)
        elif model_choice == "2":
            pickle.dump(dtree_regr, file)
        elif model_choice == "3":
            pickle.dump(ml_regr, file)
        elif model_choice == "4":
            pickle.dump(knn_regr, file)
        else:
            print('Invalid selection. Saving Decision Tree as Default')
            pickle.dump(dtree_regr, file)
    
import sys

if '--main' in sys.argv:
    main()

if '--save-model' in sys.argv:
    save_model()