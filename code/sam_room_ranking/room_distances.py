import csv
from numpy import mean
import math

d = {}

d['andrews'] = [(41.829983, -71.402798),(41.830391, -71.402857),(41.830377, -71.403117),(41.830513, -71.403145),(41.830531, -71.402889),(41.830635, -71.402906),(41.830681, -71.402194),(41.830574, -71.402180),(41.830593, -71.401928),(41.830465, -71.401911),(41.830442, -71.402161),(41.830031, -71.402110),(41.830018, -71.402287),(41.830360, -71.402354),(41.830344, -71.402637),(41.829994, -71.402623),]
d['plantations'] = [(41.830699, -71.401840),(41.830704, -71.401678),(41.830513, -71.401650),(41.830505, -71.401829),]
d['chapin'] = [(41.824795, -71.400532),(41.824805, -71.400365),(41.824173, -71.400288),(41.824160, -71.400461),]
d['hope'] = [(41.826931, -71.403954),(41.826937, -71.403791),(41.826581, -71.403779),(41.826579, -71.403949),]
d['slater'] = [(41.825891, -71.403944),(41.825893, -71.403770),(41.825665, -71.403762),(41.825659, -71.403938),]
d['gregorian quad a'] = [(41.823684, -71.399984),(41.823815, -71.400001),(41.823862, -71.399318),(41.823125, -71.399231),(41.823114, -71.399410),(41.823720, -71.399474),]
d['gregorian quad b'] = [(41.823583, -71.399962),(41.823083, -71.399893),(41.823118, -71.399449),(41.823232, -71.399463),(41.823215, -71.399729),(41.823597, -71.399780),]
d['littlefield'] = [(41.826031, -71.402145),(41.826044, -71.401939),(41.825800, -71.401909),(41.825793, -71.401967),(41.825499, -71.401935),(41.825490, -71.402085),]
d['minden'] = [(41.827345, -71.399223),(41.827351, -71.399121),(41.827291, -71.399107),(41.827313, -71.398847),(41.827381, -71.398855),(41.827389, -71.398752),(41.827204, -71.398727),(41.827196, -71.398839),(41.827160, -71.398835),(41.827136, -71.399148),(41.827166, -71.399153),(41.827165, -71.399199),]
d['sears'] = [(41.825304, -71.402150),(41.825372, -71.401316),(41.825248, -71.401294),(41.825178, -71.402134),]
d['wayland'] = [(41.825278, -71.402601),(41.825296, -71.402212),(41.824714, -71.402166),(41.824688, -71.402536),]
d['olney'] = [(41.824848, -71.402080),(41.824864, -71.401801),(41.824746, -71.401785),(41.824734, -71.401935),(41.824269, -71.401839),(41.824253, -71.402002),(41.824846, -71.402078),]
d['chapin'] = [(41.824792, -71.400528),(41.824802, -71.400367),(41.824176, -71.400289),(41.824162, -71.400458),]
d['goddard'] = [(41.824342, -71.401098),(41.824352, -71.400935),(41.824140, -71.400905),(41.824100, -71.401238),(41.823902, -71.401206),(41.823876, -71.401490),(41.823996, -71.401509),(41.824010, -71.401345),(41.824210, -71.401399),(41.824218, -71.401082),]
d['diman'] = [(41.824694, -71.401719),(41.824707, -71.401562),(41.824460, -71.401525),(41.824485, -71.401191),(41.824370, -71.401178),(41.824334, -71.401663),]
d['harkness'] = [(41.824044, -71.401092),(41.824109, -71.400250),(41.823988, -71.400234),(41.823922, -71.401076),]
d['marcy'] = [(41.824897, -71.401558),(41.824910, -71.401268),(41.824741, -71.401221),(41.824745, -71.400994),(41.824533, -71.400971),(41.824522, -71.401118),(41.824621, -71.401132),(41.824611, -71.401369),(41.824785, -71.401390),(41.824777, -71.401551),]
d['barbour'] = [(41.823994, -71.398341),(41.824037, -71.397795),(41.823703, -71.397754),(41.823665, -71.398301),]
d['perkins'] = [(41.823859, -71.396354),(41.823887, -71.396119),(41.823398, -71.396010),(41.823369, -71.396252),]
d['caswell'] = [(41.826307, -71.400766),(41.826319, -71.400598),(41.825969, -71.400552),(41.825953, -71.400718),]
d['315 thayer'] = [(41.830759, -71.400878),(41.830777, -71.400617),(41.830494, -71.400590),(41.830483, -71.400848),]
d['new pembroke #3'] = [(41.830659, -71.401634),(41.830674, -71.401398),(41.830699, -71.401401),(41.830706, -71.401284),(41.830685, -71.401284),(41.830686, -71.401243),(41.830601, -71.401236),(41.830598, -71.401289),(41.830548, -71.401287),(41.830543, -71.401387),(41.830576, -71.401390),(41.830565, -71.401631),]
d['new pembroke #4'] = [(41.830547, -71.401195),(41.830558, -71.401053),(41.830128, -71.401000),(41.830122, -71.401135),]
d['young orchard #2'] = [(41.824156, -71.396957),(41.824153, -71.396678),(41.823949, -71.396679),(41.823949, -71.396954),]
d['young orchard #4'] = [(41.824200, -71.396509),(41.824203, -71.396233),(41.823998, -71.396226),(41.823997, -71.396497),]
d['young orchard #10'] = [(41.824222, -71.395880),(41.824224, -71.395606),(41.824021, -71.395603),(41.824017, -71.395874),]
d['grad center a'] = [(41.823280, -71.400934),(41.823088, -71.400743),(41.822952, -71.400993),(41.823135, -71.401183),]
d['grad center b'] = [(41.823762, -71.401106),(41.823662, -71.400820),(41.823450, -71.400963),(41.823544, -71.401240),]
d['grad center c'] = [(41.823312, -71.400395),(41.823214, -71.400116),(41.822999, -71.400244),(41.823095, -71.400530),]
d['grad center d'] = [(41.823694, -71.400630),(41.823830, -71.400372),(41.823643, -71.400192),(41.823504, -71.400432),]


