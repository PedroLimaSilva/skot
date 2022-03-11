import React from 'react';
import { connect } from 'react-redux';

import { removeBlock } from '../../../store/actions';

import { CodeBlock } from '../CodeBlock';
import { Input } from '../input';
import { StatementBlock } from '../statement-block';

import './index.scss';

class Function extends CodeBlock {
  render() {
    const { id, args, name, returnType, statements } = this.props.statement;
    return (
      <section className='Function'>
        <header>
          <strong>fun</strong>{' '}
          <Input
            inline
            id={id}
            content={name}
            onDeleteLine={() =>
              this.props.removeBlock({
                path: this.state.path,
              })
            }
          />{' '}
          <strong>(</strong>
          <Input inline content={args.toString()} />
          <strong>): </strong>
          <Input inline content={returnType} /> <strong>{'{'}</strong>
        </header>
        <StatementBlock statements={statements} path={this.state.path} />
        <strong>{'}'}</strong>
      </section>
    );
  }
}

export default connect(null, { removeBlock })(Function);
