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

        var arty = await ArtDB.findById(auction.artId);
        var auction_ = await AuctionDB.findById(arty.artId);
        let auction_datetime = new Date(auction.endDate);

       var auctionArt = await AuctionDB.findOne({"artID": auction.artID});

        if(auction_datetime >= Date.now()){//getTime() >= current_datetime.getTime()){
            //respond status code 409 because there is not an ongoing auction anymore
            console.log("409!!!!!!!!!!!!!!!");
            return 409;
        }
        else if(auctionArt != null){
            //return status code for ART id already in 
            console.log("works");
            return 412;
        }

        else if(arty.isAuctionItem == true){

            console.log("isAuctionItem is true!");
            //call create!!!!!!!!!!!
            AuctionDB.create(auction);
            return 201;
            
        }else{//
        //respond status code 412 because there is no artId
            console.log("412!!!!!!!!!!!!!!!");
        
            return 412;
        }


        /*return await globalTryCatch(async () => {
        return ArtDB.findById(auction.artId).find().where({isAuctionItem: "true"}, function(err, docs){
            if(err) {
                var error = new Error('Error!');
                error.status = 401;
                return next(error);
              }
        }).exec().exists;
        
        });
        
        */
           

    };

	const getAuctionBidsWithinAuction = async (id) => { //skilar null..s
        return await globalTryCatch( async() =>{

            return AuctionDBBID.findById(id);
        });
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
