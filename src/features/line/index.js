import React from 'react';
import { connect } from 'react-redux';

import { createLine, updateContent } from '../../store/actions';

import { CodeBlock } from '../CodeBlock';
import { Input } from '../input';
import './index.scss';

class Line extends CodeBlock {
  render() {
    return (
      <p className='Line'>
        <Input
          id={this.props.statement.id}
          content={this.props.statement.content}
          onNewLine={(cursorPosition) =>
            this.props.createLine({
              cursorPosition,
              path: this.state.path,
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

export default connect(null, { createLine, updateContent })(Line);
