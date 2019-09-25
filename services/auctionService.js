const AuctionDB = require('../data/db').Auction;
const AuctionDBBID = require('../data/db').AuctionBid;
const ArtDB = require('../data/db').Art;
const customerDB = require('../data/db').Customer;

const globalTryCatch = async cb => {
    try {
      return await cb();
    } catch(err) {
      return err;
    }
}

const auctionService = () => {
    const getAllAuctions = async () => {
        return await globalTryCatch( async () =>{
        return await AuctionDB.find({});
        });
    };

    const getAuctionById = async (id) => {
        return await globalTryCatch( async() =>{

            return AuctionDB.findById(id);
        });
        
    };

    function checkCustomer(){
        
    }
    const getAuctionWinner = async () => {
        return await globalTryCatch( async() =>{
        
         const auction = await AuctionDBBID.findOne().sort({price: '-1', endDate:'1'});
        
         //console.log(auction);
        // console.log(auction.endDate);
         
         const customer = await customerDB.findById(auction.customerId);
         //console.log(await AuctionDBBID.find(auction.endDate));
         return customer;
     });  
     }

     
	const createAuction = async (auction) => {
        // Your implementation goes here
        
        return await globalTryCatch(async () => {
        return ArtDB.findById(auction.artId).find().where({isAuctionItem: "true"}, function(err, docs){
            if(err) {
                var error = new Error('Already exists!');
                error.status = 401;
                return next(error);
              }
        }).exec();
        
        });
        
        
           

    };

	const getAuctionBidsWithinAuction = (auctionId, cb, errorCb) => {
        // Your implementation goes here
    };

	const placeNewBid = (auctionId, customerId, price, cb, errorCb) => {
		// Your implementation goes here
	}

    return {
        getAllAuctions,
        getAuctionById,
        getAuctionWinner,
		createAuction,
		getAuctionBidsWithinAuction,
		placeNewBid
    };
};

module.exports = auctionService();
