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
            await AuctionDB.find({}).then(function (auctions) {
               auctions.forEach( async function (auction) {

                   // if i encounter a auction that is not expired, i will do nothing
                   if( auction.endDate <= Date.now()){}

                   // if i encounter a auction with winner then i will skip the extra step.
                   else if(auction.auctionWinner != null){}
                   // finaly i have encounterd a auction without a winner that should have a winner
                       // so i will add the winner.
                   else {
                       const auctionWinner = await AuctionDBBID
                           .find({"auctionId": auction._id})
                           .findOne()
                           .sort({price: '-1', endDate: '1'});


                        await AuctionDB.findById(auction._id).updateOne(
                           {},
                           {$set: {"auctionWinner": auctionWinner.customerId}},
                           {upsert: false, multi: true});
                   }
               });
            });
            return await AuctionDB.find({});
        });
    };

    const getAuctionById = async (id) => {
        return await globalTryCatch( async() =>{
            var auction = await AuctionDB.findById(id);

            // if i encounter a auction that is not expired, there is no winner so i will return
            // the auction as is.
            if( auction.endDate <= Date.now()){
                return await auction;
            }
            // if i encounter a auction with winner then i will skip the extra step and return.
            else if(auction.auctionWinner != null){
                return await auction;
            }
            // if i encounter a auction that dose not hae a winner i will add that row
            else {
                const auctionWinner = await AuctionDBBID
                    .find({"auctionId": id})
                    .findOne()
                    .sort({price: '-1', endDate: '1'});

                await AuctionDB.findById(id).updateOne(
                    {},
                    {$set: {"auctionWinner": auctionWinner}},
                    {upsert: false, multi: true});

                auction = await AuctionDB.findById(id);
                return await auction;
            }
        });
        
    };

    const getAuctionWinner = async () => {
        return await globalTryCatch( async() =>{
         const auction = await AuctionDBBID.findOne().sort({price: '-1', endDate:'1'});
         const customer = await customerDB.findById(auction.customerId);
         return customer;
     });  
     }

     
	const createAuction = async (auction) => {
        // Your implementation goes here

        var arty = await ArtDB.findById(auction.artId);
        var auction_ = await AuctionDB.findById(arty.artId);
        let auction_datetime = new Date(auction.endDate);

       var auctionArt = await AuctionDB.findOne({"artID": auction.artId});

        if(auction_datetime <= Date.now()){//getTime() >= current_datetime.getTime()){
            //respond status code 409 because there is not an ongoing auction anymore
            return 409;
        }
        else if(auctionArt != null){
            //return status code for ART id already in 
            console.log(auctionArt);
            return 412;
        }

        else if(arty.isAuctionItem == true){
            
                return AuctionDB.create({"artID": auction.artId,
                                          "minimumPrice": auction.minimumPrice,
                                           "endDate": auction.endDate,
                                           "auctionWinner": auction.auctionWinner});
            
        }else{//
        //respond status code 412 because there is no artId
            return 412;
        }
    };

	const getAuctionBidsWithinAuction = async (id) => {
        return await globalTryCatch( async() =>{
            return AuctionDBBID.find({"auctionId": id});
        });
    };

	const placeNewBid = async (auctionId, customerId, price) => {

	    const auction = await AuctionDB.findById(auctionId);
        const minBid = auction.minimumPrice;
        let auction_datetime = new Date(auction.endDate);
        let highestBid = await AuctionDBBID.findOne({"auctionId": auctionId}).sort({price: '-1', endDate: '1'});
        highestBid = highestBid.price;

        // compares the dates
        if(auction_datetime <= Date.now()){
            return 403;
        }

        else if( minBid < price && highestBid < price ){
            const customer = await customerDB.findById(customerId);
            if(customer) {
                AuctionDBBID.create({"auctionId": auctionId, "customerId": customerId, "price": price});
                await AuctionDB.findById(auctionId).updateOne(
                    {},
                    {$set: {"auctionWinner": customerId}},
                    {upsert: false, multi: true});

                // i have created a new customer and updated the winner
                return 201;
            }
            // if i havent found a customer i will return here
            else {
                return 412;
            }
        }
        else {
            // if the price dose not meat precondition i return here
            return 412;
        }
	};

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
