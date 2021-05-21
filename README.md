# POTUS Predictor

## Data
`Historical Presidents Physical Data cleaned.csv` contains the cleaned physical data for presidents like height, weight, birth day, birth month, percentage of votes.

* precentage of votes are taken from Wikipedia.
* in case when candidates won in reelection, the average of the two vote percentages is used to represent percentage of votes.

The original data was taken from: https://www.kaggle.com/atmcfarland/historical-us-president-physical-data-more

## Models
We used 4 models to predict the likelyhood of becoming the president of USA, based on metrics like 
* height (inches)
* weight (lbs)
* birth day (1-31)
* birth month (month)
* birth state (US states)
* political inclination (Republican or Democrat)

We trained the following models:
* Linear Regressor
* Decision Tree Regressor
* Neural Network Regressor
* K-Nearest Neighbour Regressor

The best performing model was Decision Tree Regressor, where we had an R^2 scoreof 1.0, while Linear Regressor and K-Nearest Neighbour Regressor had R^2 scores close to 0.28. The Neural Network Regressor had a negative score in all test cases. 

In our web application, we used the Decision Tree Regressor to predict the percentage likelyhood of becoming the President of the United States.