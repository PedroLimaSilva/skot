import React from 'react';
import { connect } from 'react-redux';

import { removeBlock } from '../../../store/actions';

import { CodeBlock } from '../CodeBlock';
import LineCreator from '../LineCreator';
import { StatementBlock } from '../StatementBlock';
import { Expression } from '../Expression';

import './index.scss';

class WhileClause extends CodeBlock {
  render() {
    const { condition, statements } = this.props.statement;
    console.log('render', condition, statements);
    return (
      <section className='WhileClause'>
        <header>
          <strong>while (</strong>
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
          <LineCreator path={this.state.path} stateKeys={['lineAfter']} />
        </header>
      </section>
    );
  }
}

export default connect(null, { removeBlock })(WhileClause);
