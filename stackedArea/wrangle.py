#!/usr/bin/env python
import sys
import csv
import datetime

night1 = ''
night2 = ''
outfile = ''
 
def main():
	count_total(night1)
	count_total(night2)
	write_to_csv()

# maps dorm name to total room number
total_rooms = {}
def count_total(night):
	csvFile = open(night, 'rb')
	csv_reader = csv.reader(csvFile)
	# skip the header in the csv file
	next(csv_reader, None)
	for row in csv_reader:
		res_hall = row[1]
		total_rooms[res_hall] = total_rooms.get(res_hall, 0) + 1
	csvFile.close()

remaining_rooms = {}
def write_to_csv():
	# keep track of remaining rooms per dorm
	# to begin with remaining rooms = total # of rooms
	for k, v in total_rooms.iteritems():
		remaining_rooms[k] = v
	csv_f = open(outfile, 'wb')
	writer = csv.writer(csv_f)
	writer.writerow(["res_hall", "remaining", "total", "num_picks"])
	write_night(night1, writer)
	write_night(night2, writer)

def write_night(night, writer):
	with open(night, 'rb') as csv1:
		reader = csv.reader(csv1)
		next(reader, None) #skip header
		for row in reader:
			current_number = int(row[0])
			res_hall = row[1]
			remaining_rooms[res_hall] = remaining_rooms.get(res_hall) - 1
			if current_number % 15 == 0:
				for k, v in remaining_rooms.iteritems():
					if total_rooms.get(k) != 0:
						writer.writerow([k, v, total_rooms.get(k), (current_number/15)])


	csvFile1 = open(night1, 'rb')
	csvFile2 = open(night2, 'rb')
	csv_reader1 = csv.reader(csvFile1)
	csv_reader2 = csv.reader(csvFile2)
	

if __name__ == "__main__":
	if len(sys.argv) != 4:
		print 'Usage: python wrangle.py night1 night2 outfile'
	else:
		night1 = sys.argv[1]
		night2 = sys.argv[2]
		outfile = sys.argv[3]
		main()