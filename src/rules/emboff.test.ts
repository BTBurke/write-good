import { test, expect } from '@jest/globals';
import { Document } from '../text/doc';
import { EmbassyOfficersRule } from './emboff';
import { Ruleset } from './ruleset';

test('finds incorrect EmbOff', () => {
    const d = new Document('Emboff did something bad.')
    const r = new Ruleset([new EmbassyOfficersRule()])
    const hits = r.check(d);
    expect(hits.length).toBe(1);
    expect(hits[0].reason).toBe('Prefer EmbOff to Emboff');
})

test('no problem with correct EmbOff', () => {
    const d = new Document('EmbOff did something bad.')
    const r = new Ruleset([new EmbassyOfficersRule()])
    const hits = r.check(d);
    expect(hits.length).toBe(0);
})

test('finds incorrect PolOff', () => {
    const d = new Document('Poloff did something bad.')
    const r = new Ruleset([new EmbassyOfficersRule()])
    const hits = r.check(d);
    expect(hits.length).toBe(1);
    expect(hits[0].reason).toBe('Prefer PolOff to Poloff');
})

test('finds use of CDA', () => {
    const d = new Document('CDA did something bad.')
    const r = new Ruleset([new EmbassyOfficersRule()])
    const hits = r.check(d);
    expect(hits.length).toBe(1);
    expect(hits[0].reason).toBe('Prefer Chargé (or Charge) to CDA');
})