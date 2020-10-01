/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import { BGColorIcon, BorderIcon, DuplicateIcon, InsertIcon } from '../icons';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/cell-toolbar.scss';
import { getRange, getColsRange } from '../tableUtils';
import ClickOutside from 'react-click-outside';
import ExternalToolbar from './ExternalToolbar/ExternalToolbar';
import { cloneDeep, isEmpty } from 'lodash';

const getRowIndex = range => range[0].i;
const getColIndex = range => range[0].j;

class CellToolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMoreMenu: false,
      showInsertMenu: false,
      toolbarProps: null,
    };
  }

  toggleMoreMenu = () => this.setState({ showMoreMenu: !this.state.showMoreMenu });

  closeMoreMenu = () => this.setState({ showMoreMenu: false });

  toggleInsert = () => this.setState({ showInsertMenu: !this.state.showInsertMenu });

  closeInsert = () => this.setState({ showInsertMenu: false });

  getInsertRowOptions = range => [
    <div
      key={'insertAbove'}
      className={styles.option}
      onClick={() => this.props.addRow(getRowIndex(range))}
    >
      Insert 1 above
    </div>,
    <div
      key={'insertBelow'}
      className={styles.option}
      onClick={() => this.props.addRow(getRowIndex(range) + 1)}
    >
      Insert 1 below
    </div>,
  ];

  getInsertColOptions = range => [
    <div
      key={'insertRight'}
      className={styles.option}
      onClick={() => this.props.addCol(getColIndex(range) + 1)}
    >
      Insert 1 right
    </div>,
    <div
      key={'insertLeft'}
      className={styles.option}
      onClick={() => this.props.addCol(getColIndex(range))}
    >
      Insert 1 left
    </div>,
  ];

  getRowOptions = (range, selectedRows) => [
    <div
      key={'deleteRow'}
      className={styles.option}
      onClick={() => this.props.deleteRow(selectedRows)}
    >
      Delete row
    </div>,
    ...this.getInsertRowOptions(range),
  ];

  getColOptions = (range, selectedCols) => [
    <div
      key={'deleteCol'}
      className={styles.option}
      onClick={() => this.props.deleteColumn(selectedCols)}
    >
      Delete column
    </div>,
    ...this.getInsertColOptions(range),
  ];

  excludeFormattingButtons = combinedToolbarProps => {
    const buttonsToExclude = ['LINK', 'CODE_BLOCK'];
    buttonsToExclude.forEach(button => {
      // eslint-disable-next-line fp/no-delete
      delete combinedToolbarProps.buttons[button];
    });
    return combinedToolbarProps;
  };

  setFormattingButtonsInMore = combinedToolbarProps => {
    let moreButtons = {};
    const buttonsInMore = ['Lists', 'Indentation', 'LINE_SPACING'];
    buttonsInMore.forEach(button => {
      moreButtons = { ...moreButtons, [`${button}`]: combinedToolbarProps.buttons[button] };
      // eslint-disable-next-line fp/no-delete
      delete combinedToolbarProps.buttons[button];
    });
    return { ...combinedToolbarProps, moreButtons };
  };

  setToolbarProps = cellsToolbarsProps => {
    if (cellsToolbarsProps && cellsToolbarsProps.length > 0) {
      let combinedToolbarProps = cloneDeep({ ...cellsToolbarsProps[0] });
      Object.entries(combinedToolbarProps.buttons).forEach(([buttonKeyName, buttonsProps]) => {
        if (buttonsProps.type === 'button') {
          buttonsProps.onClick = args => {
            cellsToolbarsProps
              .map(toolbar => toolbar.buttons[buttonKeyName])
              .filter(button => buttonsProps.isActive() === button.isActive())
              .forEach(button => button.onClick(args));
          };
        } else if (buttonsProps.type === 'GROUP') {
          Object.entries(buttonsProps.buttonList).forEach(([buttonListKey, buttonListValue]) => {
            buttonListValue.onClick = args => {
              cellsToolbarsProps.forEach(toolbarProp => {
                if (
                  buttonListValue.isActive() ===
                  toolbarProp.buttons[buttonKeyName].buttonList[buttonListKey].isActive()
                ) {
                  toolbarProp.buttons[buttonKeyName].buttonList[buttonListKey].onClick(args);
                }
              });
            };
          });
        }
      });
      combinedToolbarProps = this.excludeFormattingButtons(combinedToolbarProps);
      combinedToolbarProps = this.setFormattingButtonsInMore(combinedToolbarProps);
      this.setState({ combinedToolbarProps });
    } else {
      this.setState({ combinedToolbarProps: null });
    }
  };

  bgColorFormatting = () =>
    this.props.table.setCellsStyle({ backgroundColor: 'pink' }, getRange(this.props.selected));
  borderFormatting = () =>
    this.props.table.setCellsSelectionBorderStyle('1px double black', this.props.selected);
  split = () => this.props.table.splitCell(getRange(this.props.selected));
  distributeRows = () =>
    this.props.table.distributeRows(this.props.innerEditorsRefs, getRange(this.props.selected));
  distributeColumns = () => this.props.table.distributeColumns(getColsRange(this.props.selected));
  merge = () => this.props.table.mergeCells(getRange(this.props.selected));
  clear = () => this.props.table.clearRange(getRange(this.props.selected));

  getToolbarPosition = () => {
    const { getFirstCellRef, tableWidth } = this.props;
    const firstCellRef = getFirstCellRef();
    if (this.ToolbarWrapperRef && firstCellRef && tableWidth) {
      const extraTopOffset = firstCellRef.offsetTop === 0 ? 36 : 16;
      const top = `${firstCellRef.offsetTop - extraTopOffset}px`;
      const cellOffsetLeft = firstCellRef.offsetLeft;
      const toolbarWidth = this.ToolbarWrapperRef.offsetWidth;
      if (cellOffsetLeft + toolbarWidth > tableWidth) {
        return { top, right: 0 };
      } else {
        return { top, left: cellOffsetLeft };
      }
    }
  };

  setToolbarWrapperRef = ref => (this.ToolbarWrapperRef = ref);

  render() {
    const { table, selected, isEditingActive } = this.props;
    const range = selected && getRange(selected);
    const selectedRows = range && table.getSelectedRows(range);
    const selectedCols = range && table.getSelectedCols(range);
    const shouldShowContextMenu = selectedRows || selectedCols || range?.length > 1;
    const shouldShowSplit = range && table.isParentCellSelected(range);
    const additionalOptions = selectedRows
      ? this.getRowOptions(range, selectedRows)
      : selectedCols
      ? this.getColOptions(range, selectedCols)
      : [];
    const insertOptions = selectedRows
      ? this.getInsertRowOptions(range)
      : selectedCols && this.getInsertColOptions(range);
    return !isEmpty(selected) ? (
      <div
        ref={this.setToolbarWrapperRef}
        className={styles.container}
        style={{
          visibility: isEditingActive ? 'hidden' : 'visible',
          ...this.getToolbarPosition(),
        }}
      >
        {this.state.combinedToolbarProps && (
          <div className={styles.toolbar}>
            <ExternalToolbar {...this.state.combinedToolbarProps} theme={{}} />
          </div>
        )}
        <div className={styles.toolbar}>
          <BGColorIcon className={styles.icon} onClick={this.bgColorFormatting} />
          <BorderIcon className={styles.icon} onClick={this.borderFormatting} />
          {shouldShowSplit && <DuplicateIcon className={styles.icon} onClick={this.split} />}
          {insertOptions && (
            <ClickOutside
              className={styles.insertButton}
              onClick={this.toggleInsert}
              onClickOutside={this.closeInsert}
            >
              <InsertIcon className={styles.icon} />
              {this.state.showInsertMenu && <div className={styles.moreMenu}>{insertOptions}</div>}
            </ClickOutside>
          )}
        </div>
        {shouldShowContextMenu && (
          <ClickOutside
            className={styles.moreToolbar}
            onClick={this.toggleMoreMenu}
            onClickOutside={this.closeMoreMenu}
          >
            ...
            {this.state.showMoreMenu && (
              <div className={styles.moreMenu}>
                <div className={styles.option} onClick={this.distributeRows}>
                  Distribute rows
                </div>
                <div className={styles.option} onClick={this.distributeColumns}>
                  Distribute columns
                </div>
                <div className={styles.option} onClick={this.merge}>
                  Merge cells
                </div>
                <div className={styles.option} onClick={this.clear}>
                  Clear cells
                </div>
                {additionalOptions}
              </div>
            )}
          </ClickOutside>
        )}
      </div>
    ) : null;
  }
}

CellToolbar.propTypes = {
  selected: PropTypes.object.isRequired,
  table: PropTypes.any,
  innerEditorsRefs: PropTypes.any,
  addCol: PropTypes.func.isRequired,
  addRow: PropTypes.func.isRequired,
  isEditingActive: PropTypes.bool,
  tableWidth: PropTypes.number,
  getFirstCellRef: PropTypes.func,
  deleteColumn: PropTypes.func,
  deleteRow: PropTypes.func,
};

export default CellToolbar;