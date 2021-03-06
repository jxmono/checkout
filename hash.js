var crypto = require('crypto');

/////////////////////////////////////
//  Sign
/////////////////////////////////////
exports.sign = function (obj, pass) {

    // uppercase object
    var uObj = {};

    if (!obj || !pass) {
        return null;
    }

    // keys to uppercase
    for (var key in obj) {
        var value = obj[key];
        if (["string", "number", "boolean"].indexOf(typeof value) === -1) {
            continue;
        }
        uObj[key.toUpperCase()] = value;
    }

    // sort array of keys alphabetically
    var keys = Object.keys(uObj);
    keys.sort();

    // create the text
    var text = "";
    for (var i in keys) {
        var value = uObj[keys[i]];
        if (value) {
            text += keys[i] + "=" + value + pass;
        }
    }

    // create the hash to upper case
    uObj.SHASIGN = crypto.createHash("sha1").update(text, "utf8").digest("hex").toUpperCase();

    return uObj;
};

