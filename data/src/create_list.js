var mongoose    = require('mongoose'),
    PartType    = mongoose.model('PartType'),
    KitType     = mongoose.model('KitType');

function generate_system(id, type) {
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

generate_system(0, 'GX5');
generate_system(1, 'GX35');
