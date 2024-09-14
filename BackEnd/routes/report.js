const express = require('express');
const router = express.Router();
const db = require('../config/db');
const util = require('util');
const PDFDocument = require('pdfkit');
const { PassThrough } = require('stream');

// Utility function to get friendly error messages
const getFriendlyErrorMessage = (errCode) => {
    switch (errCode) {
        case 'ER_NO_SUCH_TABLE':
            return "Table does not exist.";
        case 'ER_DUP_ENTRY':
            return "Duplicate entry for a key.";
        case 'ER_BAD_FIELD_ERROR':
            return "Unknown column.";
        case 'ER_PARSE_ERROR':
            return "Error in SQL syntax.";
        case 'ER_NO_REFERENCED_ROW_2':
            return "Referenced entry does not exist.";
        case 'ER_ROW_IS_REFERENCED_2':
            return "Cannot delete or update a parent row: a foreign key constraint fails.";
        case 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD':
            return "Incorrect value for a field.";
        case 'ER_DATA_TOO_LONG':
            return "Data too long for column.";
        case 'ER_ACCESS_DENIED_ERROR':
            return "Access denied for user.";
        case 'ER_NOT_SUPPORTED_YET':
            return "Feature not supported yet.";
        case 'ER_WRONG_VALUE_COUNT_ON_ROW':
            return "Incorrect number of values.";
        default:
            return "An unknown error occurred.";
    }
};

// Convert db.query to a promise-based function
const query = util.promisify(db.query).bind(db);
router.get('/tables', async (req, res) => {
    try {
        const results = await query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'rmkec'");
        if (!results.length) {
            return res.status(404).json({ message: 'No tables found in the specified schema.' });
        }
        const tables = results.map(row => row.TABLE_NAME);
        res.json(tables);
    } catch (err) {
        console.error('Error fetching tables:', err);
        res.status(500).send(getFriendlyErrorMessage(err.code));
    }
});


// Route to fetch column names for a specific table
router.get('/columns/:table', async (req, res) => {
    const table = req.params.table;
    try {
        const results = await query("SELECT column_name FROM information_schema.columns WHERE table_name = ? AND table_schema = 'rmkec'", [table]);
        const columns = results.map(row => row.COLUMN_NAME);
        res.json(columns);
    } catch (err) {
        console.error('Error fetching columns:', err);
        res.status(500).send(getFriendlyErrorMessage(err.code));
    }
});


router.post('/data', async (req, res) => {
    const { tables, filters } = req.body;

    try {
        let results = [];
        for (let table of tables) {
            // Escape column names with backticks
            let sql = `SELECT ${table.columns.map(col => `\`${col}\``).join(', ')} FROM \`${table.name}\` WHERE 1=1`;

            if (filters.dateRange && filters.dateColumn) {
                sql += ` AND \`${filters.dateColumn}\` BETWEEN '${filters.dateRange.start}' AND '${filters.dateRange.end}'`;
            }

            if (filters.limit) {
                sql += ` LIMIT ${filters.limit}`;
            }

            const rows = await query(sql);
            results.push({ table: table.name, columns: table.columns, data: rows });
        }

        res.json(results);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Error fetching data.');
    }
});


module.exports = router;
