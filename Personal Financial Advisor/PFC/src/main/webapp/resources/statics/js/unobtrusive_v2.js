/**
*    Rabobank Nederland basicomponenten persoonlijk                                                                                                                    
* 	 www.rabobank.nl                                                                                                          
*	 Archive file:      $Archive: /FE 12 (Static Server)/javascript/unobtrusive_v2.js $                      
*	 Last changed by:   $Author: KoppenensJFB $                 
*	 Last checked in:   $Date: 2013-09-27 08:48:52 +0200 (vr, 27 sep 2013) $
*	 Last modified:     $Modtime: 1/06/11 3:52p $
*	 Revision number:   $Revision: 112915 $
*                
*    @class RABO
*    @todo Refactor this class and seperate code blocks into a new classes or modules
*    @type Object                                                                                       
*/
var RABO = {};
RABO.REVISION = '$Revision: 112915 $';
RABO.VERSION = 'maven.header.version';

// Create .util scope:
RABO.util = RABO.util ? RABO.util : {};

//* Include of behavior files ********************************/
//* check for specific local environment settings and handle default value *//

/** Find tge static path 
 * @param [string]	scriptSrc	Script Source of the main include file
 * @returns [string]	path
 */
RABO.util.findStaticHref = function (scriptSrc, scriptDomain, scriptPort)
{
	//We have to make sure, our scriptSrc is without [protocol]://[domain]:[port]:
	scriptSrc = scriptSrc.replace('http://','').replace('https://','').replace(scriptDomain,'').replace(':'+scriptPort,'');
	
	var rb_basep_arr = scriptSrc.split('/');
	var rb_basep = '';
	for (var k=0; k<rb_basep_arr.length; k++)
	{
        if (rb_basep_arr[k] !== '')
		{
			rb_basep += '/'+rb_basep_arr[k];
		}
	}
	var rb_basep = rb_basep.replace('/unobtrusive_v2.js','');
	
	var urlSplit = location.href.replace('http://','').replace('https://','').split('/');
	var firstPath = urlSplit[1];
	if (firstPath == 'klanten' || firstPath == 'klanten-t') // Temporary fix when loading bridgefile from old location
	{
		rb_static_base_href = (rb_basep == '/javascript') ? '/'+firstPath+'/static/generic' : rb_basep.replace('/javascript','');
		rb_static_href = firstPath+'/static/';
	} else {	
		rb_static_base_href = (rb_basep == '/javascript') ? '/static/generic' : rb_basep.replace('/javascript','');
		rb_static_href = '';
	}
	
	// Strip first '/':
	if (rb_static_base_href.charAt(0) == '/')
	{
		rb_static_base_href = rb_static_base_href.substring(1);			
	}
	
	// Fix for wrong path to unobtrusive_v2 on secure 
	if (rb_static_base_href.indexOf('generic') == -1)
	{
		rb_static_base_href = rb_static_base_href + '/generic';
	}
	return rb_static_base_href;
}

//resolve environmentpath from first scripttag in pageheader
rb_asctag = document.getElementsByTagName('script');
statpos = '';

if (rb_asctag.length > 0) {
	//check first script tag with non empty source
	var found = false;
	var scriptSrc = "";
	for (var scriptcounter = 0; scriptcounter < rb_asctag.length; scriptcounter++) {
		// "unobtrusive_v2" matched unobtrusive_v2.js and also unobtrusive_v2-base-merged.js:
	   if (!found && rb_asctag[scriptcounter].src.indexOf("unobtrusive_v2") != -1) {
	       scriptSrc = rb_asctag[scriptcounter].src;
	       found = true;
	       break;
	   };
	};
	
	rb_static_base_href = RABO.util.findStaticHref(scriptSrc, document.domain, window.location.port);
};

//this construction is put here to be able to alter the include path's in a test situation
// This is a two strep process:
// 1. determine the include path of unobtrusive_v2
// 2. alter the include path of scripts, for example with a file:// include
if (typeof(rb_include_base)=='undefined'){
	var rb_include_base = '/' + rb_static_base_href;
} else {
	if (typeof(include_base_postprocessing) == 'function'){
		rb_include_base = include_base_postprocessing(rb_static_base_href);
	};
};

var js_include =  rb_include_base + '/javascript/';
var sizzle_include =  rb_include_base + '/external/sizzle/';
var metrixlab_include =  rb_include_base + '/external/metrixlab/';
var swf_include =  rb_include_base + '/css/images/';
var yahoo_include = rb_include_base + '/external/yahoo/';

