import React from 'react';
import { findDOMNode } from 'react-dom';
import classnames from 'classnames';

export default class PaperTextarea extends React.Component {
  constructor(props) {
    super(props);
    this._value = props.value || props.defaultValue || '';
    this.state = {
      touched: false,
      dirty: !!this._value,
      focused: false,
    };
    this.handleBlurCapture = this.handleBlurCapture.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.recalculateSize = this.recalculateSize.bind(this);
  }

  componentDidMount() {
    this.height = this.recalculateSize();
    window.addEventListener('resize', this.recalculateSize);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value != null) {
      this._value = nextProps.value;
    }
    this.setState({
      dirty: !!this._value,
    });
  }

  componentDidUpdate() {
    this.height = this.recalculateSize();
    let textarea = findDOMNode(this.refs.textarea);
    if (this.shouldDisplayError()) {
      textarea.setCustomValidity(this.props.error);
    } else {
      textarea.setCustomValidity('');
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.recalculateSize);
  }

  getValue() {
    console.warn(
      '<PaperTextarea>.getValue() has been deprecated and will be removed ' +
      'in the next version of paper-textarea.'
    );
    return findDOMNode(this.refs.textarea).value;
  }

  cancel() {
    console.warn(
      '<PaperTextarea>.cancel() has been deprecated and will be removed ' +
      'in the next version of paper-textarea.'
    );
    findDOMNode(this.refs.textarea).value = '';
    this.setState({ dirty: false });
  }

  handleBlurCapture(e) {
    if (this.props.onBlurCapture) {
      this.props.onBlurCapture(e);
    }

    this.setState({ dirty: !!this._value, focused: false });
  }

  handleChange(e) {
    this._value = e.target.value;
    let prevHeight = this.height;
    let height = this.height = this.recalculateSize();
    if (this.props.onChange) {
      this.props.onChange(e);
    }
    if (this.props.onResize && prevHeight !== height) {
      this.props.onResize(prevHeight, height);
    }

    this.setState({ dirty: !!this._value });
  }

  handleFocus(e) {
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }

    this.setState({ touched: true, focused: true });
  }

  handleKeyDown(e) {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    }

    if (!this.state.touched) {
      this.setState({ touched: true });
    }
  }

  recalculateSize() {
    let diff;
    let $textarea = findDOMNode(this.refs.textarea);

    if (window.getComputedStyle) {
      let styles = window.getComputedStyle($textarea);

      // If the textarea is set to border-box, it's not necessary to
      // subtract the padding.
      if (styles.getPropertyValue('box-sizing') === 'border-box' ||
          styles.getPropertyValue('-moz-box-sizing') === 'border-box' ||
          styles.getPropertyValue('-webkit-box-sizing') === 'border-box') {
        diff = 0;
      } else {
        diff = (
          parseInt(styles.getPropertyValue('padding-bottom') || 0, 10) +
          parseInt(styles.getPropertyValue('padding-top') || 0, 10)
        );
      }
    } else {
      diff = 0;
    }

    $textarea.style.height = 'auto';
    $textarea.style.height = ($textarea.scrollHeight - diff) + 'px';
    return ($textarea.scrollHeight - diff);
  }

  shouldDisplayError() {
    return this.props.error && (
      (this.state.touched && this.state.dirty) ||
      this.props.mustDisplayError
    );
  }

  render() {
    let { floatLabel, className, label, error, ...textareaProps } = this.props;
    let { dirty, touched, focused } = this.state;
    let containerClassNames = classnames({
      'paper-textarea': true,
      'float-label': !!floatLabel,
      [className]: !!className,
    });
    let textareaClassNames = classnames({
      dirty,
      touched,
    });
    if (textareaProps.placeholder && !focused) {
      textareaProps = {
        ...textareaProps,
        placeholder: undefined,
      };
    }

    return (
      <div className={containerClassNames}>
        <textarea
          {...textareaProps}
          ref="textarea"
          className={textareaClassNames}
          rows="1"
          onBlurCapture={this.handleBlurCapture}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onKeyDown={this.handleKeyDown}
        />
        <label htmlFor={textareaProps.name}>{label}</label>
        <span className="border-line" />
        {this.shouldDisplayError() && (
          <span className="error">{error}</span>
        )}
      </div>
    );
  }
}

let { bool, func, string } = React.PropTypes;
PaperTextarea.propTypes = {
  className: string,
  defaultValue: string,
  error: string,
  floatLabel: bool,
  label: string.isRequired,
  mustDisplayError: bool,
  name: string.isRequired,
  onBlurCapture: func,
  onChange: func,
  onFocus: func,
  onKeyDown: func,
  onResize: func,
  placeholder: string,
  required: bool,
  value: string,
};

PaperTextarea.defaultProps = {
  floatLabel: true,
};
