'use strict';
const mysql = require('mysql');

const CURRICULUM_QUERY =
    `SELECT id, module_name, description, seq_number, added_on, module_img, default_duration, git_url, git_owner
    ORDER BY seq_number`;

const TIME_LINE_FOR_GROUP_QUERY =
    `SELECT groups.group_name,
        running_modules.starting_on,
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
    ORDER BY running_modules.starting_on`;

const ADD_MODULE_QUERY = `INSERT INTO modules SET ?`;
const UPDATE_MODULE_QUERY = `UPDATE modules SET ? WHERE id = ?`;
const DELETE_MODULE_QUERY = `DELETE FROM modules WHERE id = ?`;

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

function getCurriculum() {
    return execQuery(CURRICULUM_QUERY)
        .then(rows => {
            let results = [];
            // convert rows into array of modules
            return results;
        });
}

// user story 1
function getTimelineForGroup(id) {
    return execQuery(TIME_LINE_FOR_GROUP_QUERY, [id])
        .then(rows => {
            let results = [];
            // convert rows into array of data timeline object
            return results;
        });
}

function addModule(module) {
    return execQuery(ADD_MODULE_QUERY, module);
}

function updateModule(module, id) {
    return execQuery(UPDATE_MODULE_QUERY, [module, id]);
}

function deleteModule(id) {
    return execQuery(DELETE_MODULE_QUERY, [id]);
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
    getCurriculum,
    getTimelineForGroup,
    addModule,
    updateModule,
    deleteModule
}