//* create stats info *//
var ra_guid = (new Date).getTime();
var b_page_event_send = false; // CHRIS: set to false. prevents mutliple triggers during page load. RFC 5071 

// Create empty function to replace document.writes with:
RABO.foo = function () {
	
}
RABO.write = function(str) {
	document['write'](str);	
}

/**
 * Cookie functions below providing easy access to cookies thru the cookiejar object. Enabling so-called "subcookies" thru the subcookiejar 
 * object.
 * See this related blogpost for more information on how to use these objects:
 * 	<http://www.whatstyle.net/articles/28/subcookies>
 * Check out this other blogpost for information about the new version:
 *  <http://www.whatstyle.net/articles/46/subcookies_v2>
 * based on @link http://www.quirksmode.org/js/cookies.html @author Peter-Paul Koch
 * @author Harmen Janssen <http://www.whatstyle.net>
 * @version 2.0
 * @class
 */

var cookiejar = {
	/** set a cookie 
	 * @param cookieName, cookieValue, days, path 
	 * @returns Boolean
	 */
	bake: function(cookieName,cookieValue,days,path) {
		/** create stats info */
		var ra_guid = (new Date).getTime();			
		var expires='';
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			expires = "; expires="+date.toGMTString();
		}
		
		var thePath = '; path=/';
		if (path) {
			thePath = '; path=' + path;
		}
		
		var hostname = window.location.hostname;
		// exclude ip numbers and subtract subdomain level
		var domain = (hostname.split(".").length<4)? hostname.substring(hostname.indexOf("."),hostname.length): hostname;
		/*if(!cookieValue){
			cookieValue = ra_guid + '|' + (Math.random())+'|'+window.screen.width+"x"+window.screen.height + '|' + window.screen.colorDepth;
		}*/
			
		document.cookie = Sntz(cookieName+"="+cookieValue+expires+";Domain="+domain+thePath);
		return true;
	},
	/** get a cookie value @param cookieName */
	fetch: function(cookieName) {
		var nameEQ = cookieName + '=';
		var ca = document.cookie.split(';');
		for (var i=0; i<ca.length; i++)	{
			var unSntz_data = ca[i];
  		var c = Sntz(unSntz_data);	
			while (c.charAt(0) == ' ') {
				c = c.substring(1, c.length);
			}
			if (c.indexOf(nameEQ) == 0){
				qww = c.substring(nameEQ.length,c.length);			
				var res = qww.match(/[^a-zA-Z0-9_=%-:$|]/); //RFC 4139 removed stray dollar
				if(res!=null){
					return false;
				}
				else{
					return c.substring(nameEQ.length,c.length);
				}
			}
		}
		return null;
	},
	/** delete a cookie @param cookieName */
	crumble: function(cookieName) {
		return cookiejar.bake(cookieName,'',-1);
	}
};

/** circumventing browser restrictions on the number of cookies one can use 
 * @class
 */
