import { Hit, SentenceRule } from './ruleset';
import type { Sentence } from '../text/doc';


export class OxfordCommaRule extends SentenceRule {
    constructor() {
        super('Recommends use of the oxford comma');
    }

    checkS(s: Sentence): Hit[] {
        let hits: Hit[] = [];
        const re = /.*\,\s(\w+\s?)+ and (\w+)/ig; 
        const matches = s.regex(re);
        matches.forEach(match => {
            hits.push({
                reason: 'You may need an oxford comma here',
                index: match.index,
                offset: match.offset,
            })
        })
        return hits;
    }

}