import React from 'react';
import { connect } from 'react-redux';

import { CodeBlock } from '../CodeBlock';
import { Input } from '../InputLine';

import { removeBlock } from '../../../store/actions';

import { StatementBlock } from '../StatementBlock';

import './index.scss';

class IfClause extends CodeBlock {
  render() {
    const { id, condition, statements } = this.props.statement;
    return (
      <section className='Function'>
        <header>
          <strong>if</strong>
          <strong>(</strong>
          <Input
            inline
            id={id}
            content={condition.toString()}
            onDeleteLine={() =>
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
