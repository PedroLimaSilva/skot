import { connect } from 'react-redux';

import {
  createLine,
  deleteDeclaration,
  updateValueAtPath,
} from '../../../store/actions';
import { CodeBlock } from '../CodeBlock';

import { Expression } from '../Expression';
import { Input } from '../Input';
import LineCreator from '../LineCreator';

import './index.scss';

// eslint-disable-next-line no-useless-escape
const VAR_NAME_REGEX = /[a-zA-Z_$]+/gm;

class Assignment extends CodeBlock {
  render() {
    const { _id, name, content } = this.props.statement;
    return (
      <div className='Assignment'>
        <Input
          inline
          id={_id}
          content={name}
          regex={VAR_NAME_REGEX}
          onUpdate={(value) =>
            this.props.updateValueAtPath({
              path: [...this.state.path, 'name'],
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
        <LineCreator path={this.state.path} stateKeys={['lineAfter']} />
      </div>
    );
  }
}

export default connect(null, {
  createLine,
  deleteDeclaration,
  updateValueAtPath,
})(Assignment);
