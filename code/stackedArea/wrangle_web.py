import csv
from sys import argv

inp = argv[1]
out = argv[2]

total_rooms = {}
remaining_rooms = {}

with open(inp, 'r') as f:
  reader = csv.reader(f)
  reader.next()
  for row in reader:
    dorm = row[0].title()
    remaining = row[1]
    total = row[2]
    pick = row[3]

    if 'Drop' in dorm or 'Pass' in dorm or 'Fake' in dorm or 'No Show' in dorm:
      continue

    tmp = remaining_rooms.get(dorm, [])
    tmp.append(remaining)
    remaining_rooms[dorm] = tmp


num_picks = len(remaining_rooms.values()[0])

with open(out, 'wb') as f:
  writer = csv.writer(f)
  # for dorm in remaining_rooms:
  writer.writerow([dorm for dorm in remaining_rooms])

  for i in xrange(num_picks):
    writer.writerow([value[i] for dorm, value in remaining_rooms.items()])
