import React from 'react';
import { connect } from 'react-redux';

import {
  createLine,
  deleteLine,
  updateContent,
  upgradeLineToAssignment,
} from '../../../store/actions';

import { CodeBlock } from '../CodeBlock';
import { Input } from '../Input';
import './index.scss';

const LINE_REGEX = /[^=]/gm;

class Line extends CodeBlock {
  handleInput = (e) => {
    const key = e.nativeEvent.data;
    switch (key) {
      case '=':
        this.props.upgradeLineToAssignment({
          path: this.state.path,
          value: e.target.value,
        });
        e.stopPropagation();
        return;
      default:
        break;
    }
  };

  // TODO: P3 - Consider turning lines that are blured with content into comments
  render() {
    return (
      <p className='Line' onInput={this.handleInput}>
        <Input
          id={this.props.statement._id}
          content={this.props.statement.content}
          regex={LINE_REGEX}
          onNewLine={(cursorPosition) =>
            this.props.createLine({
              cursorPosition,
              path: this.state.path,
            })
          }
          onDeleteLine={(id, value) =>
            this.props.deleteLine({
              id,
              path: this.state.path,
              value,
            })
          }
          onUpdate={(value) =>
            this.props.updateContent({
              path: this.state.path,
              value,
            })
          }
        />
      </p>
    );
  }
}

export default connect(null, {
  createLine,
  deleteLine,
  updateContent,
  upgradeLineToAssignment,
})(Line);