var subcookiejar = {
	nameValueSeparator: '=',
	subcookieSeparator: '$$/$$',
	/** set a cookie. subcookieObj is a collection of cookies to be. Every member of subcookieObj is the name of the cookie, its value is the cookie value
	 * @param cookieName, subcookieObj, days, path 
	 * @returns cookie
	 */
	bake: function(cookieName,subcookieObj,days,path) {
		var existingCookie;
		
		var cookieValue = '';
		
		/** check for existing cookie */
		if (existingCookie = subcookiejar.fetcharray (cookieName)) {
			/** if a cookie by the same name is found, 
			 * append its values to the subcookieObj.
			 */			
			for (var i=0,sclen=existingCookie.length; i<sclen; i++)	{
						var sc = existingCookie[i].split(subcookiejar.nameValueSeparator);
						cookieValue += sc[0] + subcookiejar.nameValueSeparator;
						cookieValue += sc[1];
						cookieValue += subcookiejar.subcookieSeparator;
					}			
	
		}		
		if(subcookieObj.length%2==0)
		{
			for (i=0; i<subcookieObj.length; i=i+2)
			{
				cookieValue += subcookieObj[i] + subcookiejar.nameValueSeparator;
				cookieValue += subcookieObj[++i];
				cookieValue += subcookiejar.subcookieSeparator;
			}
		}
		
		/** remove trailing subcookieSeparator */
		cookieValue = cookieValue.substring(0,cookieValue.length-subcookiejar.subcookieSeparator.length);
		return cookiejar.bake(cookieName,cookieValue,days,path);
	},
	/** get a subcookie */
	fetch: function(cookieName,subcookieName) {
		var cookieValue = cookiejar.fetch(cookieName);
		/** proceed only if a cookie was found */
		if (!cookieValue) {
			return null;
		}
		var subcookies = cookieValue.split(subcookiejar.subcookieSeparator);
		var cookieObj = {};
		for (var i=0,sclen=subcookies.length; i<sclen; i++)	{
			var sc = subcookies[i].split(subcookiejar.nameValueSeparator);
			cookieObj [sc[0]] = sc[1];
		}
		/** if subcookieName is given, return that subcookie if available, or null.
		 * else, return the entire cookie as an object literal
		 */
		if (subcookieName != undefined) {
			if (subcookieName in cookieObj) {
				return cookieObj[subcookieName];
			}
			return null;
		}
		return cookieObj;
	},
	/** get a subcookie */
	fetcharray: function(cookieName,subcookieName) {
		var cookieValue = cookiejar.fetch(cookieName);
		/** proceed only if a cookie was found */
		if (!cookieValue) {
			return null;
		}
		var subcookies = cookieValue.split(subcookiejar.subcookieSeparator);
		
		if(!subcookies)
			return null;

		return subcookies;
	},	
	/** delete a subcookie */
	crumble: function(cookieName,subcookieName,days,path) {
		var cookieValue = cookiejar.fetch(cookieName);
		if (!cookieValue && cookieValue!='') {
			return false;
		}
		var newCookieObj = {};
		var subcookies = cookieValue.split(subcookiejar.subcookieSeparator);
		for (var i=0, sclen=subcookies.length; i<sclen; i++)	{
			var sc = subcookies[i].split(subcookiejar.nameValueSeparator);
			if (sc[0] != subcookieName) {
				newCookieObj[sc[0]] = sc[1];
			}
		}
		
		cookieValue = '';
		for (var i in newCookieObj)	{
			cookieValue += i + subcookiejar.nameValueSeparator;
			cookieValue += newCookieObj[i];
			cookieValue += subcookiejar.subcookieSeparator;
		}
		/** remove trailing subcookieSeparator */
		cookieValue = cookieValue.substring(0,cookieValue.length-subcookiejar.subcookieSeparator.length);
		return cookiejar.bake(cookieName,cookieValue,days,path);		
	}
};

/** Perform the redirect for AB testing. Requested in RFC 4943 
* @function: rbcontentvariance
* @methodOf RABO 
*/
function rbcontentvariance() {
    // uncomment the lines starting with "rb_abt" below during development
    // var rb_abt_group = 'inboedel';
    // var rb_abt_route = ['indexA.html', 'indexB.html', 'indexC.html'];

    // only redirect when page wasn't already redirected (thus the query string
    // doesn't contain the "abt" parameter); also check if variants are defined
    if ((location.search.match(/abt=/) == null) && (typeof (rb_abt_route) == 'object') && (typeof (rb_abt_group) == 'string')) {
        var visitorCookie = cookiejar.fetch('RABOBANK_BEZOEK');
        if (visitorCookie) {
            var redirectUrl;
            if (redirectUrl = CalculateABRedirect(visitorCookie, location.href)) {
                // if(console && console.log) {
                //     console.log("Should be replacing content with: " + redirectUrl)
                // }
                location.replace(redirectUrl);
            };
        };
    };
};

