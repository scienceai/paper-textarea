import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

export default class PaperTextarea extends Component {
  constructor(props) {
    super(props);
    this.recalculateSize = this.recalculateSize.bind(this);
    this.state = {
      dirty: ('defaultValue' in props) ? !!props.defaultValue : !!props.value
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dirty: (('defaultValue' in nextProps) ? !!nextProps.defaultValue : !!nextProps.value) || !!findDOMNode(this.refs.textarea).value
    });
  }

  componentDidMount() {
    this.height = this.recalculateSize();
    window.addEventListener('resize', this.recalculateSize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.recalculateSize);
  }

  componentDidUpdate() {
    this.height = this.recalculateSize();
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

  onChange(e) {
    let prevHeight = this.height;
    let height = this.height = this.recalculateSize();
    if (this.props.onChange) {
      this.props.onChange(e);
    }
    if (this.props.onResize && prevHeight !== height) {
      this.props.onResize(prevHeight, height);
    }
  }

  onBlur(e) {
    this.setState({ dirty: !!e.target.value });
  }

  cancel() {
    findDOMNode(this.refs.textarea).value = '';
    this.setState({ dirty: false });
  }

  getValue() {
    return findDOMNode(this.refs.textarea).value;
  }

  render() {
    let { name, label, required, error } = this.props;
    let { dirty } = this.state;
    return (
      <div className='paper-textarea'>
        <textarea
          ref='textarea'
          {...this.props}
          className={dirty ? 'dirty' : ''}
          name={name}
          required={required}
          rows='1'
          onBlurCapture={this.onBlur.bind(this)}
          onChange={this.onChange.bind(this)}
        />
        <label htmlFor={name}>{label}</label>
        <span className='error'>{error}</span>
      </div>
    );
  }
}

PaperTextarea.propTypes = {
  defaultValue: PropTypes.string,
  error: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onResize: PropTypes.func,
  required: PropTypes.bool,
};
