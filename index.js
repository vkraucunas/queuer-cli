#!/usr/bin/env node
/*jslint node: true */
'use strict';
var queuerCLI = require('./src/app.js').app;
var program = require('commander');

program
    .usage('[options] <task> [otherTasks...]')
    .option('-f, --file <filepath>', 'The file to store tasks in')
    .option('-l, --list', 'List Tasks')
    .option('-o, --order', 'Order Tasks')
    .parse(process.argv);

queuerCLI(program.file, program.list, program.order, program.args);
