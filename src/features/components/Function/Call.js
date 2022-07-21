import { connect } from 'react-redux';

import { updateValueAtPath } from '../../../store/actions';
import { CodeBlock } from '../CodeBlock';

import { Input } from '../Input';
import { ParameterList } from './ParameterList';

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
          // TODO: Update declaration?
          // onUpdate={(value) =>
          //   this.props.updateValueAtPath({
          //     path: [...this.state.path, 'functionName'],
          //     value,
          //   })
          // }
        />
        <ParameterList
          list={args}
          id={_id}
          // TODO: Update declaration?
          // onUpdate={(index, field, value, focusTarget) =>
          //   this.props.updateFunction({
          //     focusTarget,
          //     path: [...this.state.path, 'args', index, field],
          //     value,
          //   })
          // }
        />
      </div>
    );
  }
}

export default connect(null, {
  updateValueAtPath,
})(FunctionCall);
