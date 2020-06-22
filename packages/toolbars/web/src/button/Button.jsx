import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ClickOutside from 'react-click-outside';
import {
  Separator,
  FileInput,
  Tooltip,
  BUTTON_TYPES,
  TOOLBARS,
  InlineToolbarButton,
} from 'wix-rich-content-editor-common';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/toolbar-button.scss';
import createTextDropdownButton from './createTextDropdownButton';

class Button extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    getIcon: PropTypes.func.isRequired,
    onChange: PropTypes.func,
    accept: PropTypes.string,
    multiple: PropTypes.bool,
    dataHook: PropTypes.string,
    isDisabled: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    tooltip: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    isActive: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
    showLabel: PropTypes.bool,
    tabIndex: PropTypes.number,
    toolbarName: PropTypes.string.isRequired,
    isMobile: PropTypes.bool,
  };

  static defaultProps = {
    tabIndex: 1,
    showLabel: false,
    toolbarName: TOOLBARS.EXTERNAL,
    isActive: () => false,
    isDisabled: () => false,
  };

  constructor(props) {
    super(props);
    const { buttonStyles } = props.theme || {};
    this.styles = mergeStyles({ styles, theme: buttonStyles });
    this.buttonRef = React.createRef();
    this.toolbarName = props.toolbarName;
  }

  renderButton = ({ getIcon, getLabel, onClick, dataHook, isDisabled, tooltip }) => {
    const { styles } = this;
    const { showLabel, tabIndex } = this.props;
    const Icon = getIcon();
    const label = getLabel();
    return (
      <Tooltip content={tooltip} moveBy={{ y: -20 }}>
        <button
          disabled={isDisabled()}
          aria-label={tooltip}
          tabIndex={tabIndex}
          className={classNames(
            styles.button,
            showLabel ? styles.sideToolbarButton : styles.footerToolbarButton
          )}
          data-hook={dataHook}
          onClick={onClick}
          ref={this.buttonRef}
        >
          <div className={styles.icon}>
            <Icon key="0" />
          </div>
          {showLabel && (
            <span key="1" className={styles.label}>
              {label}
            </span>
          )}
        </button>
      </Tooltip>
    );
  };

  renderSeparator = () => <Separator />;

  renderFileUploadButton = ({
    getIcon,
    getLabel,
    onChange,
    accept,
    multiple,
    dataHook,
    isDisabled,
    tooltip,
  }) => {
    const { theme, showLabel, tabIndex } = this.props;
    const { styles } = this;
    const Icon = getIcon();
    const label = getLabel();
    return (
      <FileInput
        disabled={isDisabled()}
        dataHook={dataHook}
        className={classNames(
          styles.button,
          showLabel ? styles.sideToolbarButton : styles.footerToolbarButton
        )}
        onChange={onChange}
        accept={accept}
        multiple={multiple}
        theme={theme}
        tabIndex={tabIndex}
      >
        <Tooltip content={tooltip} moveBy={{ y: -20 }}>
          <div className={styles.icon}>
            <Icon key="0" />
          </div>
          {showLabel && (
            <span key="1" className={styles.label}>
              {label}
            </span>
          )}
        </Tooltip>
      </FileInput>
    );
  };

  // TODO: keepOpen
  handleDropDownClick = onClick => () => {
    if (this.buttonRef) {
      onClick(this.buttonRef);
    }
  };

  renderDropDown = ({ getLabel, onClick, tooltip, dataHook, isActive, onClose = () => {} }) => {
    const { theme, isMobile, tabIndex } = this.props;
    return (
      <ClickOutside onClickOutside={onClose}>
        <InlineToolbarButton
          isActive={isActive()}
          onClick={this.handleDropDownClick(onClick)}
          showArrowIcon
          buttonContent={getLabel()}
          theme={theme}
          tooltipText={tooltip}
          dataHook={dataHook}
          tabIndex={tabIndex}
          isMobile={isMobile}
          ref={ref => (this.buttonRef = ref)}
        />
      </ClickOutside>
    );
  };

  renderButtonGroup = ({ buttonProps, tooltip, dataHook }) => {
    const { theme, isMobile, tabIndex } = this.props;
    const buttons = Object.values(buttonProps);
    const DropDownButton = createTextDropdownButton({
      buttons,
      tooltip,
      dataHook,
      activeItem: () => {
        const activeButton = buttons.filter(b => b.isActive())[0];
        return activeButton?.getIcon();
      },
    });
    return <DropDownButton theme={theme} isMobile={isMobile} tabIndex={tabIndex} />;
  };

  render() {
    const { type } = this.props;
    return {
      [BUTTON_TYPES.FILE]: this.renderFileUploadButton,
      [BUTTON_TYPES.BUTTON]: this.renderButton,
      [BUTTON_TYPES.SEPARATOR]: this.renderSeparator,
      [BUTTON_TYPES.DROPDOWN]: this.renderDropDown,
      [BUTTON_TYPES.GROUP]: this.renderButtonGroup,
      [BUTTON_TYPES.CUSTOM_BLOCK]: this.renderButton,
    }[type]?.(this.props);
  }
}

export default Button;
