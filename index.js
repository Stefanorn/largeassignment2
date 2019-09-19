const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const artistService = require('./services/artistService');
const artService = require('./services/artService');
const customerService = require('./services/customerService');
const auctionService = require('./services/auctionService');

app.use(bodyParser.json());


// Art Routs
app.get('/api/arts', function (req, res) {
    artService.getAllArts( function (art) {
        return res.json(art);
    });
});

app.get('/api/arts/:artId', function (req, res) {
    const artId = req.params.artId;
    return res.json(artService.getArtById(artId));
});

app.post('/api/arts', function (req, res) {

});

// Artist Routs
app.get('/api/artists', function (req, res) {
    return res.json({hello:'world'});
});

app.get('/api/artists/:artistId', function (req, res) {
    return res.json({hello:'world'});
});

app.post('/api/artists', function (req, res) {
    return res.json({hello:'world'});
});

// Customer Routs
app.get('/api/customers', function (req, res) {
    return res.json({hello:'world'});
});

app.get('/api/customers/:customerId', function (req, res) {
    return res.json({hello:'world'});
});

app.post('/api/customers', function (req, res) {
    return res.json({hello:'world'});
});

app.get('/api/customers/:customerId/auction-bids', function (req, res) {
    return res.json({hello:'world'});
});


// Auction routs
app.get('/api/auctions', function (req, res) {
    return res.json({hello:'world'});
});

app.get('/api/auctions/:auctionsId', function (req, res) {
    return res.json({hello:'world'});
});

app.get('/api/auctions/:auctionId/winner', function (req, res) {
    return res.json({hello:'world'});
});

app.post('/api/auctions', function (req, res) {
    return res.json({hello:'world'});
});

app.get('/api/auctions/:auctionId/bids', function (req, res) {
    return res.json({hello:'world'});
});

app.post('/api/auctions/:auctionId/bids', function (req, res) {
    return res.json({hello:'world'});
});

// http://Localhost:3000
app.listen(3000, function(){
    console.log('Server is listening on port 3000');
});
