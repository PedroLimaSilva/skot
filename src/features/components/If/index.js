import React from 'react';
import { connect } from 'react-redux';

import { CodeBlock } from '../CodeBlock';

import { removeBlock } from '../../../store/actions';

import { StatementBlock } from '../StatementBlock';

import './index.scss';
import { Expression } from '../Expression';
import LineCreator from '../LineCreator';

class IfClause extends CodeBlock {
  render() {
    const { condition, statements } = this.props.statement;
    return (
      <section className='IfClause'>
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
        <div style={{ display: 'flex' }}>
          <strong>{'}'}</strong>
          <LineCreator path={this.state.path} stateKeys={['lineAfter']} />
        </div>
      </section>
    );
  }
}

export default connect(null, { removeBlock })(IfClause);
