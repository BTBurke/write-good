import { test, expect } from '@jest/globals';
import { Document } from '../text/doc';
import { ParagraphMarkingRule } from './classmark';
import { Ruleset } from './ruleset';

test('finds missing classification markings', () => {
    const d = new Document('This is a paragraph without class marking. You know what to do.')
    const r = new Ruleset([new ParagraphMarkingRule()])
    const hits = r.check(d);
    expect(hits.length).toBe(1);
    expect(hits[0].reason).toBe('Paragraph is missing classification marking');
})

test('finds missing classification markings with para number and random spaces', () => {
    const d = new Document('10.  This is a paragraph without class marking. You know what to do.')
    const r = new Ruleset([new ParagraphMarkingRule()])
    const hits = r.check(d);
    expect(hits.length).toBe(1);
    expect(hits[0].reason).toBe('Paragraph is missing classification marking');
})

test('no hit when (SBU) classification marking and no para number', () => {
    const d = new Document('(SBU) This is a paragraph with class marking. You know what to do.')
    const r = new Ruleset([new ParagraphMarkingRule()])
    const hits = r.check(d);
    expect(hits.length).toBe(0);
})

test('no hit when (U) classification marking and no para number', () => {
    const d = new Document('(U) This is a paragraph with class marking. You know what to do.')
    const r = new Ruleset([new ParagraphMarkingRule()])
    const hits = r.check(d);
    expect(hits.length).toBe(0);
})

test('no hit when (U) classification marking and para number', () => {
    const d = new Document('1. (U) This is a paragraph with class marking. You know what to do.')
    const r = new Ruleset([new ParagraphMarkingRule()])
    const hits = r.check(d);
    expect(hits.length).toBe(0);
})

test('no hit when (SBU) classification marking and high para number', () => {
    const d = new Document('98. (SBU) This is a paragraph with class marking. You know what to do.')
    const r = new Ruleset([new ParagraphMarkingRule()])
    const hits = r.check(d);
    expect(hits.length).toBe(0);
})