###Building Scrapers

The scrapers for each game are going to have a lottery object containing:
* the game name - String (no spaces, no dashes, all lowercase)
* the sources for the most recently passed draw (URL and scraper) - Array of Objects 
* the sources for the upcoming draw (URL and scraper) - Array of Objects

>const sourcesRecent = [
>  { Url:'https://www.lotterypost.com/game/228/jackpot', Scraper: scriptRecent }
>];
>
>const sourcesNext = [
>  { Url: 'http://www.olg.ca/lotteries/games/howtoplay.do?game=lotto649', Scraper: scriptNext  }
>];
>
>const lottery = {
>  name: 'lotto649',
>  drawTime:'Tuesday and Friday at 11:00 EST',
>  sourcesRecent,
>  sourcesNext
>};

The scripts will take in an html that we will feed into cheerio to parse data from.
At minimum we need to parse the following data:
- date - a Date object. (Only month, day and year)
- scrapedNumbers - an array of numbers
- jackpot amount (required for most recent draw) - number

The scripts will return the data as an object with the keys below
return { lotteryName, date, scrapedNumbers, jackpot };


The entire lottery object will be fed into the scrape function.
This function takes the URLs given, makes a request to the grab the html, then uses the scrapers to grab the wanted data from the html.

>import scrape from '../services/scrapeURLsAndSaveNewData'
>export default async function () {
>  scrape(lottery);
>}



