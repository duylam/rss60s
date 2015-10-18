(function(ns) {  
  const ITEMS_KEY = 'rssItems';

  function Service(chrome) {
    this.chrome = chrome;
  }

  Service.prototype.getAll = function() {
    var that = this;
    return new Promise(function(resolve, reject) {
      getRawRssItems.call(that, function(objectItems) {
        resolve(_.values(objectItems));
      }, reject);
    });
  };  

  Service.prototype.save = function(item) {
    var that = this;
    return new Promise(function(resolve, reject) {
      getRawRssItems.call(that, function(objectItems) {
        objectItems['field' + item.id] = _.pick(item, 'id', 'name', 'url');
        saveItems.call(that, objectItems, resolve, reject);
      }, reject);
    });
  };

  Service.prototype.remove = function(id) {
    var that = this;
    return new Promise(function(resolve, reject) {
      getRawRssItems.call(that, function(objectItems) {
        delete objectItems['field' + id];
        saveItems.call(that, objectItems, resolve, reject);
      }, reject);
    });
  };

  ns.DbService = Service;

  function saveItems(itemsBag, resolve, reject) {
    var entireDb = {}
      , that = this;
    entireDb[ITEMS_KEY] = itemsBag;
    this.chrome.storage.local.set(entireDb, function() {
      var lastError = that.chrome.runtime.lastError;
      if (lastError) return reject(lastError);
      resolve();
    });
  }

  function getRawRssItems(resolve, reject) {
    var that = this;
    this.chrome.storage.local.get(ITEMS_KEY, function(objectItems) {
      var lastError = that.chrome.runtime.lastError;
      if (lastError) return reject(lastError);
      // get() returns an object containing keys given in calling parameters
      // and then we return the value
      resolve((objectItems || {})[ITEMS_KEY] || {});
    });
  }
})(window);