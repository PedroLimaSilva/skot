import { v4 as uuid } from 'uuid';
import {
  STATEMENT_FACTORY,
  STATEMENT_TYPES,
} from '../../../features/language-support';

export const initialState = {
  _id: uuid(),
  statements: [
    STATEMENT_FACTORY[STATEMENT_TYPES.LINE](`Lines that look gray won't run`),
    // STATEMENT_FACTORY[STATEMENT_TYPES.COMMENT]('this is a comment'),
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
          isVariable: true,
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
              {
                _id: uuid(),
                _type: STATEMENT_TYPES.BINARY_EXPRESSION,
                content: [
                  {
                    _id: uuid(),
                    _type: STATEMENT_TYPES.EXPRESSION,
                    content: '3',
                  },
                  {
                    _id: uuid(),
                    _type: STATEMENT_TYPES.EXPRESSION,
                    content: '5',
                  },
                ],
                operator: '/',
              },
            ],
            operator: '+',
          },
          isVariable: false,
          name: 'value',
        },
        // STATEMENT_FACTORY[STATEMENT_TYPES.COMMENT]('this is a comment'),
        STATEMENT_FACTORY[STATEMENT_TYPES.LINE](''),
        {
          _id: uuid(),
          _type: STATEMENT_TYPES.ASSIGNMENT,
          content: {
            _id: uuid(),
            _type: STATEMENT_TYPES.EXPRESSION,
            content: '10',
          },
          name: 'value',
        },
        STATEMENT_FACTORY[STATEMENT_TYPES.LINE](''),
        {
          _id: uuid(),
          _type: STATEMENT_TYPES.FUNCTION_CALL,
          args: [
            {
              _id: uuid(),
              _type: STATEMENT_TYPES.EXPRESSION,
              content: '10',
            },
            {
              _id: uuid(),
              _type: STATEMENT_TYPES.EXPRESSION,
              content: '20',
            },
          ],
          functionName: 'functionName',
        },
        STATEMENT_FACTORY[STATEMENT_TYPES.LINE](''),
      ],
    },
    STATEMENT_FACTORY[STATEMENT_TYPES.LINE](''),
    {
      _id: 'function2',
      _type: STATEMENT_TYPES.FUNCTION,
      args: [{ name: 'a', type: 'String' }],
      name: 'testIf',
      returnType: 'Boolean',
      statements: [
        STATEMENT_FACTORY[STATEMENT_TYPES.LINE](''),
        {
          _id: 'init_declaration2',
          _type: STATEMENT_TYPES.DECLARATION,
          content: {
            _id: uuid(),
            _type: STATEMENT_TYPES.EXPRESSION,
            content: '10',
          },
          isVariable: true,
          name: 'variable',
        },
        // STATEMENT_FACTORY[STATEMENT_TYPES.COMMENT]('this is a comment'),
        STATEMENT_FACTORY[STATEMENT_TYPES.LINE](''),
        {
          _id: uuid(),
          _type: STATEMENT_TYPES.IF,
          condition: {
            _id: uuid(),
            _type: STATEMENT_TYPES.EXPRESSION,
            content: 'true',
          },
          elseBlock: [STATEMENT_FACTORY[STATEMENT_TYPES.LINE]('')], // [] else statements
          statements: [STATEMENT_FACTORY[STATEMENT_TYPES.LINE]()],
        },
        STATEMENT_FACTORY[STATEMENT_TYPES.LINE](''),
      ],
    },
    STATEMENT_FACTORY[STATEMENT_TYPES.LINE](''),
  ],
};
