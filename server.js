'use strict';
/**
 * Module dependencies.
 */
var init = require('./config/init')(),
	config = require('./config/config'),
	mongoose = require('mongoose'),
	chalk = require('chalk');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Bootstrap db connection
var db = mongoose.connect(config.db.uri, config.db.options, function(err) {
	if (err) {
		console.error(chalk.red('Could not connect to MongoDB!'));
		console.log(chalk.red(err));
	}
});
mongoose.connection.on('error', function(err) {
	console.error(chalk.red('MongoDB connection error: ' + err));
	process.exit(-1);
	}
);



// Init the express application
var app = require('./config/express')(db);

// Bootstrap passport config
require('./config/passport')();

/////////////////////////////////////////////////////////////
////////////// Populate mongoDB with data ///////////////////
/////////////////////////////////////////////////////////////
var PartType    = mongoose.model('PartType'),
    Inventory   = mongoose.model('Inventory'),
    data        = require('./data/partType.json');

/* For each partType */
for(var i = 0; i < data.length; i++ ){
    /* Save partType */
    var partType = new PartType(data[i]);
    partType.save(function (err, partType){
        if (err) console.log(err);
        //else console.log(partType + ' added to database');
    });

    /* Save partType to inventory */
    var inventory = new Inventory({ Type: partType._id, quantity:  0});
    inventory.save(function (err, inventory){
        if (err) console.log(err);
        //else console.log(inventory._id + ' added to database');
    });
}
/////////////////////////////////////////////////////////////

// Start the app by listening on <port>
app.listen(config.port);

// Expose app
exports = module.exports = app;

// Logging initialization
console.log('--');
console.log(chalk.green(config.app.title + ' application started'));
console.log(chalk.green('Environment:\t\t\t' + process.env.NODE_ENV));
console.log(chalk.green('Port:\t\t\t\t' + config.port));
console.log(chalk.green('Database:\t\t\t' + config.db.uri));
if (process.env.NODE_ENV === 'secure') {
	console.log(chalk.green('HTTPs:\t\t\t\ton'));
}
console.log('--');
