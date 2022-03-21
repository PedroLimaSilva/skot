import React from 'react';
import { connect } from 'react-redux';

import { createLine, deleteLine, updateContent } from '../../../store/actions';

import { CodeBlock } from '../CodeBlock';
import { Input } from '../Input';
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

export default connect(null, { createLine, deleteLine, updateContent })(Line);
