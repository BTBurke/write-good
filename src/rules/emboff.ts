import { Hit, SentenceRule } from './ruleset';
import type { Sentence } from '../text/doc';

export class EmbassyOfficersRule extends SentenceRule {
    constructor() {
        super('Checks for misspellings of embassy officer abbreviations');
    }
    checkS(s: Sentence): Hit[] {
        const re = /(Emboff|emboff|Poloff|poloff|CDA|Econoff|econoff)/;
        const matches = s.regex(re);
        let hits: Hit[] = [];
        matches.forEach(match => {
            hits.push({
                reason: getReason(match.found),
                index: match.index,
                offset: match.offset,
            });
        })
        return hits;
    }

}

const getReason = (s: string): string => {
    switch(s.toLowerCase()) {
        case "emboff":
            return `Prefer EmbOff to ${s}`;
        case "cda":
            return 'Prefer Chargé (or Charge) to CDA';
        case "poloff":
            return `Prefer PolOff to ${s}`;
        case "econoff":
            return `Prefer EconOff to ${s}`;
        default:
            return 'Positions should be camel case like PolOff instead of Poloff';
    }
}