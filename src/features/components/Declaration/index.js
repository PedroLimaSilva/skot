import { connect } from 'react-redux';

import { createLine, deleteLine, updateDeclaration } from '../../../store/actions';
import { CodeBlock } from '../CodeBlock';

import { Expression } from '../Expression';
import { Input } from '../Input';

import './index.scss';

// eslint-disable-next-line no-useless-escape
const VAR_NAME_REGEX = /[a-zA-Z_$]+/gm;

class Declaration extends CodeBlock {
  handleEnter = (e) => {
    if (e.code === 'Enter')
      this.props.createLine({
        cursorPosition: Number.MAX_VALUE,
        path: this.state.path,
      });
  };

  render() {
    const { _id, name, content } = this.props.statement;
    return (
      <div className='Declaration' onKeyPress={this.handleEnter}>
        <strong>{'var '}</strong>
        <Input
          inline
          id={_id}
          content={name}
          regex={VAR_NAME_REGEX}
          onUpdate={(value) =>
            this.props.updateDeclaration({
              path: [...this.state.path, 'name'],
              value,
            })
          }
          onDeleteLine={() =>
            this.props.deleteLine({
              id: _id,
              path: this.state.path,
              value: content,
            })
          }
        />
        <strong>{' = '}</strong>
        <Expression className='right-side' expression={content} />
      </div>
    );
  }
}

export default connect(null, { createLine, deleteLine, updateDeclaration })(Declaration);
