import { connect } from 'react-redux';

import { createLine, deleteLine } from '../../../store/actions';
import { CodeBlock } from '../CodeBlock';

import { Expression } from '../Expression';
import { Input } from '../Input';

// eslint-disable-next-line no-useless-escape
const VAR_NAME_REGEX = /[a-zA-Z_$]+/gm;

class Declaration extends CodeBlock {
  render() {
    const { id, name, content } = this.props.statement;
    return (
      <div className='Declaration'>
        <strong>{'var '}</strong>
        <Input
          inline
          id={id}
          content={name}
          regex={VAR_NAME_REGEX}
          // onUpdate={(value) =>
          //   this.props.updateFunction({
          //     path: [...this.state.path, 'name'],
          //     value,
          //   })
          // }
          onDeleteLine={() =>
            this.props.deleteLine({
              id,
              path: this.state.path,
              value: content,
            })
          }
        />
        {' = '}
        <Expression
          inline
          id={id}
          content={content}
          regex={VAR_NAME_REGEX}
          onNewLine={(cursorPosition) =>
            this.props.createLine({
              cursorPosition,
              path: this.state.path,
            })
          }
        />
      </div>
    );
  }
}

export default connect(null, { createLine, deleteLine })(Declaration);
