/*jslint
    nomen: true,
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
    SeqExec
*/

var VK = (function () {
    "use strict";
    
    function VK(access_token) {
        this.access_token = access_token;
    }
    
    VK.prototype.wall_get = function (owner_id, domain, offset, count, filter, extended, fields, success) {
        var data = {};
        
        data.access_token = this.access_token;
        
        if (typeof owner_id !== 'undefined' && owner_id !== null) { data.owner_id = owner_id; }
        if (typeof domain !== 'undefined' && domain !== null) { data.domain = domain; }
        if (typeof offset !== 'undefined' && offset !== null) { data.offset = offset; }
        if (typeof count !== 'undefined' && count !== null) { data.count = count; }
        if (typeof filter !== 'undefined' && filter !== null) { data.filter = filter; }
        if (typeof extended !== 'undefined' && extended !== null) { data.extended = extended; }
        if (typeof fields !== 'undefined' && fields !== null) { data.fields = fields; }
        
        $.ajax({
            'url' : 'https://api.vk.com/method/wall.get',
            'type' : 'GET',
            'data' : data,
            'success' : function (data) {
                success(data);
            }
        });
    };
    
    VK.prototype.wall_get_all = function (owner_id, domain, filter, extended, fields, onCompleted) {
        var allPosts = [],
            offset = 0;
        
        this.wall_get(owner_id, domain, offset, 100, filter, extended, fields, function (firstData) {
            var lastData = [],
                numberOfPosts = firstData.response[0],
                i;

            for (i = 1; i < firstData.response.length; i += 1) {
                allPosts.push(firstData.response[i]);
            }

            SeqExec.loop(function loopBody(cont) {
                this.wall_get(owner_id, domain, offset, 100, filter, extended, fields, function (data) {
                    lastData = data.response;
                    for (i = 1; i < lastData.length; i += 1) {
                        allPosts.push(lastData[i]);
                    }
                    offset += lastData.length - 1;
                    cont(); // continue
                });

            }.bind(this), function stopCondition() {
                if (lastData.length === 1) {
                    onCompleted(allPosts);
                    return true;
                } else {
                    return false;
                }
            });

        }.bind(this));
    };
    
    return VK;
}());

window.VK = VK;