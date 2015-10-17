angular
  .module("rss24h")
  .value("chrome", chrome)
  .service("network", ["$http", window.NetworkService])
  .service("db", ["chrome", window.DbService]);
