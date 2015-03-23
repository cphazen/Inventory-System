'use strict';

// Configuring the Articles module
angular.module('kits').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Kits', 'kits', 'dropdown', '/kits(/create)?');
		Menus.addSubMenuItem('topbar', 'kits', 'List Kits', 'kits');
		Menus.addSubMenuItem('topbar', 'kits', 'New Kit', 'kits/create');
	}
]);
