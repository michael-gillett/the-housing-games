from sys import argv
import csv


def count_rooms(file):
  with open(file, 'r') as f:
    reader = csv.reader(f)
    reader.next()
    population = {}
    for row in reader:
      dorm = row[1]
      population[dorm] = population.get(dorm, 0) + 1
    return population


ignore = ['No Show', 'Pass', 'Fake Building']
if __name__ == '__main__':
  file = argv[1]
  dorm_populaton = count_rooms(file)
  for key, value in dorm_populaton.items():
    if value > 1 and key not in ignore:
      print key, value
  # print dorm_populaton
