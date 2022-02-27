import React from 'react';

import { Comment } from '../comment';
import { Line } from '../line';
import './index.scss';

import { STATEMENT_TYPES } from '../../store/reducers/file';

export class StatementBlock extends React.Component {
  renderStatements() {
    console.log(this.props);
    return this.props.statements?.map((statement) => {
      switch (statement.type) {
        case STATEMENT_TYPES.COMMENT:
          return <Comment key={statement.id} statement={statement} />;
        case STATEMENT_TYPES.LINE:
          return <Line key={statement.id} statement={statement} />;
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
