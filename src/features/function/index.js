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
          <span>fun</span> <Input content={name} /> <span>(</span>
          <Input content={args.toString()} />
          <span>): </span>
          <Input content={returnType} /> <span>{'{'}</span>
        </header>
        <StatementBlock statements={statements} path={this.state.path} />
        {'}'}
      </section>
    );
  }
}
