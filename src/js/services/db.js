(function(ns) {  
  const ITEMS_KEY = 'rssItems';

  function Service(chrome) {
    this.chrome = chrome;
  }

  Service.prototype.getAll = function() {
    var that = this;
    return new Promise(function(resolve, reject) {
      that.chrome.storage.get(ITEMS_KEY, function(items) {
        var lastError = that.chrome.runtime.lastError;
        if (lastError) return reject(lastError);
        resolve(items || {});
      });
    });
  };  

  Service.prototype.save = function(item) {
    var that = this;
    return new Promise(function(resolve, reject) {
      that.getAll(function(items) {
        items[item.id] = item;
        saveItems.call(that, items, resolve, reject);
      }, reject);
    });
  };

  Service.prototype.remove = function(id) {
    var that = this;
    return new Promise(function(resolve, reject) {
      that.getAll(function(items) {
        delete items[id];
        saveItems.call(that, items, resolve, reject);
      }, reject);
    });
  };

  ns.DbService = Service;

  function saveItems(items, resolve, reject) {
    var entireDb = {}
      , that = this;
    entireDb[ITEMS_KEY] = items;
    this.chrome.storage.set(entireDb, function() {
      var lastError = that.chrome.runtime.lastError;
      if (lastError) return reject(lastError);
      resolve();
    });
  }
})(window);