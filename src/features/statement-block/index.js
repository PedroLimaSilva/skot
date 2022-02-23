import React from 'react';
import { useSelector } from 'react-redux';
import { Comment } from '../comment';
import './index.scss';
import { STATEMENT_TYPES } from './slice';

const STATEMENT_COMPONENT_MAP = {
  [STATEMENT_TYPES.COMMENT]: Comment,
  [STATEMENT_TYPES.LINE]: (statement) => <p>{statement.content}</p>,
};

export const StatementBlock = () => {
  const statements = useSelector((state) => state.module.statements);

  const renderStatements = statements.map((statement) =>
    STATEMENT_COMPONENT_MAP[statement.type](statement)
  );

  return <article className='StatementBlock'>{renderStatements}</article>;
};
