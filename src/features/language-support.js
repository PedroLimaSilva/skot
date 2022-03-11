import { v4 as uuid } from 'uuid';

/* eslint-disable no-useless-computed-key */
export const STATEMENT_TYPES = {
  COMMENT: 'COMMENT',
  LINE: 'LINE',
  IF: 'IF',
  FUNCTION: 'FUNCTION',
};

export const STATEMENT_FACTORY = {
  [STATEMENT_TYPES.LINE]: (content = '') => ({
    id: uuid(),
    type: STATEMENT_TYPES.LINE,
    content,
  }),
  [STATEMENT_TYPES.COMMENT]: (content = '') => ({
    id: uuid(),
    type: STATEMENT_TYPES.COMMENT,
    content,
  }),
  [STATEMENT_TYPES.FUNCTION]: () => {
    const focusTarget = uuid();
    return {
      focusTarget,
      newBlocks: [
        STATEMENT_FACTORY[STATEMENT_TYPES.LINE](),
        {
          id: focusTarget,
          type: STATEMENT_TYPES.FUNCTION,
          name: 'functionName',
          returnType: 'Unit',
          args: [],
          statements: [{ id: uuid(), type: STATEMENT_TYPES.LINE, content: '' }],
        },
        STATEMENT_FACTORY[STATEMENT_TYPES.LINE](),
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
          id: focusTarget,
          type: STATEMENT_TYPES.IF,
          condition: '',
          statements: [{ id: uuid(), type: STATEMENT_TYPES.LINE, content: '' }],
        },
        STATEMENT_FACTORY[STATEMENT_TYPES.LINE](),
      ],
    };
  },
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
  },
};
