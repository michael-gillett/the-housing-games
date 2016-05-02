from sklearn.linear_model import LinearRegression
from sklearn.cross_validation import cross_val_score
import numpy as np
import csv

dataFile = ''

features = []
labels = []

#collect data
with open(dataFile, 'w') as f:
	reader = csv.reader(f)
	for row in reader:
		features.append(row[:-1])
		labels.append(row[-1])

model = LinearRegression(normalize=True)
print 'cross_val_score', np.mean(cross_val_score(model, features, labels, 'accuracy', 10))

model.fit(features, labels)

for i, coef in enumerate(model.coef_):
	print i, coef

