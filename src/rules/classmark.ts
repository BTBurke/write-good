import { ParagraphRule, Hit } from './ruleset';
import type { Paragraph } from '../text/doc';

export class ParagraphMarkingRule extends ParagraphRule {
    constructor() {
        super("Checks for classification markings on paragraphs");
    }
    checkP(p: Paragraph): Hit[] {
        const re = /([0-9]+)?\.?(\s+)?\((U|SBU)\)\s/
        const matches = p.regex(re);
        if (matches.length === 0) {
            return [{
                reason: "Paragraph is missing classification marking",
                index: 0,
                offset: 3
            }]
        }
        return [];
    }
}