d['miller'] = [(41.830233, -71.402236)]
d['hegeman'] = [(41.825813, -71.400816)]
d['metcalf'] = [(41.830184, -71.402713)]
d['morris'] = [(41.829986, -71.401686)]
d['machado'] = [(41.830147, -71.404806)]
d['emery'] = [(41.829384, -71.401786)]
d['champlin'] = [(41.830247, -71.401783)]
d['woolley'] = [(41.829619, -71.401504)]
d['poland'] = [(41.824392, -71.403371)]
d['archibald'] = [(41.824372, -71.402864)]
d['mead'] = [(41.824343, -71.403863)]
d['jameson'] = [(41.823957, -71.403845)]
d['bronson'] = [(41.823955, -71.402866)]
d['king'] = [(41.824888, -71.397496)]
d['everett'] = [(41.823931, -71.403347)]
d['111 brown street'] = [(41.829925, -71.403309)] 

nelson_loc = (41.830183, -71.397977)
main_green_loc = (41.826184, -71.403231)
ratty_loc = (41.825141, -71.401120)

def centroid(l):
    x = mean([p[0] for p in l])
    y = mean([p[1] for p in l])
    return (x, y)

def euclidian_dist(p1, p2):
    return math.sqrt((p1[0] - p2[0])**2 + (p1[1] - p2[1])**2)

# Copied from https://en.wikibooks.org/wiki/Algorithm_Implementation/Strings/Longest_common_substring#Python_2
def longest_common_substring(s1, s2):
    m = [[0] * (1 + len(s2)) for i in xrange(1 + len(s1))]
    longest, x_longest = 0, 0
    for x in xrange(1, 1 + len(s1)):
        for y in xrange(1, 1 + len(s2)):
            if s1[x - 1] == s2[y - 1]:
                m[x][y] = m[x - 1][y - 1] + 1
                if m[x][y] > longest:
                    longest = m[x][y]
                    x_longest = x
            else:
                m[x][y] = 0
    return s1[x_longest - longest: x_longest]


# Takes in a list of strings, haystack, and a string to find, needle, and finds
# the "piece of hay" in the haystack with the biggest substring, needle 
def find_matching_string(haystack, needle):
    l = []
    for hay in haystack:
        matching_len = len(longest_common_substring(hay, needle))
        l.append((matching_len, hay))
    
    matching_len, s = max(l)
    return s



with open('sorted_with_occupancy.csv') as f:
    reader = csv.reader(f)
    reader.next()
    keys = [key.lower() for key in d.keys()]
    with open('locs.csv', 'w') as w:
        writer = csv.writer(w)
        writer.writerow(['room', 'occupancy', 'ratty_dist', 'main_green_dist', 'nelson_dist', 'score'])
        for line in reader:
            score, room, ranking, occupancy = line
            parsed_room = room.lower()
            parsed_room = parsed_room.replace(' house', '').replace(' college', '').replace(' hall', '')
            key = find_matching_string(keys, parsed_room)
            room_loc = centroid(d[key])
            ratty_dist = euclidian_dist(room_loc, ratty_loc)
            main_green_dist = euclidian_dist(room_loc, main_green_loc)
            nelson_dist = euclidian_dist(room_loc, nelson_loc)
            row = (room, occupancy, ratty_dist, main_green_dist, nelson_dist, score)
            writer.writerow(row)

        
