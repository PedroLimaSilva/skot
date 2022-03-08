import React from 'react';
import { CodeBlock } from '../CodeBlock';
import { Input } from '../input';

import { StatementBlock } from '../statement-block';

import './index.scss';

export class IfClause extends CodeBlock {
  render() {
    const { id, condition, statements } = this.props.statement;
    return (
      <section className='Function'>
        <header>
          <strong>if</strong>
          <strong>(</strong>
          <Input inline id={id} content={condition.toString()} />
          <strong>) {`{`}</strong>
        </header>
        <StatementBlock statements={statements} path={this.state.path} />
        <strong>{'}'}</strong>
      </section>
    );
  }
}
