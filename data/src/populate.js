/////////////////////////////////////////////////////////////
////////////// Populate mongoDB with data ///////////////////
/////////////////////////////////////////////////////////////
var mongoose    = require('mongoose'),
    PartType    = mongoose.model('PartType'),
    System	    = mongoose.model('System'),
    data        = require('../partType.json');

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
});
/////////////////////////////////////////////////////////////
