import React from 'react';

import { STATEMENT_TYPES } from '../../language-support';

import Comment from '../Comment';
import Line from '../Line';
import Function from '../Function';
import IfClause from '../If';
import Declaration from '../Declaration';
import Return from '../Return';

import './index.scss';

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
        case STATEMENT_TYPES.IF:
          return (
            <IfClause
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
        case STATEMENT_TYPES.RETURN:
          return (
            <Return
              key={statement.id}
              statement={statement}
              path={this.props.path}
              stateKeys={['statements', i]}
            />
          );
        case STATEMENT_TYPES.DECLARATION:
          return (
            <Declaration
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
