import type { Document, Paragraph, Sentence } from '../text/doc';

export interface Hit {
    reason: string;
    index: number;
    offset: number;
}

abstract class Rule {
    constructor(public description: string) {}
    abstract checkP(p: Paragraph): Hit[]
    abstract checkS(s: Sentence): Hit[]
}

abstract class ParagraphRule extends Rule {
    // sentence checks are a no-op
    checkS(s: Sentence): Hit[] {
        return [];
    }
}

abstract class SentenceRule extends Rule {
    // paragraph checks are a no-op
    checkP(p: Paragraph): Hit[] {
        return [];
    }
}

class Ruleset {
    constructor(public rules: Rule[]) {}
    
    register(r: Rule) {
        this.rules.push(r);
    }

    check(d: Document): Hit[] {
        // wait until at least a parapraph marking before doing anything
        if (d.text.length <= 3) {
            return []
        }
        let hits: Hit[] = [];
        d.paragraphs.forEach(p => {
            // check rules for this paragraph
            this.rules.forEach(r => {
                hits = hits.concat(r.checkP(p));
            })
            p.sentences.forEach(s => {
                // check rules on each sentence
                this.rules.forEach(r => {
                    hits = hits.concat(r.checkS(s));
                })
            })
        })
        return hits
    }
}

export { ParagraphRule, SentenceRule, Rule, Ruleset };