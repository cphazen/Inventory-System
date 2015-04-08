'use strict';

// Configuring the Articles module
angular.module('systems').run(['Menus',
    function(Menus) {
        // Set top bar menu items
        Menus.addMenuItem('topbar', 'Systems', 'systems', 'dropdown', '/systems(/create)?');
        Menus.addSubMenuItem('topbar', 'systems', 'List Systems', 'systems');
    }
]);
