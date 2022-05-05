import { v4 as uuid } from 'uuid';

/* eslint-disable no-useless-computed-key */
export const STATEMENT_TYPES = {
  COMMENT: 'COMMENT',
  DECLARATION: 'DECLARATION',
  ELSE: 'ELSE',
  FOR: 'FOR',
  FUNCTION: 'FUNCTION',
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
        STATEMENT_FACTORY[STATEMENT_TYPES.LINE](),
        {
          _id: focusTarget,
          _type: STATEMENT_TYPES.FUNCTION,
          args: [],
          name: 'functionName',
          returnType: 'Unit',
          statements: STATEMENT_FACTORY[STATEMENT_TYPES.LINE](''),
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
        STATEMENT_FACTORY[STATEMENT_TYPES.LINE](),
        {
          _id: focusTarget,
          _type: STATEMENT_TYPES.RETURN,
          content: '',
        },
      ],
    };
  },
  [STATEMENT_TYPES.IF]: () => {
    const focusTarget = uuid();
    return {
      focusTarget,
      newBlocks: [
        STATEMENT_FACTORY[STATEMENT_TYPES.LINE](),
        {
          _id: focusTarget,
          _type: STATEMENT_TYPES.IF,
          condition: '',
          statements: [STATEMENT_FACTORY[STATEMENT_TYPES.LINE]()],
        },
        STATEMENT_FACTORY[STATEMENT_TYPES.LINE](),
      ],
    };
  },
  [STATEMENT_TYPES.DECLARATION]: () => {
    const focusTarget = uuid();
    return {
      focusTarget,
      newBlocks: [
        {
          _id: focusTarget,
          _type: STATEMENT_TYPES.DECLARATION,
          content: '',
          name: '',
        },
      ],
    };
  },
  /*
  [STATEMENT_TYPES.ELSE]: () => {
    const focusTarget = uuid();
    return {
      focusTarget,
      newBlocks: [
        STATEMENT_FACTORY[STATEMENT_TYPES.LINE](),
        {
          _id: uuid(),
          _type: STATEMENT_TYPES.ELSE,
          statements: [{ _id: focusTarget, _type: STATEMENT_TYPES.LINE, content: '' }],
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
        STATEMENT_FACTORY[STATEMENT_TYPES.LINE](),
        {
          _id: focusTarget,
          _type: STATEMENT_TYPES.WHILE,
          condition: '',
          statements: [{ _id: uuid(), _type: STATEMENT_TYPES.LINE, content: '' }],
        },
        STATEMENT_FACTORY[STATEMENT_TYPES.LINE](),
      ],
    };
  },
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
    ['fun']: STATEMENT_FACTORY[STATEMENT_TYPES.FUNCTION],
    ['if ']: STATEMENT_FACTORY[STATEMENT_TYPES.IF],
    ['if(']: STATEMENT_FACTORY[STATEMENT_TYPES.IF],
    ['re']: STATEMENT_FACTORY[STATEMENT_TYPES.RETURN],
    ['var ']: STATEMENT_FACTORY[STATEMENT_TYPES.DECLARATION],
    // ['while']: STATEMENT_FACTORY[STATEMENT_TYPES.WHILE],
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
