##Run a file 

	babel-node app/scrapers/PowerBall.js --presets es2015,stage-2

##Current Routes:

###/draws.json
Most recent draw data for all lotteries in json format

###draws.xml
Most recent draw data for all lotteries in xml format

###/lottery.json?gameName=powerball&draws=10 
draws is the number of previous draws you want to see
gameName: 'powerball', 'megamillions'