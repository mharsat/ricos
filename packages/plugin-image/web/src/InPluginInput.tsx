import React, {
  Component,
  FocusEventHandler,
  KeyboardEventHandler,
  ChangeEventHandler,
} from 'react';
import classnames from 'classnames';
import styles from '../statics/styles/in-plugin-input.scss';

interface Props {
  className: string;
  value: string;
  onChange: (caption: string) => void;
  setFocusToBlock: () => void;
  setInPluginEditingMode: (shouldEnable: boolean) => void;
}

class InPluginInput extends Component<Props> {
  static defaultProps = {
    setInPluginEditingMode: () => false,
    setFocusToBlock: () => false,
  };

  handleFocus: FocusEventHandler<HTMLInputElement> = e => {
    e.stopPropagation();
    this.props.setFocusToBlock();
    this.props.setInPluginEditingMode(true);
  };

  handleBlur = () => this.props.setInPluginEditingMode(false);

  handleKeyPress: KeyboardEventHandler<HTMLInputElement> = e => {
    const { setFocusToBlock, value } = this.props;
    if (e.key === 'Enter' && setFocusToBlock && value !== '') {
      this.handleBlur();
      setFocusToBlock();
    }
  };

  onChange: ChangeEventHandler<HTMLInputElement> = e => this.props.onChange?.(e.target.value);

  className = classnames(styles.inPluginInput, this.props.className);

  render() {
    return (
      <input
        className={this.className}
        value={this.props.value}
        onChange={this.onChange}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onKeyPress={this.handleKeyPress}
        dir="auto"
      />
    );
  }
}

export default InPluginInput;
