import { getRange } from '../../tableUtils';

const clear = (table, selected) => table.clearRange(getRange(selected));
const selectRow = (selected, selectRows) => {
  const selectedRow = selected.start.i;
  selectRows({ start: selectedRow, end: selectedRow });
};
const selectCol = (selected, selectCols) => {
  const selectedCol = selected.start.j;
  selectCols({ start: selectedCol, end: selectedCol });
};
const split = (table, selected) => table.splitCell(getRange(selected));

const splitButton = (table, selected) => {
  const range = selected && getRange(selected);
  const shouldShowSplit = range && table.isParentCellSelected(range);
  return shouldShowSplit
    ? {
        SplitCells: {
          onClick: () => split(table, selected),
          dataHook: 'split-cells',
          text: 'Split cells',
          type: 'text',
        },
      }
    : null;
};

export const getSingleCellContextMenuButtonsProps = (table, selected, selectRows, selectCols) => {
  return {
    ClearCell: {
      onClick: () => clear(table, selected),
      dataHook: 'clear-cell',
      text: 'Clear cell',
      type: 'text',
    },
    ...splitButton(table, selected),
    SelectRow: {
      onClick: () => selectRow(selected, selectRows),
      dataHook: 'select-row',
      text: 'Select row',
      type: 'text',
    },
    SelectColumn: {
      onClick: () => selectCol(selected, selectCols),
      dataHook: 'select-column',
      text: 'Select column',
      type: 'text',
    },
  };
};
