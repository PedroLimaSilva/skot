import React from 'react';
import { connect } from 'react-redux';

import { deleteLine, updateContent } from '../../../store/actions';

import { CodeBlock } from '../CodeBlock';
import { Expression } from '../Expression';
import './index.scss';

class Return extends CodeBlock {
  render() {
    return (
      <div className='Return'>
        <strong>{'return '}</strong>
        <Expression
          id={this.props.statement._id}
          inline
          expression={this.props.statement.content}
          onDeleteLine={(id, value) =>
            this.props.deleteLine({
              id,
              path: this.state.path,
              value,
            })
          }
          path={this.state.path}
          stateKeys={['content']}
        />
      </div>
    );
  }
}

export default connect(null, { deleteLine, updateContent })(Return);
