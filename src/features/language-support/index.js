import { v4 as uuid } from 'uuid';

/* eslint-disable no-useless-computed-key */
export const STATEMENT_TYPES = {
  ASSIGNMENT: 'ASSIGNMENT',
  BINARY_EXPRESSION: 'BINARY_EXPRESSION',
  COMMENT: 'COMMENT',
  DECLARATION: 'DECLARATION',
  ELSE: 'ELSE',
  EXPRESSION: 'EXPRESSION',
  FOR: 'FOR',
  FUNCTION: 'FUNCTION',
  FUNCTION_CALL: 'FUNCTION_CALL',
  IF: 'IF',
  LINE: 'LINE',
  RETURN: 'RETURN',
  WHILE: 'WHILE',
};

export const STATEMENT_FACTORY = {
  [STATEMENT_TYPES.LINE]: (content = '') => ({
    _id: uuid(),
    _type: STATEMENT_TYPES.LINE,
    content,
  }),
  [STATEMENT_TYPES.COMMENT]: (content = '') => ({
    _id: uuid(),
    _type: STATEMENT_TYPES.COMMENT,
    content,
  }),
  [STATEMENT_TYPES.FUNCTION]: () => {
    const focusTarget = uuid();
    return {
      focusTarget,
      newBlocks: [
        {
          _id: focusTarget,
          _type: STATEMENT_TYPES.FUNCTION,
          args: [],
          name: 'functionName',
          returnType: 'Unit',
          statements: [STATEMENT_FACTORY[STATEMENT_TYPES.LINE]()],
        },
        STATEMENT_FACTORY[STATEMENT_TYPES.LINE](),
      ],
    };
  },
  [STATEMENT_TYPES.RETURN]: () => {
    const focusTarget = uuid();
    return {
      focusTarget,
      newBlocks: [
        {
          _id: focusTarget,
          _type: STATEMENT_TYPES.RETURN,
          content: {
            _id: uuid(),
            _type: STATEMENT_TYPES.EXPRESSION,
            content: 'value',
          },
        },
      ],
    };
  },
  [STATEMENT_TYPES.IF]: () => {
    const focusTarget = uuid();
    return {
      focusTarget,
      newBlocks: [
        {
          _id: uuid(),
          _type: STATEMENT_TYPES.IF,
          condition: {
            _id: focusTarget,
            _type: STATEMENT_TYPES.EXPRESSION,
            content: 'true',
          },
          elseBlock: [STATEMENT_FACTORY[STATEMENT_TYPES.LINE]()], // [] else statements
          statements: [STATEMENT_FACTORY[STATEMENT_TYPES.LINE]()],
        },
        STATEMENT_FACTORY[STATEMENT_TYPES.LINE](),
      ],
    };
  },
  [STATEMENT_TYPES.DECLARATION]: (isVariable) => {
    const focusTarget = uuid();
    return {
      focusTarget,
      newBlocks: [
        {
          _id: focusTarget,
          _type: STATEMENT_TYPES.DECLARATION,
          content: {
            _id: uuid(),
            _type: STATEMENT_TYPES.EXPRESSION,
            content: 'value',
          },
          isVariable,
          name: 'name',
        },
        STATEMENT_FACTORY[STATEMENT_TYPES.LINE](),
      ],
    };
  },
  [STATEMENT_TYPES.WHILE]: () => {
    const focusTarget = uuid();
    return {
      focusTarget,
      newBlocks: [
        {
          _id: focusTarget,
          _type: STATEMENT_TYPES.WHILE,
          condition: {
            _id: focusTarget,
            _type: STATEMENT_TYPES.EXPRESSION,
            content: 'false',
          },
          statements: [
            { _id: uuid(), _type: STATEMENT_TYPES.LINE, content: '' },
          ],
        },
        STATEMENT_FACTORY[STATEMENT_TYPES.LINE](),
      ],
    };
  },
  /*
  [STATEMENT_TYPES.FOR]: () => {
    const focusTarget = uuid();
    return {
      focusTarget,
      newBlocks: [
        STATEMENT_FACTORY[STATEMENT_TYPES.LINE](),
        {
          _id: focusTarget,
          _type: STATEMENT_TYPES.FOR,
          condition: 'item in array',
          statements: [{ _id: uuid(), _type: STATEMENT_TYPES.LINE, content: '' }],
        },
        STATEMENT_FACTORY[STATEMENT_TYPES.LINE](),
      ],
    };
  },
  */
};

export const SUPPORTED_LANGUAGES = {
  KOTLIN: 'KOTLIN',
};

window.__LANGUAGE_SUPPORT = { language: SUPPORTED_LANGUAGES.KOTLIN };

export const KEYSTROKE_MAP = {
  [SUPPORTED_LANGUAGES.KOTLIN]: {
    ['fun ']: STATEMENT_FACTORY[STATEMENT_TYPES.FUNCTION],
    ['if ']: STATEMENT_FACTORY[STATEMENT_TYPES.IF],
    ['if(']: STATEMENT_FACTORY[STATEMENT_TYPES.IF],
    ['return ']: STATEMENT_FACTORY[STATEMENT_TYPES.RETURN],
    ['val ']: STATEMENT_FACTORY[STATEMENT_TYPES.DECLARATION],
    ['var ']: () => STATEMENT_FACTORY[STATEMENT_TYPES.DECLARATION](true),
    // ['// ']: STATEMENT_FACTORY[STATEMENT_TYPES.DECLARATION],
    ['while ']: STATEMENT_FACTORY[STATEMENT_TYPES.WHILE],
    ['while(']: STATEMENT_FACTORY[STATEMENT_TYPES.WHILE],
    // ['for']: STATEMENT_FACTORY[STATEMENT_TYPES.FOR],
  },
};

// TODO: check if this is necessary
export const NESTING_BLACKLIST = {
  [SUPPORTED_LANGUAGES.KOTLIN]: {
    [STATEMENT_TYPES.IF]: [STATEMENT_TYPES.FUNCTION],
    [STATEMENT_TYPES.WHILE]: [STATEMENT_TYPES.FUNCTION],
    [STATEMENT_TYPES.FOR]: [STATEMENT_TYPES.FUNCTION],
    [STATEMENT_TYPES.FUNCTION]: [],
  },
};
