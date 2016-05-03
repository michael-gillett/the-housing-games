import csv
import os

data_path = '../../data/aggregate'
output_path = 'picks.csv'


# aggregate all data
# dict of room mapped to list of num pick by year
data = {}
num = 0
for f in [x for x in os.listdir(data_path) if x[-3:] == 'csv']:
	path = os.path.join(data_path, f)
	reader = csv.reader(open(path, 'rb'))
	reader.next()
	for row in reader:
		dorm = row[1]
		room_num = row[2]
		room_name = dorm + ' ' + room_num
		pick_num = row[0]
		if room_num != '':#don't count no-shows
			if room_name in data:
				rooms = len(data[room_name])
				if num - rooms > 0:
					data[room_name] = data[room_name] + [0]*(num - rooms) 
				# add to list
				data[room_name] = data[room_name] + [pick_num]
			else:
				# create new list
				data[room_name] = [0]*(num) + [pick_num]
	num += 1

# write data
writer = csv.writer(open(output_path, 'wb'))
writer.writerow(['room', '2006_pick', '2007_pick', '2008_pick', '2009_pick', '2010_pick', '2011_pick', '2012_pick', '2013_pick'])
for key, val in data.items():
	writer.writerow([key] + val)