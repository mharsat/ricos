import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { CloseIcon, Button, TextInput } from 'wix-rich-content-editor-common';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/post-selection-input-modal.scss';
import ItemsListComponent from '../components/items-list-component';

export default class PostSelectionInputModal extends Component {
  state = {
    errorMsg: '',
    posts: [],
  };
  styles = mergeStyles({ styles, theme: this.props.theme });

  afterOpenModal = () => this.input.focus();

  onCloseRequested = () => {
    this.setState({ isOpen: false });
    this.props.helpers.closeModal();
  };

  handleKeyPress = e => {
    if (e.charCode === 13) {
      this.onConfirm();
    }
  };

  componentDidMount() {
    this.input.focus();
    this.input.setSelectionRange(0, this.input.value.length);
    this.props.fetchPosts().then(posts => this.setState({ posts }));
  }

  handleKeyPress = () => {};

  search = async e => {
    const posts = await this.props.searchPosts(e.target.value);
    this.setState({ posts });
  };

  currentAbortController = null;
  onInputChange = async e => {
    const { abortController, promise } = this.props.searchPosts(e.target.value);
    if (this.currentAbortController) {
      this.currentAbortController.abort();
    }
    this.currentAbortController = abortController;

    try {
      const posts = await promise;
      this.setState({ posts });
    } catch (e) {
      if (e.name === 'AbortError') {
        return;
      }
      throw e;
    }
  };

  // TODO
  onConfirm = () => {};

  handleKeyPress = e => {
    if (e.charCode === 13) {
      this.onConfirm();
    }
  };

  render() {
    const { posts } = this.state;
    const { t, isMobile, languageDir } = this.props;
    const { styles } = this;

    return (
      <div dir={languageDir}>
        <div className={styles.verticalEmbedContainer} data-hook="verticalEmbedModal">
          {!isMobile && (
            <CloseIcon
              className={styles.verticalEmbedModalCloseIcon}
              onClick={() => this.onCloseRequested()}
            />
          )}
          <h2 className={styles.verticalEmbedModalTitle}>{t('Select_Blog_Post_Title')}</h2>
          <TextInput
            inputRef={ref => {
              this.input = ref;
            }}
            onKeyPress={this.handleKeyPress}
            onChange={this.onInputChange}
            placeholder={t('VideoUploadModal_Input_Placeholder')}
            theme={styles}
            data-hook="videoUploadModalInput"
          />
          {posts && posts.length > 0 && <ItemsListComponent items={posts} />}
        </div>

        <div className={styles.actionButtonsContainer}>
          <Button
            type="secondary"
            className={styles.actionButton}
            onClick={() => this.onCloseRequested()}
          >
            Cancel
          </Button>
          <Button className={styles.actionButton} onClick={() => this.onConfirm()}>
            Choose
          </Button>
        </div>
      </div>
    );
  }
}

PostSelectionInputModal.propTypes = {
  onConfirm: PropTypes.func,
  helpers: PropTypes.object.isRequired,
  componentData: PropTypes.object.isRequired,
  url: PropTypes.string,
  theme: PropTypes.object.isRequired,
  doneLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  t: PropTypes.func,
  isMobile: PropTypes.bool,
  languageDir: PropTypes.string,
  fetchPosts: PropTypes.func,
  searchPosts: PropTypes.func,
};
