import React from 'react';
import { connect } from 'react-redux';

import { deleteLine, updateContent } from '../../../store/actions';

import { CodeBlock } from '../CodeBlock';
import { Expression } from '../Expression';
import './index.scss';

class Return extends CodeBlock {
  render() {
    return (
      <p className='Return'>
        <span>{'return '}</span>
        <Expression
          id={this.props.statement.id}
          inline
          content={this.props.statement.content}
          onDeleteLine={(id, value) =>
            this.props.deleteLine({
              id,
              path: this.state.path,
              value,
            })
          }
          // onUpdate={(value) =>
          //   this.props.updateContent({
          //     path: this.state.path,
          //     value,
          //   })
          // }
        />
      </p>
    );
  }
}

export default connect(null, { deleteLine, updateContent })(Return);
