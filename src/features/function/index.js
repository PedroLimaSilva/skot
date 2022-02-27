import React from 'react';
import { Input } from '../input';

import { StatementBlock } from '../statement-block';

export class Function extends React.Component {
  render() {
    const { args, name, returnType, statements } = this.props.statement;
    return (
      <section className='Function'>
        <header>
          fun <Input content={name} /> (<Input content={args.toString()} />
          ): <Input content={returnType} /> {'{'}
        </header>
        <StatementBlock statements={statements} />
        {'}'}
      </section>
    );
  }
}
