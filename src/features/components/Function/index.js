import React from 'react';
import { connect } from 'react-redux';

import { removeBlock, updateFunction } from '../../../store/actions';

import { CodeBlock } from '../CodeBlock';
import { Input } from '../Input';
import LineCreator from '../LineCreator';
import { StatementBlock } from '../StatementBlock';

import './index.scss';
import { ParameterList } from './ParameterList';

// eslint-disable-next-line no-useless-escape
const FUNCTION_NAME_REGEX = /[a-zA-Z_$]+[0-9a-zA-Z_$]*/gm;
// eslint-disable-next-line no-useless-escape
// eslint-disable-next-line no-unused-vars
const FUNCTION_ARGUMENTS_REGEX =
  /([a-zA-Z_$]+: ([A-Z][a-zA-Z]*), )|([a-zA-Z_$]+: ([A-Z][a-zA-Z]*))/gm;
// eslint-disable-next-line no-unused-vars
const FUNCTION_TYPE_REGEX = /([A-Z][a-zA-Z]*)/gm;

class Function extends CodeBlock {
  render() {
    const { _id, args, name, returnType, statements } = this.props.statement;
    return (
      <section className='Function'>
        <header>
          <strong>fun</strong>{' '}
          <Input
            inline
            id={_id}
            content={name}
            regex={FUNCTION_NAME_REGEX}
            onUpdate={(value) =>
              this.props.updateFunction({
                path: [...this.state.path, 'name'],
                value,
              })
            }
            onDeleteLine={() =>
              this.props.removeBlock({
                path: this.state.path,
              })
            }
          />{' '}
          <ParameterList
            list={args}
            showPlaceholder
            id={_id}
            onUpdate={(index, field, value, focusTarget) =>
              this.props.updateFunction({
                focusTarget,
                path: [...this.state.path, 'args', index, field],
                value,
              })
            }
          />
          :
          <Input
            inline
            content={returnType}
            regex={FUNCTION_TYPE_REGEX}
            onUpdate={(value) =>
              this.props.updateFunction({
                path: [...this.state.path, 'returnType'],
                value,
              })
            }
          />{' '}
          <strong>{'{'}</strong>
        </header>
        <StatementBlock statements={statements} path={this.state.path} />
        <div style={{ display: 'flex' }}>
          <strong>{'}'}</strong>
          <LineCreator path={this.state.path} stateKeys={['lineAfter']} />
        </div>
      </section>
    );
  }
}

export default connect(null, { removeBlock, updateFunction })(Function);
