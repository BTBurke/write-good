import { ParagraphMarkingRule } from './classmark';
import { EmbassyOfficersRule } from './emboff';
import { MatchingPairsRule } from './matchingpairs';
import { OxfordCommaRule } from './oxfordcomma';
import { PassiveSentenceRule } from './passive';
import { TwoSpacesRule } from './twospaces';
import { Ruleset } from './ruleset';

export {
    Ruleset,
    ParagraphMarkingRule,
    EmbassyOfficersRule,
    MatchingPairsRule,
    OxfordCommaRule,
    PassiveSentenceRule,
    TwoSpacesRule,
}

export type { Hit } from './ruleset';

export const defaultRules = [
    new ParagraphMarkingRule(),
    new EmbassyOfficersRule(),
    new MatchingPairsRule(),
    new OxfordCommaRule(),
    new PassiveSentenceRule(),
    new TwoSpacesRule(),
]