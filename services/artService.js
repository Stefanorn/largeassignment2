const artdb = require('../data/db').Art;

const artService = () => {
    const getAllArts = (cb, errorCb) => {
        artdb.find({}, function (err, data) {
            if(err){ throw new Error(err);}

            console.log(data);
            cb(data);
        })
        // Your implementation goes here
    };

    const getArtById = (id, cb, errorCb) => {
        // Your implementation goes here
    };

    const createArt = (art, cb, errorCb) => {
        // Your implementation goes here
    };

    return {
        getAllArts,
        getArtById,
        createArt
    };
};

module.exports = artService();
