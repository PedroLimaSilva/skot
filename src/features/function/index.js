import React from 'react';
import { CodeBlock } from '../CodeBlock';
import { Input } from '../input';

import { StatementBlock } from '../statement-block';

import './index.scss';

export class Function extends CodeBlock {
  render() {
    const { args, name, returnType, statements } = this.props.statement;
    return (
      <section className='Function'>
        <header>
          <strong>fun</strong> <Input content={name} /> <strong>(</strong>
          <Input content={args.toString()} />
          <strong>): </strong>
          <Input content={returnType} /> <strong>{'{'}</strong>
        </header>
        <StatementBlock statements={statements} path={this.state.path} />
        {'}'}
      </section>
    );
  }
}
