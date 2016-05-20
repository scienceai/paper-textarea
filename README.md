# `<PaperTextarea />`

[![Build Status](https://travis-ci.org/scienceai/paper-textarea.svg?branch=master)](https://travis-ci.org/scienceai/paper-textarea)

Check out a live demo at http://scienceai.github.io/paper-textarea

### Install
```
npm install paper-textarea
```

### Usage
```js
import React from 'react';
import PaperTextarea from 'paper-textarea';

class MyComponent extends React.Component {
  // ... setup state and change handlers

  return (
    <PaperTextarea
      name='description'
      label='A brief description (500 words or less)'
      error={this.state.error ? 'Could not process input' : ''}
      onChange={this.handleChange.bind(this)}
      value={this.state.description}
    />
  );
}
```

### Using the CSS

With `postcss-import` or similar:

```css
@import "paper-input/dist/paper-input.css";
```

### API
The `<PaperTextarea>` component has the following internal structure:
```html
<div class='paper-textarea'>
  <textarea />
  <label />
  <span class='border-line' /> <!-- animates a line on the bottom border of the textarea -->
  <span class='error' />
</div>
```

`<PaperTextarea>` accepts the following `props`:
* `label`: String. Required. The label that will be displayed on the `<textarea>` element.
* `name`: String. Required. The `name` attribute that will be attached to the `<textarea>` element.
* `className`: String. Optional. This class will be added to the `<div>` wrapping the `<textarea>` element.
* `error`: String. Optional. An error message that is displayed in the `<span className='error'>` below the `<textarea>`.
* `floatLabel`: Boolean. Optional. Floats the `<label>` above the `<textarea>` when focused. Defaults to `true`.
* `mustDisplayError`: Bool. Optional. Ensures that the `error` provided is displayed regardless of whether or not the component has been interacted with.
* `onBlurCapture`: Function. Optional. Called on the `blur` event on the `<textarea>`.
* `onChange`: Function. Optional. Called on the `change` event on the `<textarea>`.
* `onFocus`: Function. Optional. Called on the `focus` event on the `<textarea>`.
* `onKeyDown`: Function. Optional. Called on the `keydown` event on the `<textarea>`.
* `onResize`: Function. Optional. Called on the `resize` event on the `<textarea>`.
* `defaultValue`: String. Optional. See [the docs](https://facebook.github.io/react/docs/forms.html#default-value) on the `defaultValue` prop.
* `placeholder`: String. Optional. Note that you should not set `floatLabel` to `false` if using a placeholder as it will overlap with the label.
* `value`: String. Optional.

Any additional props not specified above will be passed to the `<textarea>` element.

### Example
For a fuller example, visit the `example/` directory.
```
npm run watch
```
```
open example/index.html
```

### License
Apache-2.0
