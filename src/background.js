chrome.browserAction.onClicked.addListener(function (tab) { //Fired when User Clicks ICON
    if (tab.url.indexOf("http://www.pinkoi.com/panel/order") != -1) { // Inspect whether the place where user clicked matches with our list of URL
        chrome.tabs.executeScript(tab.id, {"file": "content.js"}, function () { 
        	alert('Pinkoi 的訂單資料，已經放入剪貼簿了');
        });
    }
});