import { Hit, SentenceRule } from "./ruleset";
import type { Sentence } from "../text/doc";
import type { POS } from '../text/pos';
import { pluck, or, equals, any, not, filter, map } from 'ramda';

export class PassiveSentenceRule extends SentenceRule {
    constructor() {
        super('Finds passive sentences');
    }

    checkS(s: Sentence): Hit[] {
        const re = /(am|are|were|being|is|been|was|be)/ig;
        const matches = s.regex(re)
        if (matches.length !== 0 && hasAnotherVerb(s)) {
            return [{
                reason: 'This may be a passive sentence',
                index: s.index,
                offset: s.text.length,
            }]
        }
        return [];
    }
}


const hasAnotherVerb = (s: Sentence): boolean => {
    // filter out the initial trigger word
    const fn = (w: POS): boolean => {
        switch(w.text) {
            case "am":
                return false;
            case "are":
                return false;
            case "were":
                return false;
            case "being":
                return false;
            case "is":
                return false;
            case "been":
                return false;
            case "was":
                return false;
            case "be":
                return false;
            default:
                return true;
        }
    }
    const filteredPOS = filter(fn, s.pos);

    // look for another verb in a form that indicates possible passive construction
    var getPartofSpeech = pluck('pos');
    var isPassiveVerbConstruction = (pos: string): boolean => {
        switch(pos) {
            case "VBD":
                return true;
            case "VBG":
                return true;
            case "VBN":
                return true;
            default:
                return false
        }
    }
    const partsOfSpeech = getPartofSpeech(filteredPOS);
    return any(isPassiveVerbConstruction, partsOfSpeech);
} 