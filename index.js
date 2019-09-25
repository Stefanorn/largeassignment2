const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const artistService = require('./services/artistService');
const artService = require('./services/artService');
const customerService = require('./services/customerService');
const auctionService = require('./services/auctionService');

app.use(bodyParser.json());

// Art Routs
app.get('/api/arts', async function (req, res) {

    const result = await artService.getAllArts();
    return res.json(result);
});

app.get('/api/arts/:artId', async function (req, res) {

    const artId = req.params.artId;

    return res.json( await artService.getArtById(artId));
});

app.post('/api/arts', function (req, res) {

        artService.createArt(req.body).then(r => {
            return res.status(201).json(r);
        }).catch( e => {
            return res.status(400).json(e);
        });

});

// Artist Routs
app.get('/api/artists', async function (req, res) {
   return res.json( await artistService.getAllArtists() );

});

app.get('/api/artists/:artistId', async function (req, res) {
    return res.json( await artistService.getArtistById( req.params.artistId ) );
});

app.post('/api/artists', async function (req, res) {
    artistService.createArtist( req.body ).then( r => {
        return res.status(201).json(r);
        }).catch( e => {
            return res.status(400).json(e);
    });
});

// Customer Routs
app.get('/api/customers', async function (req, res) {
    return res.json(await customerService.getAllCustomers());

});

app.get('/api/customers/:customerId', async function (req, res) {
    return res.json( await customerService.getCustomerById( req.params.customerId ) );
});

app.post('/api/customers', function (req, res) {
    customerService.createCustomer( req.body ).then(r => {
        return res.status(201).json(r);
    }).catch( e =>{
        return res.status(400).json(e);
    });
});

app.get('/api/customers/:customerId/auction-bids', async function (req, res) {

    return res.json( await customerService.getCustomerAuctionBids( req.params.customerId ));
});


// Auction routs
app.get('/api/auctions', async function (req, res) {
    return res.json(await auctionService.getAllAuctions());
});

app.get('/api/auctions/:auctionsId', async function (req, res) {

    return res.json( await auctionService.getAuctionById(req.params.auctionsId));
});

app.get('/api/auctions/:auctionsId/winner', async function (req, res) {
    return res.json( await auctionService.getAuctionWinner( req.params.auctionsId ));

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
