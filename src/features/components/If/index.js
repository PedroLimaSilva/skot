import React from 'react';
import { connect } from 'react-redux';

import { CodeBlock } from '../CodeBlock';

import { removeBlock } from '../../../store/actions';

import { StatementBlock } from '../StatementBlock';

import './index.scss';
import { Expression } from '../Expression';

class IfClause extends CodeBlock {
  render() {
    const { condition, statements } = this.props.statement;
    return (
      <section className='Function'>
        <header>
          <strong>if</strong>
          <strong>(</strong>
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
        <strong>{'}'}</strong>
      </section>
    );
  }
}

export default connect(null, { removeBlock })(IfClause);