/** Determining the correct AB testing redirect Url
*    @function: CalculateABRedirect(visitCookie, currentHref) 
*    @param: visitCookie  : content of the "RABO_BEZOEK" cookie (string)
*    @param: currentHref  : The url of the current location
*    @returns: The complete redirect Url, including query string and bookmarks
*/
function CalculateABRedirect(visitCookie, currentHref) {
    //check input
    if (!visitCookie || visitCookie.length < 2) {
        return false;
    };
    if (typeof(rb_abt_route) == 'undefined' || !rb_abt_route.length){
        return false;
    };
    // use the last two digits of the session cookie RABOBANK_BEZOEK (e.g.
    // rb_bezoeker_1287392435332) and use a modulo of the number of variations
    // to determine which one will be used for redirection
    //nr of variation = nr items in rb_abt_route + 1, since page itself is also counted as variation

    if(rb_abt_random == false || rb_abt_random == 'undefined') {
    	var choice = parseInt(visitCookie.slice(visitCookie.length - 2)) % (rb_abt_route.length + 1);
	} else {
		var abString = currentHref + visitCookie;
		var rndNr = 0; 
		for(o=0;o<abString.length;o++) {
			rndNr += abString.charCodeAt(o); 
		}
		var choice = rndNr % (rb_abt_route.length + 1); 
	}

    // if(console && console.log) {
    //     console.log("Calculated A/B test path is: " + ( choice === 0 ? "A" : "B" ))
    // }

    //default redirect is to page self, for choice=0
    var rdirurl = currentHref;
    var querystring = '?abt=' + rb_abt_group + '|' + (choice + 1);
    var anchor = '';
    var anchorparts = currentHref.split('#');
    if (anchorparts.length > 1) {
        //When anchor is before querystring, adapt query string
        var urlparts = anchorparts[1].split('?');
        if (urlparts.length > 1) {
            querystring = querystring + '&' + urlparts[1];
        };
        anchor = '#' + urlparts[0];
    };
    //check if there was already a querystring before the anchor
    if (anchorparts[0].indexOf("?") != -1) {
        // other params which are already in the url
        var urlparts = anchorparts[0].split('?');
        rdirurl = urlparts[0];
        querystring = querystring + '&' + urlparts[1];
    }
    else {
        rdirurl = anchorparts[0];
    };
    if (choice > 0) {
        // choice = 1,2,3,... is redirect to other page. substrtact 1 since array is zero-based
        rdirurl = rb_abt_route[choice - 1];
    };

    return rdirurl + querystring + anchor;
};


function createCookie(name,days,svalue){
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	} else {
		var expires = "";
	};
	if(readCookie(name) == null){ // cookie doesn't exist
		var hostname = window.location.hostname;
		// exclude ip numbers and subtract subdomain level
		var domain = (hostname.split(".").length<4)? hostname.substring(hostname.indexOf("."),hostname.length): hostname;
		if(!svalue) {
			var value = ra_guid + '|' + (Math.random())+'|'+window.screen.width+"x"+window.screen.height + '|' + window.screen.colorDepth;
		} else {
			var value = svalue;		
		}
		document.cookie = Sntz(name+"="+value+expires+";Domain="+domain+"; path=/");
	};
};

function createPersistantCookie(name,days){
	if (days){
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	} else {
		var expires = "";
	};
	
	cvalue = readCookie(name);
	qvalue = new String(cvalue);
	vcheck = qvalue.indexOf('rb_bezoeker_');
	if (vcheck == '-1') { // cookie doesn't exist
		cvalue = 'rb_bezoeker_'+ra_guid;
	};
	
	var hostname = window.location.hostname;
	// exclude ip numbers and subtract subdomain level
	var domain = (hostname.split(".").length < 4) ? hostname.substring(hostname.indexOf("."), hostname.length) : hostname;

	document.cookie = Sntz(name + "=" + cvalue + expires + ";Domain=" + domain + "; path=/");
};

function readCookie(/**String*/ name){
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++)
	{
  	var unSntz_data = ca[i];
  	var c = Sntz(unSntz_data);	
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0){
			qww = c.substring(nameEQ.length,c.length);			
			var res = qww.match(/[^a-zA-Z0-9_=%-:]/); //RFC 4139 removed stray dollar
			if(res != null) {
				return false;
			} else {
				return c.substring(nameEQ.length,c.length);
			}
		}
	}
	return null;
};

function Sntz(strobj) {
    return strobj.replace(/\r\n/gi, "").replace(/%0d%0a/gi, "").replace(/CRLF/gi, "");
};

// TEST
function supportsSVG() {
	return !! document.createElementNS && !! document.createElementNS('http://www.w3.org/2000/svg','svg').createSVGRect;  
}
if (supportsSVG()) {
    document.documentElement.className += ' svg';
}
// END TEST

// create stats info
rbcontentvariance();
// createCookie("BCA_SESSIE",null);
createPersistantCookie("RABOBANK_BEZOEK",90);

//* create stat request *//
/**
* @memberOf _global_
* @name RABO
* */
var RABO = window.RABO || {};
/**
* @memberOf RABO
* @name widget
* */
RABO.util = RABO.util ? RABO.util : {};

RABO.util.IsEnviromentSecure = function (aValue){
	var regExp = new RegExp("/(klanten-t|klanten)(/|$)", "g");
	var result = false;
	result = regExp.test(aValue);
	return result;
}
//MD13072011 Added klanten-t to check
b_envIsSecure = RABO.util.IsEnviromentSecure(location.pathname);

//this construction is put here to control the inclusion of the lb_mapping_table
// it should be included on the anonymous website
// it should not be included on the secure website and in unittest situations
if (typeof(include_lbmapping)=='undefined'){
	var include_lbmapping = !RABO.util.IsEnviromentSecure(location.pathname);
};


