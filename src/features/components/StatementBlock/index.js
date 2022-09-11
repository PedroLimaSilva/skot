import React from 'react';

import { STATEMENT_TYPES } from '../../language-support';

import Assignment from '../Assignment';
import Comment from '../Comment';
import Line from '../Line';
import Function from '../Function';
import FunctionCall from '../Function/Call';
import IfClause from '../If';
import Declaration from '../Declaration';
import Return from '../Return';
import WhileClause from '../While';

import './index.scss';

export class StatementBlock extends React.Component {
  renderStatements() {
    const { statementBlockName = 'statements' } = this.props;

    return this.props.statements?.map((statement, i) => {
      switch (statement._type) {
        case STATEMENT_TYPES.ASSIGNMENT:
          return (
            <Assignment
              key={statement._id}
              statement={statement}
              path={this.props.path}
              stateKeys={[statementBlockName, i]}
            />
          );
        case STATEMENT_TYPES.COMMENT:
          return (
            <Comment
              key={statement._id}
              statement={statement}
              path={this.props.path}
              stateKeys={[statementBlockName, i]}
            />
          );
        case STATEMENT_TYPES.LINE:
          return (
            <Line
              key={statement._id}
              statement={statement}
              path={this.props.path}
              stateKeys={[statementBlockName, i]}
            />
          );
        case STATEMENT_TYPES.IF:
          return (
            <IfClause
              key={statement._id}
              statement={statement}
              path={this.props.path}
              stateKeys={[statementBlockName, i]}
            />
          );
        case STATEMENT_TYPES.FUNCTION:
          return (
            <Function
              key={statement._id}
              statement={statement}
              path={this.props.path}
              stateKeys={[statementBlockName, i]}
            />
          );
        case STATEMENT_TYPES.RETURN:
          return (
            <Return
              key={statement._id}
              statement={statement}
              path={this.props.path}
              stateKeys={[statementBlockName, i]}
            />
          );
        case STATEMENT_TYPES.DECLARATION:
          return (
            <Declaration
              key={statement._id}
              statement={statement}
              path={this.props.path}
              stateKeys={[statementBlockName, i]}
            />
          );
        case STATEMENT_TYPES.FUNCTION_CALL:
          return (
            <FunctionCall
              key={statement._id}
              statement={statement}
              path={this.props.path}
              stateKeys={[statementBlockName, i]}
            />
          );
        case STATEMENT_TYPES.WHILE:
          return (
            <WhileClause
              key={statement._id}
              statement={statement}
              path={this.props.path}
              stateKeys={[statementBlockName, i]}
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
