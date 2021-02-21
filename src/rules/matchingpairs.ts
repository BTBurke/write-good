import { ParagraphRule, Hit } from './ruleset';
import type { Paragraph } from '../text/doc';

export class MatchingPairsRule extends ParagraphRule {
    private pairs = [
        [/Summary:/g, /End summary/g, 'Summary must have a matching End summary'],
        [/Note:/g, /End note/g, 'Note must have a matching End note'],
        [/Comment:/g, /End comment/g, 'Comment must have a matching End comment']
    ];

    constructor() {
        super('Ensures that summaries, comments, and notes are formatted correctly');
    }

    checkP(p: Paragraph): Hit[] {
        let hits: Hit[] = [];
        this.pairs.forEach(pair => {
            const matchOpen = p.regex(pair[0] as RegExp);
            if (matchOpen.length !== 0) {
                const matchClose = p.regex(pair[1] as RegExp);
                if (matchClose.length === 0) {
                    hits.push({
                        reason: pair[2] as string,
                        index: matchOpen[0].index,
                        offset: matchOpen[0].offset,
                    })
                }
            }
        })
        return hits;
    }
}