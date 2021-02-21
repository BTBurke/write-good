import { applyRegex } from './doc';
import { test, expect } from '@jest/globals';

test('regex matches on sentences', () => {
    const r = new RegExp(/abc/, 'i');
    const matches = applyRegex(r, 'abcABC', 0);
    expect(matches.length).toBe(2);
    expect(matches[0]).toEqual({found: 'abc', index: 0, offset: 3});
    expect(matches[1]).toEqual({found: 'ABC', index: 3, offset: 3});
});