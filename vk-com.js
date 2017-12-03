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
    $,
    Utils,
    VK
*/

(function () {
    'use strict';
    
    var serviceToken = "Service Token",
        vk = new VK(serviceToken);

    function getOwnerId() {
        var public_followers = $('#public_followers').find('.module_header').attr('href'),
            group_followers = $('#group_followers').find('.module_header').attr('href'),
            followers_url = typeof public_followers !== 'undefined' ? public_followers : group_followers,
            owner_id; // идентификатор пользователя или сообщества

        // идентификатор сообщества в параметре owner_id необходимо указывать со знаком "-"
        owner_id = '-' + Utils.RegEx.extractStringUsingJavaScriptRegEx(followers_url, /\d+/);
        
        return owner_id;
    }
    
    Utils.Chromium.handleMessage(function (request) {
        if (Utils.String.equals(request.method, "wall.get")) {
            var owner_id = getOwnerId(),
                htmlCode = '',
                postIndex,
                post;
            vk.wall_get_all(owner_id, null, null, 0, null, function (posts) {
                for (postIndex = posts.length - 1; postIndex >= 0; postIndex -= 1) {
                    post = posts[postIndex];
                    htmlCode += '<a href="https://vk.com/wall' + String(owner_id) + '_' + String(post.id) + '">' + String(post.id) + "</a><br/>";
                }
                window.open('about:blank').document.write(htmlCode);
            });
        }
    });
    
    window.addEventListener("DOMContentLoaded", function () {
    }, false);

}());

