import { v4 as uuid } from 'uuid';
import {
  STATEMENT_FACTORY,
  STATEMENT_TYPES,
} from '../../../features/language-support';

export const initialState = {
  _id: uuid(),
  statements: [
    STATEMENT_FACTORY[STATEMENT_TYPES.LINE]('this is a line'),
    STATEMENT_FACTORY[STATEMENT_TYPES.COMMENT]('this is a comment'),
    STATEMENT_FACTORY[STATEMENT_TYPES.LINE](''),
    {
      _id: 'init_function',
      _type: STATEMENT_TYPES.FUNCTION,
      args: [
        { name: 'a', type: 'Number' },
        { name: 'b', type: 'Number' },
      ],
      name: 'functionName',
      returnType: 'Unit',
      statements: [
        STATEMENT_FACTORY[STATEMENT_TYPES.LINE](''),
        {
          _id: 'init_declaration',
          _type: STATEMENT_TYPES.DECLARATION,
          content: {
            _id: uuid(),
            _type: STATEMENT_TYPES.EXPRESSION,
            content: '10',
          },
          name: 'variable',
        },
        {
          _id: 'init_declaration2',
          _type: STATEMENT_TYPES.DECLARATION,
          content: {
            _id: uuid(),
            _type: STATEMENT_TYPES.BINARY_EXPRESSION,
            content: [
              {
                _id: uuid(),
                _type: STATEMENT_TYPES.BINARY_EXPRESSION,
                content: [
                  {
                    _id: uuid(),
                    _type: STATEMENT_TYPES.EXPRESSION,
                    content: '10',
                  },
                  {
                    _id: uuid(),
                    _type: STATEMENT_TYPES.EXPRESSION,
                    content: '500',
                  },
                ],
                operator: '-',
              },
            ],
          },
          name: 'variable',
        },
        STATEMENT_FACTORY[STATEMENT_TYPES.COMMENT]('this is a comment'),
        STATEMENT_FACTORY[STATEMENT_TYPES.LINE](''),
      ],
    },
    STATEMENT_FACTORY[STATEMENT_TYPES.LINE](''),
  ],
};
