var mongoose    = require('mongoose'),
    PartType    = mongoose.model('PartType'),
    KitType     = mongoose.model('KitType');
    
var GX5part_list = [],
    GX35part_list = [];

/**
 * Sorry for all the nested functions, but it will not work correctly otherwise.
 * It has something to do with nodejs and how mongoose runs queries - synchronous vs asynchronous
 * /


/* Check if GX5 kit type already exists - if so, do not create new kit type */
KitType.count({"kitName" : "GX5"}, function (err, count){
    if (err) return console.log(err);

    if(!count){ /* adds GX5 kit type to mongodb */
        PartType.find({GX5_amount : {$gt : 0}},  function(err, GX5_list){
            if (err) return console.log(err);
            for(var i = 0; i < GX5_list.length; i++) {
                var partType = GX5_list[i];
                var id = partType._id;
                var amount = partType.GX5_amount;
                GX5part_list.push({_id : id, quantity : amount});
            } /* save kit type */
            var kitType = new KitType({
                "kitName": "GX5",
                "requiredParts" : GX5part_list
            });
            kitType.save(function errorHandler(err, el){
                if (err) console.log(err);
                //else console.log(el + ' added to database'); //for debugging
            });
        });
        console.log('Created GX5 kit type...');
    }
    else{
        console.log('GX5 kit type already exists...');
    }

});

/* Check if GX35 kit type already exists - if so, do not create new kit type */
KitType.count({"kitName" : "GX35"}, function (err, count){
    if (err) return console.log(err);

    if(!count){ /* adds GX35 kit type to mongodb */
        PartType.find({GX35_amount : {$gt : 0}},  function(err, GX35_list){
            if (err) return console.log(err);
            for(var i = 0; i < GX35_list.length; i++) {
                var partType = GX35_list[i];
                var id = partType._id;
                var amount = partType.GX35_amount;
                //GX35part_list[id] = amount;
                GX35part_list.push({_id : id, quantity : amount});
            } /* save kit type */
            var kitType = new KitType({
                "kitName": "GX35",
                "requiredParts" : GX35part_list
            });
            kitType.save(function errorHandler(err, el){
                if (err) console.log(err);
                //else console.log(el + ' added to database'); //for debugging
            });
        });
        console.log('Created GX35 kit type...');
    }
    else{
        console.log('GX35 kit type already exists...');
    }
});


