#!/bin/bash

#set -x  # echo on

# Usage:
#  $ "./scripts/build.sh"

version=$(jq --raw-output '.version' manifest.json)
newVersion=$(./scripts/increment_version.sh $version)
jq ".version = \"$newVersion\"" manifest.json | sponge manifest.json

release="./build/VKHelper-$newVersion.zip"

if [ ! -f $release ]; then
    :
else
    rm $release
fi

zip --quiet -r $release \
                "images/icons.iconarchive.com/icons/limav/flat-gradient-social/16/Vk-icon.png" \
                "images/icons.iconarchive.com/icons/limav/flat-gradient-social/24/Vk-icon.png" \
                "images/icons.iconarchive.com/icons/limav/flat-gradient-social/32/Vk-icon.png" \
                "images/icons.iconarchive.com/icons/limav/flat-gradient-social/48/Vk-icon.png" \
                "images/icons.iconarchive.com/icons/limav/flat-gradient-social/64/Vk-icon.png" \
                "images/icons.iconarchive.com/icons/limav/flat-gradient-social/72/Vk-icon.png" \
                "images/icons.iconarchive.com/icons/limav/flat-gradient-social/96/Vk-icon.png" \
                "images/icons.iconarchive.com/icons/limav/flat-gradient-social/128/Vk-icon.png" \
                "node_modules/utils4js/utils.js" \
                "node_modules/seq-exec/seq-exec.js" \
                "html/background.html" \
                "js/background.js" \
                "js/jquery-3.2.1.js" \
                "manifest.json" \
                "html/options.html" \
                "js/options.js" \
                "js/vk-com.js" \
                "js/VK.js"

echo $release
