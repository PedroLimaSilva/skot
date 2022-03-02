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
          <strong>fun</strong> <Input inline content={name} /> <strong>(</strong>
          <Input inline content={args.toString()} />
          <strong>): </strong>
          <Input inline content={returnType} /> <strong>{'{'}</strong>
        </header>
        <StatementBlock statements={statements} path={this.state.path} />
        {'}'}
      </section>
    );
  }
}
