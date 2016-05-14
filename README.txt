Within the code folder we have several sub folders that correspond to different ways we wrangled and analyzed the data.


- To run code to wrangle into format usable for the stacked area chart visualizations:

go to the code/stackedArea and run 

python wrangle.py yearData outfile

yearData corresponds to a CSV file containing the aggregate data from a single year. These files can be found in /data/aggregate. The outfile is the file you want the wrangled data to be output to.



- To run the code to create a CSV containing room numbers mapped to their pick number by year:

simply go to code/roomSuggestion

python picks.py 

- To run the code to create the location data used to run the regression:

First run ranker.py in the sam_room_ranking folder. This will output a cvs to the data folder. Then run room_distances.py in the same folder. This will generate locs.csv. This file was copied from sam_room_ranking to Feature Learning, and renamed features.csv. 

To get coefficients for the regression model, run python linreg.py in the "Features Learning" folder. This program will print out the coefficients correponding to the features specified in the get_features function. Currently, the coefficients correspond to the features [occupancy, ratty_dist, main_green_dist, nelson_dist] in that order. They are, for the normalized data:

occupancy: 1.33639755453
ratty_dist: -0.370055329148
main_green_dist: -0.154419958127
nelson_dist: 0.37905316164

