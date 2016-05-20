import React from 'react';
import ReactDOM from 'react-dom';
import PaperTextarea  from '../src';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      'controlled-component': '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <section>
        <div>
          <h1>
            <pre>{'<PaperTextarea>'}</pre>
          </h1>
        </div>
        <div>
          Check out the code at{' '}
          <a href="https://github.com/scienceai/paper-textarea">
            https://github.com/scienceai/paper-textarea
          </a>
        </div>
        <PaperTextarea
          name="normal-text"
          label="Normal Text"
        />
        <PaperTextarea
          name="no-float"
          label="No Float Label"
          floatLabel={false}
        />
        <PaperTextarea
          name="with-placeholder"
          label="With Placeholder"
          placeholder="Hello World"
        />
        <PaperTextarea
          name="disabled"
          label="Disabled"
          disabled={true}
        />
        <PaperTextarea
          name="readonly"
          label="Read Only"
          readOnly={true}
        />
        <PaperTextarea
          name="custom-error"
          label="Custom Form Validation"
          placeholder="type a few letters"
          error={(!this.state['custom-error'] || this.state['custom-error'].length < 5) ?
            'Please enter at least 5 letters' :
            null
          }
          onChange={this.handleChange}
        />
        <PaperTextarea
          name="display-error"
          label="Always Display Error"
          placeholder="type a few letters"
          error={(!this.state['display-error'] || this.state['display-error'].length < 5) ?
            'Please enter at least 5 letters' :
            null
          }
          mustDisplayError={true}
          onChange={this.handleChange}
        />
        <PaperTextarea
          name="default-value"
          label="Default Value"
          defaultValue="a default value"
          placeholder="a placeholder"
        />
        <PaperTextarea
          name="controlled-component"
          label="Controlled Component"
          placeholder="a placeholder"
          value={this.state['controlled-component']}
          onChange={this.handleChange}
        />
      </section>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.getElementById('app')
  );
});
