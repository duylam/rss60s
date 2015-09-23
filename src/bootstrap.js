chrome.browserAction.onClicked.addListener(function(tab) {  
  // did this extension load before ?
  chrome.tabs.executeScript(tab.id, { code: "window.RSS60S;"  }, function(results) {
    var bluNamespace = results[0]
      , tabId = tab.id;
    if (bluNamespace) {
      // the panel was loaded before, tell it to show up
      chrome.tabs.sendMessage(tabId, { type: 'appear' });
    } else {
      // it isn't loaded, inject our code to load it
      chrome.tabs.insertCSS(tabId, { file: "css/main.css" }, function() {
        chrome.tabs.executeScript(tabId, { file: 'js/main.js' });        
      });
    }
  });
})
