import { test, expect } from '@jest/globals';
import { Document } from '../text/doc';
import { MatchingPairsRule } from './matchingpairs';
import { Ruleset } from './ruleset';

test('finds missing close summary', () => {
    const d = new Document('Summary: Emboff did something bad.  I did something worse.')
    const r = new Ruleset([new MatchingPairsRule()])
    const hits = r.check(d);
    expect(hits.length).toBe(1);
    expect(hits[0].reason).toBe('Summary must have a matching End summary');
    expect(hits[0].index).toBe(0);
    expect(hits[0].offset).toBe(8);
})

test('ignores properly closed summary', () => {
    const d = new Document('Summary: Emboff did something bad.  I did something worse.  End summary.')
    const r = new Ruleset([new MatchingPairsRule()])
    const hits = r.check(d);
    expect(hits.length).toBe(0);
})

test('finds missing close comment', () => {
    const d = new Document('Comment: Emboff did something bad.  I did something worse.')
    const r = new Ruleset([new MatchingPairsRule()])
    const hits = r.check(d);
    expect(hits.length).toBe(1);
    expect(hits[0].reason).toBe('Comment must have a matching End comment');
    expect(hits[0].index).toBe(0);
    expect(hits[0].offset).toBe(8);
})

test('ignores properly closed comment', () => {
    const d = new Document('Comment: Emboff did something bad.  I did something worse.  End comment.')
    const r = new Ruleset([new MatchingPairsRule()])
    const hits = r.check(d);
    expect(hits.length).toBe(0);
})

test('finds missing close note', () => {
    const d = new Document('Note: Emboff did something bad.  I did something worse.')
    const r = new Ruleset([new MatchingPairsRule()])
    const hits = r.check(d);
    expect(hits.length).toBe(1);
    expect(hits[0].reason).toBe('Note must have a matching End note');
    expect(hits[0].index).toBe(0);
    expect(hits[0].offset).toBe(5);
})

test('ignores properly closed note', () => {
    const d = new Document('Note: Emboff did something bad.  I did something worse.  End note.')
    const r = new Ruleset([new MatchingPairsRule()])
    const hits = r.check(d);
    expect(hits.length).toBe(0);
})