/*jslint node: true */
'use strict';
var fs = require('fs');
var prompts = require('./prompts');

const dataTemplate = {
    initialized: new Date(),
    tasks:[]
};

function doesFileExist(path) {
    if (!path) {
        throw new Error('Undefined filepath');
    }

    return new Promise((resolve, reject) => {
        fs.access(path, fs.constants.R_OK | fs.constants.W_OK, (err) => {
            if (err) {
                return resolve(dataTemplate);
            }

            fs.readFile(path, 'utf8', function(err, contents) {
                if (err) {
                    throw new Error(err);
                }

                resolve(JSON.parse(contents));
            });
        });
    })

}

function addNewTasks(data, tasks) {
    return new Promise((resolve, reject) => {
        let result = data
        tasks.map(task => {
            result.tasks.push(task);
        });
        resolve(result);
    })
}

function listTasks(data) {
    return data.tasks.map(x => console.log(x));
}

function processNewTasks(data, tasks) {
    return new Promise((resolve, reject) => {
        if(!tasks && !tasks.length) { return resolve(data); }

        return resolve(addNewTasks(data, tasks));
    });
}

function writeDataToFile(filepath, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filepath, JSON.stringify(data), function (err) {
            if (err) {throw new Error(err);}
            return resolve(data);
        });
    });
}

function orderTasks(data) {
    return new Promise((resolve, reject) => {
        console.log(data);
        console.log('Ordering enabled');
        //do shit here
        //resolve(results);
    });
}
function app(filepath, listOut, isComparing, tasks) {
    doesFileExist(filepath).then(data => {
        if(!isComparing) {
            processNewTasks(data, tasks)
                .then(dataToWrite => {
                    writeDataToFile(filepath, dataToWrite)
                        .then(writtenData => {
                            if(listOut) {listTasks(writtenData);}
                        })});
        } else {
            orderTasks(data);
        }
    })
    .catch(err => {
        console.log(err);
    });
}



exports.app = app;
