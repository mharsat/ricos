import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classNames';
import { mergeStyles } from '~/Utils';
import styles from './gallery-settings-mobile-header.scss';
import MoreIcon from '../../icons/more.svg';

class GallerySettingsMobileHeader extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }
  render() {
    const { save, cancel } = this.props;
    return (
      <div>
        <div className={this.styles.gallerySettingsMobileHeader_headerPlaceholder} />
        <div className={this.styles.gallerySettingsMobileHeader_header}>
          <a
            onClick={() => cancel()} className={classNames(this.styles.gallerySettingsMobileHeader_button,
              this.styles.gallerySettingsMobileHeader_cancel)}
          >{'Cancel'}
          </a>
          <a
            onClick={() => {}} className={classNames(this.styles.gallerySettingsMobileHeader_button,
              this.styles.gallerySettingsMobileHeader_menu)}
          ><MoreIcon/>
          </a>
          <a
            onClick={() => save()} className={classNames(this.styles.gallerySettingsMobileHeader_button,
              this.styles.gallerySettingsMobileHeader_done)}
          >{'Save'}
          </a>
        </div>
      </div>
    );
  }
}

GallerySettingsMobileHeader.propTypes = {
  save: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  cancel: PropTypes.func.isRequired,
};

export default GallerySettingsMobileHeader;
