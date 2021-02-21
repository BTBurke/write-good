import {test, expect} from '@jest/globals';
import { Document } from '../text/doc';
import { PassiveSentenceRule } from './passive';
import { Ruleset } from './ruleset';

test('finds basic passive sentences', () => {
    const d = new Document('It was eaten.')
    const r = new Ruleset([new PassiveSentenceRule()])
    const hits = r.check(d);
    expect(hits.length).toBe(1);
    expect(hits[0].reason).toBe('This may be a passive sentence');
})

test('does not find other constructions with past tense', () => {
    const d = new Document('It was yesterday.')
    const r = new Ruleset([new PassiveSentenceRule()])
    const hits = r.check(d);
    expect(hits.length).toBe(0);
})

test('finds past passive sentences', () => {
    const d = new Document('He has been fired.')
    const r = new Ruleset([new PassiveSentenceRule()])
    const hits = r.check(d);
    expect(hits.length).toBe(1);
    expect(hits[0].reason).toBe('This may be a passive sentence');
})

test('finds more complex passive clauses', () => {
    const d = new Document('It was interesting that he had been fired.')
    const r = new Ruleset([new PassiveSentenceRule()])
    const hits = r.check(d);
    expect(hits.length).toBe(1);
    expect(hits[0].reason).toBe('This may be a passive sentence');
})