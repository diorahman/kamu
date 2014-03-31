/**
 * Module dependencies.
 */
var util = require('util')
  , OpenIDStrategy = require('passport-openid').Strategy;

/**
 * The strategy
 */
function Strategy(options, validate) {
  options = options || {};
  options.providerURL = options.providerURL || 'https://aku.blankonlinux.or.id/o';
  options.profile =  (options.profile === undefined) ? true : options.profile;

  OpenIDStrategy.call(this, options, validate);
  this.name = 'aku';
}

/**
 * Inherit from `OpenIDStrategy`.
 */
util.inherits(Strategy, OpenIDStrategy);


/**
 * Expose `Strategy`.
 */ 
module.exports = Strategy;