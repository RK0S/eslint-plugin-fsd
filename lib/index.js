/**
 * @fileoverview Plugin for fsd
 * @author Roman
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------
const requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------
module.exports.rules = requireIndex(__dirname + "/rules");



