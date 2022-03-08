import React from 'react';

import Comment from '../comment';
import Line from '../line';
import { Function } from '../function';
import './index.scss';
import { STATEMENT_TYPES } from '../../language-support';


export class StatementBlock extends React.Component {
  renderStatements() {
    return this.props.statements?.map((statement, i) => {
      switch (statement.type) {
        case STATEMENT_TYPES.COMMENT:
          return (
            <Comment
              key={statement.id}
              statement={statement}
              path={this.props.path}
              stateKeys={['statements', i]}
            />
          );
        case STATEMENT_TYPES.LINE:
          return (
            <Line
              key={statement.id}
              statement={statement}
              path={this.props.path}
              stateKeys={['statements', i]}
            />
          );
        case STATEMENT_TYPES.FUNCTION:
          return (
            <Function
              key={statement.id}
              statement={statement}
              path={this.props.path}
              stateKeys={['statements', i]}
            />
          );
        default:
          console.warn('Unsupported type', statement);
          return null;
      }
    });
  }
  render() {
    return (
      <article className='StatementBlock'>{this.renderStatements()}</article>
    );
  }
}
