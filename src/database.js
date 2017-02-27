'use strict';
const mysql = require('mysql');

const TIME_LINE_FOR_GROUP_CMD =
    `SELECT groups.group_name,
        running_modules.starting_date,
        running_modules.scheduled_end,
        running_modules.finished,
        modules.module_name,
        modules.module_img,
        modules.git_url,
        modules.git_repo
    FROM groups
    INNER JOIN running_modules ON running_modules.group_id = groups.id
    INNER JOIN modules ON running_modules.module_id = modules.id
    WHERE groups.id = ?
    ORDER BY running_modules.starting_on
    `;

let connection;
let databaseOpened = false;

function openDatabase(dbname, password) {
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'hyfer-test',
        password: 'hyfer',
        database: 'hyfer'
    });
    return connectToDatabase();
    // .then(() => createTables());
}

function connectToDatabase() {
    return new Promise((resolve, reject) => {
        connection.connect(err => {
            if (err) {
                console.log('Could not connect to MySQL database...');
                reject(err);
            } else {
                console.log('Connected to MySQL database...');
                databaseOpened = true;
                resolve();
            }
        });
    });
}

function getConnection() {
    return connection;
}

// user story 1
function getTimelineForGroup(id) {
    return execQuery(TIME_LINE_FOR_GROUP_CMD, [id])
        .then(rows => {
            let results = [];
            // convert rows into array of data timeline object
            return results;
        });
}

function execQuery(sql, args = []) {
    return new Promise((resolve, reject) => {
        connection.query(sql, args, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

module.exports = {
    openDatabase,
    getConnection,
    getTimelineForGroup
}