//* preloading swf files *//
RABO.write('<embed src="' + swf_include + 'rabo9.swf" height="1px" width="1px" style="display:none;"></embed>');
RABO.write('<embed src="' + swf_include + 'rabo9_hiq.swf" height="1px" width="1px" style="display:none;"></embed>');

// include Metrixlab popup
/*
var rb_ml_loc_a = location.pathname.split(escape("/particulieren/producten/verzekeren/"));
var rb_ml_loc_b = location.pathname.split(escape("/particulieren/klantenservice/direct_aanvragen/verzekeren/"));
var rb_ml_loc_c = location.pathname.split(escape("/particulieren/klantenservice/verlies_schade_diefstal/schade_melden/"));
var bincml = (rb_ml_loc_a.length > 1 && rb_ml_loc_a[rb_ml_loc_a - 1] != "") || (rb_ml_loc_b.length > 1 && rb_ml_loc_b[rb_ml_loc_b - 1] != "") || (rb_ml_loc_c.length > 1 && rb_ml_loc_c[rb_ml_loc_c - 1] != "");

var ML_img_ServerOnline = new Image();

if (bincml) {
	ML_img_ServerOnline.src = 'https://invitation.opinionbar.com/popups/ServerOnline.gif';
};

ML_img_ServerOnline.onload=ML_ImageLoaded;
ML_img_ServerOnline.onabort=ML_ImageLoaded;
ML_img_ServerOnline.onerror=ML_ImageError;

function ML_ImageAborted() {};
function ML_ImageError() {};
function ML_ImageLoaded() {
    function metrixlab_onready(el, func) {
		this.args = new Array(el, func);
		this.doTry = function() {
			try {
				var el = eval(this.args[0]);
				el.onload = this.args[1];
				el.onload();
				clearInterval(this.args[2]);
			} catch(e) {
			};
		};
		this.doTry.bind = function(object) {
			var method = this;
			return function() {
				method.apply(object);
			};
		};
		this.args[2] = setInterval(this.doTry.bind(this), 250);
		return this;
	};

    new metrixlab_onready("document", function () {
		var metrixlab_body = top.document.getElementsByTagName('body').item(0);
		var metrixlab_script = top.document.createElement('script');
		metrixlab_script.setAttribute('defer', 'defer');
		metrixlab_script.src = '' + metrixlab_include + 'mlab_overlay.js';
		metrixlab_script.type = 'text/javascript';
		metrixlab_body.insertBefore(metrixlab_script, metrixlab_body.childNodes[0]);
    });
};
*/
//Including generic lib Yahoo 2.7 Rabo Specific & NOT FULL
document.write('<script src="' + yahoo_include + 'yahoo_270_full.js" type="text/javascript"></script>');
// include constants:
document.write('<script src="' + js_include + 'constants.js" type="text/javascript"></script>');
// include behaviors
document.write('<script src="' + js_include + 'unobtrusive_behaviors.js" type="text/javascript"></script>');
// include sifr lib
document.write('<script src="' + js_include + 'sifr.js" type="text/javascript"></script>');
// include flash lib
document.write('<script src="' + js_include + 'flashobject.js" type="text/javascript"></script>');
// include unobtrusive lib
document.write('<script src="' + js_include + 'unobtrusive_lib_v2.js" type="text/javascript"></script>');

// include moniforce stat functions
document.write('<script src="' + js_include + 'mfstatsfunc.js" type="text/javascript"></script>');
// include lb mapping tables
//MD13072011 Changed path variable


// include RABO namespace
//document.write('<script src="' + js_include + 'namespace.js" type="text/javascript"></script>');
// include XHR library for webchat module 
//document.write('<script src="' + js_include + 'remote.js" type="text/javascript"></script>');
// include Sizzle selector library 
document.write('<script src="' + sizzle_include + 'sizzle.js" type="text/javascript"></script>');
// set boolean for ie
RABO.write('<!--[if IE 6]><script type="text/javascript">var bIEdetected = true;</script><![endif]-->');
document.write('<script src="' + js_include + 'wa_lib.js" type="text/javascript"></script>');

// LB Mapping table is based on static_href:
if (include_lbmapping){
	document.write('<script src="/' + rb_static_href + 'javascript/lb_mapping_table.js" type="text/javascript"></script>');
}

// include behavioral Targeting base script 
// document.write('<script src="' + js_include + 'behavioral-targeting-global.js" type="text/javascript"></script>');
