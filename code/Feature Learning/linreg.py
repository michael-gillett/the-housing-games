from sklearn.linear_model import LinearRegression
from sklearn.cross_validation import cross_val_score
import numpy as np
import csv

dataFile = 'features.csv'

features = []
labels = []

#collect data
with open(dataFile, 'r') as f:
	reader = csv.reader(f)
	reader.next()
	for row in reader:
		float_features = []
		float_features.append(1.0)#for bias term?
		for feature in row[1:-1]:
			float_features.append(float(feature))
		features.append(float_features)
		labels.append(float(row[-1]))

def normalize(X):
	#TODO: Fill in the code to normalize features!
	#Z-score normalization
	Xnorm = []
	fMeans = np.mean(X, axis=0)
	fStds = np.std(X, axis=0)

	for obs in X:
		obs_norm = []
		for f in range(len(X[0])):
			obs_norm.append((obs[f] - fMeans[f])/fStds[f])
		Xnorm.append(obs_norm)
	
	return Xnorm

normalize(features)

# print features[0]
# for row in features:
# 	print features

model = LinearRegression()
model.fit(features, labels)

# print 'cross_val_score', np.mean(cross_val_score(model, features, labels, 'accuracy', 10))

for i, coef in enumerate(model.coef_):
	print i, coef

