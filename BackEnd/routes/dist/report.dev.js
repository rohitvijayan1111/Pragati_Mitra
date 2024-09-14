"use strict";

var express = require('express');

var router = express.Router();

var db = require('../config/db');

var util = require('util');

var PDFDocument = require('pdfkit');

var _require = require('stream'),
    PassThrough = _require.PassThrough; // Utility function to get friendly error messages


var getFriendlyErrorMessage = function getFriendlyErrorMessage(errCode) {
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
}; // Convert db.query to a promise-based function


var query = util.promisify(db.query).bind(db);
router.get('/tables', function _callee(req, res) {
  var results, tables;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'rmkec'"));

        case 3:
          results = _context.sent;

          if (results.length) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", res.status(404).json({
            message: 'No tables found in the specified schema.'
          }));

        case 6:
          tables = results.map(function (row) {
            return row.TABLE_NAME;
          });
          res.json(tables);
          _context.next = 14;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          console.error('Error fetching tables:', _context.t0);
          res.status(500).send(getFriendlyErrorMessage(_context.t0.code));

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
}); // Route to fetch column names for a specific table

router.get('/columns/:table', function _callee2(req, res) {
  var table, results, columns;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          table = req.params.table;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(query("SELECT column_name FROM information_schema.columns WHERE table_name = ? AND table_schema = 'rmkec'", [table]));

        case 4:
          results = _context2.sent;
          columns = results.map(function (row) {
            return row.COLUMN_NAME;
          });
          res.json(columns);
          _context2.next = 13;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](1);
          console.error('Error fetching columns:', _context2.t0);
          res.status(500).send(getFriendlyErrorMessage(_context2.t0.code));

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
router.post('/data', function _callee3(req, res) {
  var _req$body, tables, filters, results, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, table, sql, rows;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$body = req.body, tables = _req$body.tables, filters = _req$body.filters;
          _context3.prev = 1;
          results = [];
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context3.prev = 6;
          _iterator = tables[Symbol.iterator]();

        case 8:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context3.next = 20;
            break;
          }

          table = _step.value;
          // Escape column names with backticks
          sql = "SELECT ".concat(table.columns.map(function (col) {
            return "`".concat(col, "`");
          }).join(', '), " FROM `").concat(table.name, "` WHERE 1=1");

          if (filters.dateRange && filters.dateColumn) {
            sql += " AND `".concat(filters.dateColumn, "` BETWEEN '").concat(filters.dateRange.start, "' AND '").concat(filters.dateRange.end, "'");
          }

          if (filters.limit) {
            sql += " LIMIT ".concat(filters.limit);
          }

          _context3.next = 15;
          return regeneratorRuntime.awrap(query(sql));

        case 15:
          rows = _context3.sent;
          results.push({
            table: table.name,
            columns: table.columns,
            data: rows
          });

        case 17:
          _iteratorNormalCompletion = true;
          _context3.next = 8;
          break;

        case 20:
          _context3.next = 26;
          break;

        case 22:
          _context3.prev = 22;
          _context3.t0 = _context3["catch"](6);
          _didIteratorError = true;
          _iteratorError = _context3.t0;

        case 26:
          _context3.prev = 26;
          _context3.prev = 27;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 29:
          _context3.prev = 29;

          if (!_didIteratorError) {
            _context3.next = 32;
            break;
          }

          throw _iteratorError;

        case 32:
          return _context3.finish(29);

        case 33:
          return _context3.finish(26);

        case 34:
          res.json(results);
          _context3.next = 41;
          break;

        case 37:
          _context3.prev = 37;
          _context3.t1 = _context3["catch"](1);
          console.error('Error fetching data:', _context3.t1);
          res.status(500).send('Error fetching data.');

        case 41:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 37], [6, 22, 26, 34], [27,, 29, 33]]);
});
module.exports = router;