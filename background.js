/*jslint
    devel: true
*/

/*eslint-env
    browser
*/

/* eslint-disable
    no-console
*/

/*global
    Utils
*/

(function () {
    'use strict';
    
    Utils.Chromium.createContextMenuItemThatSendsMessageToActiveTabInCurrentWindow(
        "SHOW_LIST_OF_ALL_POSTS_ON_THE_WALL",
        "Show list of all posts on the wall",
        ["page_action"],
        true,
        {
            method: "wall.get"
        }
    );

}());
