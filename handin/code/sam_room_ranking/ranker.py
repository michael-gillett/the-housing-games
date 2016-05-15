import csv
import os
import numpy as np

data_path = '../../data'
output_path = 'sorted_with_occupancy.csv'

def get_score(num):#lower score will be better
	return np.sqrt(num)

#aggregate all data
data = []
for f in [x for x in os.listdir(data_path) if x[-3:] == 'csv']:
	path = os.path.join(data_path, f)
	reader = csv.reader(open(path, 'rb'))
	
	reader.next()
	for row in reader:
		if row[2] != '':#don't count no-shows
			data.append(row)

#rank
rankings = {}
for row in data:
	pick_num = int(row[0])
	score = get_score(pick_num)
	room = (row[1], row[2], row[3])

	if room in rankings:
		rankings[room].append(score)
	else:
		rankings[room] = [score]

#avg rankings
scored_list = []
for room in rankings:
	scored_list.append((np.mean(rankings[room]), room[0]+' '+room[1], room[2]))



#sort
scored_list.sort()
ranked_list = []
for i, row in enumerate(scored_list, start=1):
	ranked_list.append((row[0], row[1], i, row[2]))

#output
writer = csv.writer(open(output_path, 'wb'))
writer.writerow(['score', 'room', 'rank', 'occupancy'])
writer.writerows(ranked_list)