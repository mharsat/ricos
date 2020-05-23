import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FileInput, Tooltip } from 'wix-rich-content-editor-common';
import ReactModal from 'react-modal';
import { withPluginButtons } from 'wix-rich-content-editor';
import styles from './ExternalToolbar.scss';

class ExternalToolbar extends Component {
  static propTypes = {
    buttons: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  state = { isPanelOpen: false };

  showPopup = modalElement => () => {
    this.setState({
      isPanelOpen: true,
      Modal: modalElement,
    });
  };

  hidePopup = () => this.setState({ isPanelOpen: false });

  handleClick = onClick => e => {
    onClick(e);
    this.forceUpdate();
  };

  render() {
    const { buttons } = this.props;
    const { Modal, isPanelOpen } = this.state;
    return (
      <div className={styles.toolbar}>
        {Object.values(buttons).map(
          ({
            name,
            buttonType,
            getIcon,
            tooltip,
            onClick,
            isActive = () => false,
            isDisabled = () => false,
            modalElement = () => null,
            ...fileInputProps
          }) => {
            const Icon = getIcon();
            const style = isActive() ? { background: 'lightslategrey' } : {};
            if (buttonType === 'button') {
              return (
                <Tooltip content={tooltip} place="right" key={name}>
                  <button onClick={this.handleClick(onClick)} disabled={isDisabled()} style={style}>
                    <Icon />
                  </button>
                </Tooltip>
              );
            } else if (buttonType === 'file') {
              return (
                <FileInput {...fileInputProps} place="right" key={name}>
                  <Tooltip content={tooltip}>
                    <Icon />
                  </Tooltip>
                </FileInput>
              );
            } else if (buttonType === 'modal') {
              return (
                <Tooltip content={tooltip} place="right" key={name}>
                  <button onClick={this.showPopup(modalElement)} disabled={isDisabled()}>
                    <Icon />
                  </button>
                </Tooltip>
              );
            }

            return null;
          }
        )}
        {Modal &&
            <ReactModal
              isOpen={isPanelOpen}
            >
                <Modal />
            </ReactModal>}
      </div>
    );
  }
}

export default withPluginButtons(ExternalToolbar);