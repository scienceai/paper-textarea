# `<PaperTextarea />`
[![Circle CI](https://circleci.com/gh/scienceai/paper-textarea.svg?style=svg)](https://circleci.com/gh/scienceai/paper-textarea)

### Install
```
npm install paper-textarea
```

### Using the Component
```js
import PaperTextarea from 'paper-textarea';
```

### Using the CSS
```css
@import "/path/to/node_modules/paper-textarea/dist/paper-textarea.css";
```

### API
* `name: String`: Required. The `name` attribute that will be attached to the `<textarea>` element.
* `label: String`: Required. The label that will be displayed on the `<textarea>` element.
* `defaultValue: String`: Optional.
* `error: String`: Optional. An error message that is displayed below the component.
* `onChange: Function`: Optional. Called on the `change` event on the `<textarea>`.
* `onResize: Function`: Optional. Called when the `<textarea>` resizes.
* `value: String`: Optional.

### Example
```js
<PaperInput
  name='comment'
  label='Your comment here'
  error={this.state.error ? 'Please enter some text' : ''}
  onChange={this.handleChange.bind(this)}
/>
```
