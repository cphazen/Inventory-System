/////////////////////////////////////////////////////////////
////////////// Populate mongoDB with data ///////////////////
/////////////////////////////////////////////////////////////
var mongoose    = require('mongoose'),
    PartType    = mongoose.model('PartType'),
    data        = require('../partType.json'),
    KitType     = mongoose.model('KitType');


function generate_kitType(id, type) {
    // Check if system already exists
    KitType.count({name: type}, function(err, count) {
        if (err) return console.error(err);
        if (count) return;

        // if it doesn't exist, create it and generate its requiredParts

        var requiredParts = [];


        // generate the part list
        var amount_var = type + '_amount', filter = {};
        filter[amount_var] = {$gt: 0};
        PartType.find(filter, function(err, parts) {
            for (var i = 0; i < parts.length; i++)
                requiredParts.push({
                    _id: parts[i]._id,
                    quantity: parts[i][amount_var]
                });
            var kitType = new KitType({
                _id: id,
                name: type,
                requiredParts:requiredParts
            });
            kitType.save();
        });
    });
}

var err, el;
function errorHandler(err, el){
    if (err) console.log(err);
    //else console.log(el + ' added to database');
}

/*Check if PartType is already populated */
PartType.count({}, function(err, count){
    if (err) return console.log(err);
    if(!count){
        /* For each partType */
        for(var i = 0; i < data.length; i++ ){
            /* Save partType */
            var partType = new PartType(data[i]);
            partType.save(errorHandler(err, partType));
        }
        console.log('MongoDB has been populated...');
    } else {
        console.log('MongoDB is already populated...');
    }

    generate_kitType(0, 'GX5');
    generate_kitType(1, 'GX35');
});
/////////////////////////////////////////////////////////////
