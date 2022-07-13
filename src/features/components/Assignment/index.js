import { connect } from 'react-redux';

import {
  createLine,
  deleteDeclaration,
  updateDeclaration,
} from '../../../store/actions';
import { CodeBlock } from '../CodeBlock';

import { Expression } from '../Expression';
import { Input } from '../Input';

import './index.scss';

// eslint-disable-next-line no-useless-escape
const VAR_NAME_REGEX = /[a-zA-Z_$]+/gm;

class Assignment extends CodeBlock {
  render() {
    const { _id, referenceTo, content } = this.props.statement;
    return (
      <div className='Assignment'>
        <Input
          inline
          id={_id}
          content={referenceTo}
          regex={VAR_NAME_REGEX}
          onUpdate={(value) =>
            this.props.updateDeclaration({
              path: [...this.state.path, 'referenceTo'],
              value,
            })
          }
        />
        <strong>{' = '}</strong>
        <Expression
          className='right-side'
          expression={content}
          path={this.state.path}
          stateKeys={['content']}
        />
      </div>
    );
  }
}

export default connect(null, {
  createLine,
  deleteDeclaration,
  updateDeclaration,
})(Assignment);
