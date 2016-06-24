"use strict";

//------------------------------------------------------------------------------
// Helper Functions
//------------------------------------------------------------------------------

/**
 * Returns the severity of warning or error
 * @param {object} message message object to examine
 * @returns {string} severity level
 * @private
 */
function getMessageType(message) {
    if (message.fatal || message.severity === 2) {
        return "error";
    } else {
        return "warning";
    }
}

/**
 * Returns the escaped value for a character
 * @param {string} s string to examine
 * @returns {string} severity level
 * @private
 */
function xmlEscape(s) {
    return ("" + s).replace(/[<>&"']/g, function(c) {
        switch (c) {
            case "<":
                return "&lt;";
            case ">":
                return "&gt;";
            case "&":
                return "&amp;";
            case "\"":
                return "&quot;";
            case "'":
                return "&apos;";
            default:
                throw new Error("unreachable");
        }
    });
}

/**
 * Returns the absolute filepath with the proejct directory changed
 * @param {string} absPath original absolute filepath
 * @returns {string} modified absolute filepath
 * @private
 */
function replacedPath(absPath) {
    var oldDir = process.env.CHECKSTYLE_OLD_PROJECT_DIR;
    var newDir = process.env.CHECKSTYLE_NEW_PROJECT_DIR;

    if (typeof oldDir === 'undefined' || typeof newDir === 'undefined') {
        return absPath;
    }
    return absPath.replace(oldDir, newDir);
}

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

module.exports = function(results) {

    var output = "";

    output += "<?xml version=\"1.0\" encoding=\"utf-8\"?>";
    output += "<checkstyle version=\"4.3\">";

    results.forEach(function(result) {
        var messages = result.messages;

        output += "<file name=\"" + xmlEscape(replacedPath(result.filePath)) + "\">";

        messages.forEach(function(message) {
            output += "<error line=\""     + xmlEscape(message.line) + "\" " +
                             "column=\""   + xmlEscape(message.column) + "\" " +
                             "severity=\"" + xmlEscape(getMessageType(message)) + "\" " +
                             "message=\""  + xmlEscape(message.message) +
                                             (message.ruleId
                                              ? xmlEscape(" (" + message.ruleId + ") http://eslint.org/docs/rules/" + message.ruleId)
                                              : "") + "\" " +
                             "source=\""   + (message.ruleId
                                              ? xmlEscape("eslint.rules." + message.ruleId)
                                              : "") + "\"" +
                      "/>";
        });

        output += "</file>";

    });

    output += "</checkstyle>";

    return output;
};
