from sklearn.linear_model import LinearRegression
from sklearn.cross_validation import cross_val_score
import numpy as np
import csv

def get_features(row):
    return [float(f) for f in row[1:-1]]
    #return [float(row[1])]

def extract(datafile):
    features, labels = [], []
    with open(datafile, 'r') as f:
        reader = csv.reader(f)
        reader.next()
        for row in reader:
            features.append(get_features(row))
            labels.append(float(row[-1]))
    return (features, labels)

def normalize(l):
    mean = np.mean(l)
    std = np.std(l)
    if std == 0:
        return [0 for i in xrange(len(l))]
    else:
        return [(n - mean) / std for n in l]

def normalize_all(l):
    if len(l) == 0:
        return l
    #Z-score normalization
    # Split up features in X by component, normalize each, and then 
    # Rejoin them together using zip function
    separate_features = []
    for i in xrange(len(l[0])):
        feature = [e[i] for e in l]
        normalized = normalize(feature)
        separate_features.append(normalized)
    return zip(*separate_features)

features, labels = extract('features.csv')
features = normalize_all(features)
model = LinearRegression()
model.fit(features, labels)
print 'cross_val_score', np.mean(cross_val_score(model, features, labels, scoring='mean_squared_error', cv=10))
for i, coef in enumerate(model.coef_):
    print i, coef


