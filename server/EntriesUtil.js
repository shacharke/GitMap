const fs            = require('fs');
const GitExecUtil   = require('./GitExecUtil');


function EntriesUtil() {}

EntriesUtil.addNewEntries = function (file, newEntries) {
    fs.readFile(file, 'utf8', function (err, data) {
        if (err) return console.log(err);

        var geoJson = JSON.parse(data);
        var existingEntries = geoJson.features;

        while (newEntries.length > 0){
            var newEntry = newEntries.pop();
            if (existingEntries.length >= 100) {
                existingEntries.shift();
            }
            existingEntries.push(newEntry);
        }

        var geoJsonAsString = JSON.stringify(geoJson, null, 4);
        fs.writeFile(file, geoJsonAsString, 'utf8', function (err) {
            if (err) return console.log(err);

            GitExecUtil.commitData("", file, "Api server adding new entries");

        });
    });
};

module.exports = EntriesUtil;