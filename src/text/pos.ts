import pos from 'pos';

const extraTags = [
    {'SBU': ['CLS']},
    {'U': ['CLS']},
];

export interface POS {
    text: string;
    pos: string;
    index: number;
    offset: number;
}

export class Tagger {
    results: POS[] = [];

    constructor(text: string, offset: number) {
        const words = new pos.Lexer().lex(text);
        const tagger = new pos.Tagger();
        extraTags.forEach(ex => {
            tagger.extendLexicon(ex);
        });
        tagger.tag(words).forEach(res => {
            this.results.push({
                text: res[0],
                pos: res[1],
                index: text.indexOf(` ${res[0]}`)+offset+1,
                offset: res[0].length,
            });
        });
    }
}
