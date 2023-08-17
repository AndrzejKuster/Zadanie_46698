const fs = require('fs');
const path = require('path');
let pathToData = path.join(__dirname, 'data', 'users.txt');
let pathToResult = path.join(__dirname);

function readJSONFile() {
    fs.readFile(pathToData, 'utf-8', function (err, data) {

        let users = JSON.parse(data);

        // console.log(users);

        for (let user of users) {
            saveData(pathToResult, 'result5', true, user);
            // console.log(user.id)
        }
    })
}

function saveData(pathToResult, resultFolderName, overwrite, user) {

    fs.readdir(pathToResult + '\\' + resultFolderName, function (err, files) {
        if (err) {
            console.log("pierwzy error -> " + err);
            if (err.code === 'ENOENT')
                console.log("bede tworzyc folder "+resultFolderName)
            fs.mkdir((pathToResult, resultFolderName), function (err) {
                console.log("chyba stworzylem folder" + err);
                if (err) {
                    if (err.code === 'EEXIST') {
                        console.log("Folder już istnieje!");
                        if (files != null && overwrite) {
                            console.log("bede nadpisywac!!!!!");
                            let template = 'Name: ' + user.firstName + '\n'
                                + 'Surname: ' + user.lastName + '\n'
                                + 'Street: ' + user.street + '\n'
                                + 'Zip Code: ' + user.zipcode + '\n'
                                + 'City: ' + user.city + '\n'
                                + 'Phone: ' + user.phone;

                            fs.writeFile((pathToResult + '\\' + resultFolderName + '\\' + user.id + '-' + user.firstName + '-' + user.lastName), template, function (err) {
                                // console.log("jestem1"+ pathToResult+'\\'+ resultFolderName);
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
                        } else {
                            console.log("nie bede nadpisywal bo jest false!")
                            return;
                        }

                    }
                    console.log(err);
                } else {
                    console.log("folder utworzony");
                    let template = 'Name: ' + user.firstName + '\n'
                        + 'Surname: ' + user.lastName + '\n'
                        + 'Street: ' + user.street + '\n'
                        + 'Zip Code: ' + user.zipcode + '\n'
                        + 'City: ' + user.city + '\n'
                        + 'Phone: ' + user.phone;

                    fs.writeFile((pathToResult + '\\' + resultFolderName + '\\' + user.id + '-' + user.firstName + '-' + user.lastName), template, function (err) {
                        // console.log("jestem1"+ pathToResult+'\\'+ resultFolderName);
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
                }
            })

        } else {
            console.log("takie pliki tu są: " + files);
            // return;
            let template = 'Name: ' + user.firstName + '\n'
                + 'Surname: ' + user.lastName + '\n'
                + 'Street: ' + user.street + '\n'
                + 'Zip Code: ' + user.zipcode + '\n'
                + 'City: ' + user.city + '\n'
                + 'Phone: ' + user.phone;

            fs.writeFile((pathToResult + '\\' + resultFolderName + '\\' + user.id + '-' + user.firstName + '-' + user.lastName), template, function (err) {
                // console.log("jestem1"+ pathToResult+'\\'+ resultFolderName);
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
        }
    })



}

module.exports = {
    readJSONFile: readJSONFile,
    saveData: saveData
};