import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/table-settings-modal.scss';
import TableSettingsCountSection from './TableSettingsCountSection';
import { getDefaultsSettings } from '../tableUtil';
import { KEYS_CHARCODE } from 'wix-rich-content-editor-common';
import { CloseIcon } from '../icons';

export default class tableSettingsModal extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.state = {
      rowCount: '4',
      colCount: '4',
    };
  }

  onCreateTableClicked = () => {
    const { colCount, rowCount, submittedInvalidCol, submittedInvalidRow } = this.state;
    if (colCount && rowCount && !submittedInvalidCol && !submittedInvalidRow) {
      const { componentData, pubsub, onConfirm, helpers } = this.props;
      const { config } = getDefaultsSettings(parseInt(rowCount), parseInt(colCount));
      if (onConfirm) {
        onConfirm({
          ...componentData,
          config,
        });
      } else {
        pubsub.update('componentData', { config });
      }
      helpers.closeModal();
    }
  };

  isNumber = n => /^[1-9][0-9]*$/.test(n);

  onColCountChange = colCount =>
    this.setState({
      colCount,
      submittedInvalidCol: colCount.length > 0 && !this.isNumber(colCount),
    });

  onRowCountChange = rowCount =>
    this.setState({
      rowCount,
      submittedInvalidRow: rowCount.length > 0 && !this.isNumber(rowCount),
    });

  setCreateTableButtonRef = ref => (this.createTableButton = ref);

  onKeyUp = e => e.keyCode === KEYS_CHARCODE.ENTER && this.onCreateTableClicked();

  render() {
    const { styles } = this;
    const { colCount, rowCount, submittedInvalidCol, submittedInvalidRow } = this.state || {};
    const { isMobile, helpers, t } = this.props;
    return (
      <div>
        {isMobile && (
          // eslint-disable-next-line
          <div onClick={helpers.closeModal} className={styles.closeButton}>
            <CloseIcon />
          </div>
        )}
        <div className={styles.title}>{t('TablePlugin_SettingsModal_Title')}</div>
        <div className={styles.subtitle}>{t('TablePlugin_SettingsModal_SubTitle')}</div>
        <div className={styles.tableConfig}>
          <TableSettingsCountSection
            title={t('TablePlugin_SettingsModal_ColCount')}
            theme={this.props.theme}
            input={colCount}
            onCountChange={this.onColCountChange}
            errorMessage={t('TablePlugin_SettingsModal_ErrorMessage')}
            submittedInvalidInput={submittedInvalidCol}
            dataHook={'columnCount'}
          />
          <TableSettingsCountSection
            title={t('TablePlugin_SettingsModal_RowCount')}
            theme={this.props.theme}
            input={rowCount}
            onCountChange={this.onRowCountChange}
            errorMessage={t('TablePlugin_SettingsModal_ErrorMessage')}
            submittedInvalidInput={submittedInvalidRow}
            dataHook={'rowCount'}
          />
        </div>
        {/*eslint-disable-next-line*/}
        <div
          tabIndex="0" //eslint-disable-line
          className={styles.submit}
          onClick={this.onCreateTableClicked}
          onKeyUp={this.onKeyUp}
          data-hook={'createTableButton'}
        >
          {t('TablePlugin_SettingsModal_CreateTable_Button')}
        </div>
        {/*eslint-disable-next-line*/}
        <div tabIndex="0" />
      </div>
    );
  }
}

tableSettingsModal.propTypes = {
  componentData: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func,
  pubsub: PropTypes.object,
  onConfirm: PropTypes.func,
  helpers: PropTypes.object,
  isMobile: PropTypes.bool,
};
