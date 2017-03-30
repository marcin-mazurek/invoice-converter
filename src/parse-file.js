const ParsingError = require('./parsing-error');

function getFirstSheet(file) {
  const firstSheetName = file.SheetNames[0];
  if (!firstSheetName) {
    throw new ParsingError('The first sheet not found in the spreadsheet');
  }

  const firstSheet = file.Sheets[firstSheetName];
  if (!firstSheet) {
    throw new ParsingError('The first sheet not found in the spreadsheet');
  }

  return firstSheet;
}

function locateFirstRow(sheet) {
  for (let i = 10; i < 100; i++) {
    const cell = sheet['A' + i];
    const underneathCell = sheet['A' + (i + 1)];

    if (!cell || !underneathCell) {
      continue;
    }

    if (cell.v == 1 && underneathCell.v == 2) {
      return i;
    }
  }

  throw new ParsingError('Could not locate the first row in the first sheet');
}

function getCellValue(sheet, column, row) {
  const cell = sheet[column + row];
  return cell ? cell.v : undefined;
}

module.exports = function (file) {
  const firstSheet = getFirstSheet(file);
  const firstRow = locateFirstRow(firstSheet);

  const rowData = [];

  for (let i = firstRow; ; i++) {
    const underneathRowCounter = getCellValue(firstSheet, 'A', i + 1);
    if (!underneathRowCounter) {
      break;
    }

    const getCellValueForColumn = column => getCellValue(firstSheet, column, i);

    rowData.push({
      name: getCellValueForColumn('B'),
      customsCode: getCellValueForColumn('F'),
      quantity: getCellValueForColumn('I'),
      priceAfterRebate: getCellValueForColumn('N'),
      weightNet: getCellValueForColumn('Q'),
      weightGross: getCellValueForColumn('R'),
    });
  }

  return rowData;
};
