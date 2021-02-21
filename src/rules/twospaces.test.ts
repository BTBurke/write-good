import { test, expect } from '@jest/globals';
import { Document } from '../text/doc';
import { TwoSpacesRule } from './twospaces';
import { Ruleset } from './ruleset';

test('finds incorrect spacing', () => {
    const d = new Document('Emboff did something bad. I did something worse.')
    const r = new Ruleset([new TwoSpacesRule()])
    const hits = r.check(d);
    expect(hits.length).toBe(1);
    expect(hits[0].reason).toBe('Prefer two spaces between sentences (only one here)');
    expect(hits[0].index).toBe(24);
    expect(hits[0].offset).toBe(3);
})

test('doesnt find correct spacing', () => {
    const d = new Document('Emboff did something bad.  I did something worse.')
    const r = new Ruleset([new TwoSpacesRule()])
    const hits = r.check(d);
    expect(hits.length).toBe(0);
})

test('finds too many spaces', () => {
    const d = new Document('Emboff did something bad.   I did something worse.')
    const r = new Ruleset([new TwoSpacesRule()])
    const hits = r.check(d);
    expect(hits.length).toBe(1);
    expect(hits[0].reason).toBe('Prefer two spaces between sentences (3 here)');
    expect(hits[0].index).toBe(24);
    expect(hits[0].offset).toBe(5);
})