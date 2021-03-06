/* eslint-disable no-unused-vars */

import { fromDraft } from './fromDraft';
import { compare } from '../../comparision/compare';
import fixture from '../../../../../../e2e/tests/fixtures/intro.json';
import complexFixture from '../../../../../../e2e/tests/fixtures/migration-content.json';
import { getTextNodes } from './getTextNodes';
import ricosFixture from './migratedFixtures/intro.json';
import complexRicosFixture from './migratedFixtures/migration-content.json';

const filterKeys = objArr => objArr.map(({ key, ...rest }) => rest); //disable
describe('migrate from draft', () => {
  it('should migrate intro fixture', () => {
    expect(compare(fromDraft(fixture), ricosFixture, { ignoredKeys: ['key'] })).toEqual({});
  });

  it('should migrate complex fixture', () => {
    expect(
      compare(fromDraft(complexFixture), complexRicosFixture, { ignoredKeys: ['key'] })
    ).toEqual({});
  });

  it('should overlap styles', () => {
    const block = {
      key: 'foo',
      text: 'blah blah blah',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [
        {
          offset: 3,
          length: 3,
          style: 'ITALIC',
        },
        {
          offset: 5,
          length: 5,
          style: 'UNDERLINE',
        },
        {
          offset: 8,
          length: 4,
          style: 'BOLD',
        },
      ],
      entityRanges: [],
    };

    const expectedResults = [
      { key: '2k4v1', nodes: [], ricosText: { decorations: [], text: 'bla' }, type: 'text' },
      {
        key: '1ba7b',
        nodes: [],
        ricosText: { decorations: [{ type: 'italic' }], text: 'h ' },
        type: 'text',
      },
      {
        key: '59lhm',
        nodes: [],
        ricosText: { decorations: [{ type: 'italic' }, { type: 'underline' }], text: 'b' },
        type: 'text',
      },
      {
        key: '1agl0',
        nodes: [],
        ricosText: { decorations: [{ type: 'underline' }], text: 'la' },
        type: 'text',
      },
      {
        key: '1m39g',
        nodes: [],
        ricosText: { decorations: [{ type: 'underline' }, { type: 'bold' }], text: 'h ' },
        type: 'text',
      },
      {
        key: '8cr95',
        nodes: [],
        ricosText: { decorations: [{ type: 'bold' }], text: 'bl' },
        type: 'text',
      },
      { key: 'dkn86', nodes: [], ricosText: { decorations: [], text: 'ah' }, type: 'text' },
    ];

    const entityMap = {};
    expect(filterKeys(getTextNodes(block, entityMap))).toEqual(filterKeys(expectedResults));
  });

  it('should detect mentions', () => {
    const block = {
      key: 'fcm70',
      text: 'Mentions too @Test One ',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [
        {
          offset: 13,
          length: 9,
          key: 0,
        },
      ],
      data: {},
    };
    const entityMap = {
      '0': {
        type: 'mention',
        mutability: 'SEGMENTED',
        data: {
          mention: {
            name: 'Test One',
            slug: 'testone',
          },
        },
      },
    };

    const expectedResult = [
      { nodes: [], ricosText: { decorations: [], text: 'Mentions too ' }, type: 'text' },
      {
        nodes: [],
        ricosText: {
          decorations: [
            {
              ricosMention: {
                name: 'Test One',
                slug: 'testone',
              },
              type: 'ricos_mention',
            },
          ],
          text: '@Test One',
        },
        type: 'text',
      },
      { nodes: [], ricosText: { decorations: [], text: ' ' }, type: 'text' },
    ];
    expect(filterKeys(getTextNodes(block, entityMap))).toEqual(expectedResult);
  });
});
