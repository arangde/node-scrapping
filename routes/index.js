var express = require('express');
var router = express.Router();
import { generateResultsjson, generateResultsXml, individualLotteryjson } from "../app/controllers/draws_controller";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Autolotto Feeds' });
});

// /* GET results JSON. */
router.get('/draws.json', async function(req, res, next) {
  let json = await generateResultsjson();
  json = JSON.stringify(json, null, 2);
  res.set('Content-Type', 'application/json');
  res.send(json);
});

// TODO: Fix this output route.
// /* GET results XML. */
router.get('/draws.xml', async function(req, res, next) {
  const xml = await  generateResultsXml();
  res.set('Content-Type', 'text/xml');
  res.send(xml);
});

/* GET results last X number of draws JSON. */
router.get('/lottery.json', async function(req, res, next) {
  const gameName = req.query.gameName;
  const draws = req.query.draws;
  let json = await individualLotteryjson( gameName, draws );
  if ( json.errorMessage ) {
    res.status(404).send('Game not found')
  } else {
    json = JSON.stringify(json, null, 2);
    res.set('Content-Type', 'application/json');
    res.send(json);
  }
});

module.exports = router;