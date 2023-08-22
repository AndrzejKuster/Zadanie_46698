const fs = require('fs');
const path = require('path');
let pathToData = path.join(__dirname, 'data', 'users.txt');
let pathToResult = path.join(__dirname);

function readJSONFile() {
    fs.readFile(pathToData, 'utf-8', function (err, data) {

        let users = JSON.parse(data);

        for (let user of users) {
            saveData(pathToResult, 'result5', true, user);
        }
    })
}

function saveData(pathToResult, resultFolderName, overwrite, user) {

    fs.readdir(pathToResult + '\\' + resultFolderName, function (err, files) {
        if (err) {
            console.log(err);
            fs.mkdir((pathToResult, resultFolderName), function (err) {
                if (err) {
                    console.log(err);
                }
            })
        } else {
            console.log("no err");
        }

        let template = 'Name: ' + user.firstName + '\n'
            + 'Surname: ' + user.lastName + '\n'
            + 'Street: ' + user.street + '\n'
            + 'Zip Code: ' + user.zipcode + '\n'
            + 'City: ' + user.city + '\n'
            + 'Phone: ' + user.phone;

        const filePath = pathToResult + '\\' + resultFolderName + '\\' + user.id + '-' + user.firstName + '-' + user.lastName;

        const exists = fs.existsSync(filePath);

        if (exists) {
            if (overwrite) {
                console.log("będę nadpisywał!");
                fs.writeFile(filePath, template, function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Plik utworzony");
                    }
                });
            }
        } else {
            fs.writeFile(filePath, template, function (err) {
                
                if (err) {
                    console.log(err);
                } else {
                    console.log("Plik utworzony");
                }
            });
        }

        fs.writeFile(filePath, template, function (err) {
            if (err) {
                if (err.code === 'EEXIST') {
                    console.log("Plik już istnieje!");
                    return;
                }
                console.log(err);
            } else {
                console.log("Plik utworzony");
            }
        });
    })
}

module.exports = {
    readJSONFile: readJSONFile,
    saveData: saveData
};