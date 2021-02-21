import { Hit, ParagraphRule } from './ruleset';
import type { Paragraph } from '../text/doc';


export class TwoSpacesRule extends ParagraphRule {
    constructor() {
        super('Ensures there are two spaces between sentences');
    }

    checkP(p: Paragraph): Hit[] {
        let hits: Hit[] = [];
        const re = /\.\s[A-Z]/g;
        const matches = p.regex(re);
        matches.forEach(match => {
            hits.push({
                reason: 'Prefer two spaces between sentences (only one here)',
                index: match.index,
                offset: match.offset,
            })
        });

        // too many spaces
        const re2 = /\.\s{2}\s+[A-Z]/g;
        const matches2 = p.regex(re2);
        matches2.forEach(match => {
            const spLen = match.offset-2;
            hits.push({
                reason: `Prefer two spaces between sentences (${spLen} here)`,
                index: match.index,
                offset: match.offset,
            })
        });
        return hits;
    }
}