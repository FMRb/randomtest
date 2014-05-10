/**
 * NOT USING DATABASE:
 *  Create a new object as a table for the database
 */
var publishData = require("./publishData");
//CONSTRUCTOR
var PublishItem = function (publishItem){
    this.publishItem = publishItem;
    /*
    this.id = id;
    this.content = {};
    this.tags = [];
    this.status = status;
    this.channels = [];
    this.scheduled = scheduled;
    this.geo = {};
    //Init geo
    var geo = this.geo;
    geo.countries = [];
    geo.languages = [];
    geo.cities = [];
    geo.regions = [];
    */
}

/**
 * Add the content to the publish item
 * @param {String} message
 * @param {String} id
 * @param {String} network
 * @param {String} postType
 * @param {String} media
 * @param {String} url
 *
 * @return
 */
PublishItem.prototype.addContent = function(message, id, network, postType, fileName, url){
    var content = this.content;
    content.message = message;
    content.id = id;
    content.network = network;
    content.postType = postType;
    content.media = {fileName:fileName, url:url};
};

/**
 * Add tag to list of tags
 * @param {Array} listTags
 *
 * @return
 */
PublishItem.prototype.addTags = function(tag) {
    this.tags.push(tag);

};

/**
 * Add name and id to the channels list
 * @param {Array} listChannels
 *
 * @return
 */
PublishItem.prototype.addChannel = function(name, id) {
    var channels = this.channels;
    channels.push({name:name,id:id});
};


/**
 * Add the country to the geo fild
 * @param {String} value
 * @param {Number} key
 *
 */
PublishItem.prototype.addGeoCountry = function(value, key) {
  this.geo.countries.push({value:value,key:key});
};

/**
 * Add the Language to the geo fild
 * @param {String} value
 * @param {Number} key
 *
 */
PublishItem.prototype.addGeoLanguage = function(value, key) {
  this.geo.languages.push({value:value, key:key});
};

/**
 * Add the Cities to the geo fild
 * @param {String} value
 * @param {Number} key
 *
 */
PublishItem.prototype.addGeoCities = function(value, key) {
  this.geo.cities.push({value:value, key:key});
};

/**
 * Add the Regions to the geo fild
 * @param {String} value
 * @param {Number} key
 *
 */
PublishItem.prototype.addGeoRegions = function(value, key) {
  this.geo.regions.push({value:value, key:key});
};


PublishItem.prototype.getData = function() {
    return publishData;
};
PublishItem.prototype.save = function() {
    /*
    var jsonSave = {};
    jsonSave.id = this.id;
    jsonSave.content = this.content;
    jsonSave.tags = this.tags;
    jsonSave.status = this.status;
    jsonSave.channels = this.channels;
    jsonSave.scheduled = this.scheduled;
    jsonSave.geo = this.geo;
    */
    publishData.push(this.publishItem);
};

module.exports = PublishItem;
