import React from 'react';
import { connect } from 'react-redux';

import { createLine } from '../../store/actions';

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
          onNewLine={() =>
            this.props.createLine({
              path: this.state.path,
            })
          }
        />
      </p>
    );
  }
}

export default connect(null, { createLine })(Line);
