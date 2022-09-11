import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { removeBlock } from '../../../store/actions';

import { STATEMENT_TYPES } from '../../language-support';

import { CodeBlock } from '../CodeBlock';
import LineCreator from '../LineCreator';
import { StatementBlock } from '../StatementBlock';
import { Expression } from '../Expression';

import './index.scss';

class IfClause extends CodeBlock {
  hasElseBlock(elseBlock) {
    for (let i = 0, len = elseBlock.length; i < len; i++) {
      const statement = elseBlock[i];
      console.log(STATEMENT_TYPES.Line, statement);
      if (statement._type !== STATEMENT_TYPES.LINE) {
        return true;
      }
    }
    return false;
  }

  render() {
    const { condition, statements, elseBlock } = this.props.statement;
    const noElse = !this.hasElseBlock(elseBlock);

    return (
      <section className='IfClause'>
        <header>
          <strong>if (</strong>
          <Expression
            expression={condition}
            path={this.state.path}
            stateKeys={['condition']}
            onDelete={() =>
              this.props.removeBlock({
                path: this.state.path,
              })
            }
          />
          <strong>) {`{`}</strong>
        </header>
        <StatementBlock statements={statements} path={this.state.path} />
        <header>
          <strong>{'} '} </strong>
          <strong
            className={classNames({
              faded: noElse,
            })}
            style={{ display: 'flex', marginLeft: '0.5em' }}
          >
            {' else {'}
          </strong>
        </header>
        <StatementBlock
          statements={elseBlock}
          path={this.state.path}
          statementBlockName={'elseBlock'}
        />
        <strong
          className={classNames({
            faded: noElse,
          })}
          style={{ display: 'flex' }}
        >
          {'}'}
          <LineCreator path={this.state.path} stateKeys={['lineAfter']} />
        </strong>
      </section>
    );
  }
}

export default connect(null, { removeBlock })(IfClause);
