Within the code folder we have several sub folders that correspond to different ways we wrangled and analyzed the data.


- To run code to wrangle into format usable for the stacked area chart visualizations:

go to the code/stackedArea and run 

python wrangle.py yearData outfile

yearData corresponds to a CSV file containing the aggregate data from a single year. These files can be found in /data/aggregate. The outfile is the file you want the wrangled data to be output to.



- To run the code to create a CSV containing room numbers mapped to their pick number by year:

simply go to code/roomSuggestion

python picks.py 
