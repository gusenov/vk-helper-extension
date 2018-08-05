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
		"images/icons.iconarchive.com/icons/icons8/windows-8/16/Social-Networks-Vkontakte-icon.png" \
		"images/icons.iconarchive.com/icons/icons8/windows-8/24/Social-Networks-Vkontakte-icon.png" \
		"images/icons.iconarchive.com/icons/icons8/windows-8/32/Social-Networks-Vkontakte-icon.png" \
		"images/icons.iconarchive.com/icons/icons8/windows-8/48/Social-Networks-Vkontakte-icon.png" \
		"images/icons.iconarchive.com/icons/icons8/windows-8/64/Social-Networks-Vkontakte-icon.png" \
		"images/icons.iconarchive.com/icons/icons8/windows-8/72/Social-Networks-Vkontakte-icon.png" \
		"images/icons.iconarchive.com/icons/icons8/windows-8/96/Social-Networks-Vkontakte-icon.png" \
		"images/icons.iconarchive.com/icons/icons8/windows-8/128/Social-Networks-Vkontakte-icon.png" \
		"images/icons.iconarchive.com/icons/icons8/windows-8/256/Social-Networks-Vkontakte-icon.png" \
		"images/icons.iconarchive.com/icons/icons8/windows-8/512/Social-Networks-Vkontakte-icon.png" \
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
