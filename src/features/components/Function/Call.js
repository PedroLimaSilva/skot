import { connect } from 'react-redux';

import { updateValueAtPath } from '../../../store/actions';
import { CodeBlock } from '../CodeBlock';

import { Input } from '../Input';
import LineCreator from '../LineCreator';
import { CallParameterList } from './CallParameterList';

import './index.scss';

// eslint-disable-next-line no-useless-escape
const VAR_NAME_REGEX = /[a-zA-Z_$]+/gm;

class FunctionCall extends CodeBlock {
  render() {
    const { _id, functionName, args } = this.props.statement;
    return (
      <div className='FunctionCall'>
        <Input
          inline
          id={_id}
          content={functionName}
          regex={VAR_NAME_REGEX}
          // TODO: Update function name
          // onUpdate={(value) =>
          //   this.props.updateValueAtPath({
          //     path: [...this.state.path, 'functionName'],
          //     value,
          //   })
          // }
        />
        <CallParameterList
          list={args}
          path={this.state.path}
          stateKeys={['args']}
          id={_id}
        />
        <LineCreator path={this.state.path} stateKeys={['lineAfter']} />
      </div>
    );
  }
}

export default connect(null, {
  updateValueAtPath,
})(FunctionCall);
