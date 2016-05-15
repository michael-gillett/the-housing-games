import csv
import os
import numpy as np

data_path = '../../data'
output_path = 'collected.csv'

#aggregate all data
data = {}
for f in [x for x in os.listdir(data_path) if x[-3:] == 'csv']:
	path = os.path.join(data_path, f)
	reader = csv.reader(open(path, 'rb'))
	
	reader.next()
	for row in reader:
		if row[2] != '':#don't count no-shows
			if row[1] in data:
				data[row[1]].add(row[2])
			else:
				data[row[1]] = set([row[2]])

for key in data:
	print key
	print data[key]


writer = csv.writer(open(output_path, 'w'))
for key in data:
	rooms = sorted(list(data[key]))

	for room in rooms:
		roomstr = key+' '+room
		writer.writerow([roomstr])