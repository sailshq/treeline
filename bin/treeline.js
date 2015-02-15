#!/usr/bin/env node

/**
 * Module dependencies
 */

var util = require('util');
var program = require('commander');
var chalk = require('chalk');
var _ = require('lodash');


var VERSION = require('../package.json').version;



program
.version(VERSION)
// Allow unknown options.
.unknownOption = function NOOP(){};
program.usage(chalk.gray('[options]')+' '+chalk.bold('<command>'))
.command('browse', 'view on treeline.io')
.command('preview', 'run app locally (like sails lift)')
.command('deploy', 'deploy app to hosting environment')
.command('login', 'log in to Treeline on this computer')
.command('logout', 'log out of Treeline on this computer')
.command('whoami', 'show the username of the logged-in Treeline account')
.command('about', 'about this module')
.parse(process.argv);


// When `treeline help` is called, `program.help()` is triggered automatically by commander.
// To trigger `help` manually:
// program.outputHelp();


// $ treeline
//
// (i.e. with no CLI arguments...)
if (program.args.length === 0) {
  return _alias('about');
}


// $ treeline <command>
//
// (i.e. matched one of the overtly exposed commands)
var matchedCommand = !!program.runningCommand;
if (matchedCommand){
  return;
}


// $ treeline <alias>
//
// (i.e. check aliases, since wasn't matched by any overtly exposed commands)
if (program.args[0] === 'start' || program.args[0] === 'lift') {
  return _alias('preview');
}
// ...


// $ treeline <*>
//
// (i.e. final handler)
(function unknownCommand(){

  // Display usage (i.e. "help"):
  program.outputHelp();
})();












/**
 * Helper fn
 * @param  {String} aliasFor [string command to redirect to]
 */
function _alias (aliasFor){
  process.argv.splice(process.argv.indexOf(program.args[0]),1);
  require('./treeline-'+aliasFor);
}