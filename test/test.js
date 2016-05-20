import assert from 'assert';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import PaperTextarea from '../src';

describe('PaperTextarea', () => {
  describe('html output', () => {
    it('renders a div with className "paper-textarea"', () => {
      const shallowRenderer = TestUtils.createRenderer();
      shallowRenderer.render(
        <PaperTextarea
          name="content"
          label="Your content here"
        />
      );
      const result = shallowRenderer.getRenderOutput();
      assert.equal(result.type, 'div');
      assert(result.props.className.match(/paper\-textarea/));
    });

    it('renders an textarea and label as children', () => {
      const shallowRenderer = TestUtils.createRenderer();
      shallowRenderer.render(
        <PaperTextarea
          name="content"
          label="Your content here"
        />
      );
      const result = shallowRenderer.getRenderOutput();
      assert.equal(result.props.children[0].type, 'textarea');
      assert.equal(result.props.children[1].type, 'label');
    });
  });

  describe('props', () => {
    it('uses the label prop as the text of the label element', () => {
      const shallowRenderer = TestUtils.createRenderer();
      shallowRenderer.render(
        <PaperTextarea
          name="content"
          label="Your content here"
        />
      );
      const result = shallowRenderer.getRenderOutput();
      const label = result.props.children[1];
      assert.equal(label.props.children, 'Your content here');
    });

    it('displays an error message in a span when mustDisplayError is true', () => {
      const shallowRenderer = TestUtils.createRenderer();
      shallowRenderer.render(
        <PaperTextarea
          name="content"
          label="Your content here"
          error="Cannot be blank"
          mustDisplayError={true}
        />
      );
      const result = shallowRenderer.getRenderOutput();
      const span = result.props.children[3];
      assert.equal(span.props.children, 'Cannot be blank');
    });
  });
});
