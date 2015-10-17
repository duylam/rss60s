angular
  .module("rss24h")
  .value("ChromeStorage", chrome.storage)
  .service("network", ["$http", window.NetworkService])
  .service("db", ["ChromeStorage", window.DbService]);
