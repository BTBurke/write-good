import { test, expect } from '@jest/globals';
import { Document } from '../text/doc';
import { OxfordCommaRule } from './oxfordcomma';
import { Ruleset } from './ruleset';

test('finds missing oxford comma', () => {
    const s = 'this, that and the other thing.'
    const d = new Document(s)
    const r = new Ruleset([new OxfordCommaRule()])
    const hits = r.check(d);
    expect(hits.length).toBe(1);
    expect(hits[0].reason).toBe('You may need an oxford comma here');
    expect(hits[0].index).toBe(0);
    expect(hits[0].offset).toBe(18); // this, that and the
})

test('doesnt find oxford comma', () => {
    const s = 'this, that, and the other thing.'
    const d = new Document(s)
    const r = new Ruleset([new OxfordCommaRule()])
    const hits = r.check(d);
    expect(hits.length).toBe(0);
})

test('finds complicated lists with missing oxford comma', () => {
    const s = 'this thing over here, that thing that does something else and the other thing.'
    const d = new Document(s)
    const r = new Ruleset([new OxfordCommaRule()])
    const hits = r.check(d);
    expect(hits.length).toBe(1);
    expect(hits[0].reason).toBe('You may need an oxford comma here');
})