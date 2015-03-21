var mongoose    = require('mongoose'),
    PartType    = mongoose.model('PartType'),
    SystemType	= mongoose.model('SystemType'),
    GX5_list 	= mongoose.model('PartType').find({GX5_ammount : {$gt : 0}}),
    GX35_list	= mongoose.model('PartType').find({GX35_ammount : {$gt : 0}});
    
var GX5part_list,
    GX35part_list;


for(var i = 0; i < GX5_list.length; i++){
	var partType = GX5_list[i];
	var id = partType._id;
	var amount = partType.GX5_ammount;
	GX5part_list[i] = {id : ammount};
}

var GX5_type = new SystemType("GX5", GX5part_list);
GX5_type.save();

for(var i = 0; i < GX35_list.length; i++){
	var partType = GX35_list[i];
	var id = partType._id;
	var amount = partType.GX35_ammount;
	GX35part_list[i] = {id : ammount};
}

var GX35_type = new SystemType("GX35", GX35part_list);
GX35_type.save();

console.log('created system types');
