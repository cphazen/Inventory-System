//Protractor configuration

exports.config = {
	
	/* The address of a running selenium server; if you do not want to have to run 3 command prompt
	just keep this comment out; left incase someone does want to try out the 3 command prompt
	seleniumAddress: 'http://localhost:4444/wd/hub',
	*/
	
	// Directory where Protractor tests is at; basically what tests to run
	suites: {
		homepage: 'spec/homepage.js',
		inventory: 'spec/inventory.js',
		// kits: 'spec/kit.js',
		//system: 'spec/system.js'
	},
	
	// The timeout (in ms) for each script to run on the browser 
	// Note: It should be longer than the maximum time the applications needs to 
	// stabilize between tasks
	allScriptsTimeout: 99999,

	// Wait time for the homepage to load
	getPageTimeout: 10000,
	
	baseUrl: 'http://localhost:3000/', 
	
	framework: 'jasmine',
	
	jasmineNodeOpts: {
		// If true, then print colors to the terminal
		showColors: true,
		// The default time (in ms) to wait before a test fails
		defaultTimeoutInterval: 30000,
		isVerbose : true,
		includeStackTrace : true
	},
	
	// For running on different browsers, just incase someone does not have one of these browsers
	// install; right now just assume everyone have chrome
	// Note: issues with running on PhantomJS, so recommended to stick with chrome or something 
	// else
	multiCapabilities: [
		{
			'browserName': 'chrome'
		}, 
		/* {
			'browserName': 'firefox'
		} */
	]
	
};