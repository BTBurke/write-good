import { reduce } from 'ramda';
import { POS, Tagger } from './pos';

class Document {
    text: string;
    paragraphs: Paragraph[] = [];

    constructor(text: string) {
        this.text = text;
        const p = text.split("\n\n");
        const acc = (index, para) => {
            this.paragraphs.push(new Paragraph(para, index));
            return index + para.length + 2;
        }
        reduce(acc, 0, p);
    }
}

class Paragraph {
    // absolute start index of this paragraph in document
    index: number;
    text: string;
    sentences: Sentence[] = [];

    constructor(text: string, index: number) {
        console.log(`Paragraph at offset ${index}:\n${text}`);
        this.text = text;
        this.index = index;
        
        const s = text.split('.');
        const acc = (idx, sent) => {
            this.sentences.push(new Sentence(sent, idx));
            return idx + sent.length + 1;
        }
        reduce(acc, index, s);
    }

    public regex(re: RegExp): TextResult[] {
        return applyRegex(re, this.text, this.index);
    }
}

// Sentence
class Sentence {
    text: string;
    // absolute start index of this sentence in the document
    index: number;
    // parts of speech tagger with absolute index values within document
    pos: POS[];

    constructor(text: string, index: number) {
        this.text = text;
        this.index = index;
        this.pos = new Tagger(text, index).results;
        console.log(`Sentence at offset ${index}:\n${text}\nWith POS:`);
        console.log(this.pos);
    }

    public regex(re: RegExp): TextResult[] {
        return applyRegex(re, this.text, this.index);
    }
}

export interface TextResult {
    found: string;
    index: number;
    offset: number;
}

// applies given regex and returns results with index as absolute position within the overall
// document
export function applyRegex(regex: RegExp, text: string, index: number): TextResult[] {
    let res;
    // ensures that global flag is set to prevent infinite loop
    const re = globalizeRegex(regex);
    let results: TextResult[] = [];
    while ((res = re.exec(text)) !== null) {
        console.log('reg', res);
        results.push({
            found: res[0],
            index: res.index + index,
            offset: res[0].length, 
        });
    }
    return results;
}

// ensures global flag set in addition to any other multiline or case-insensitive
// options.  This is required for regex to halt.
const globalizeRegex = (r: RegExp): RegExp => {
    if (r.global) {
        return r;
    }
    switch (true) {
        case r.multiline && r.ignoreCase:
            return new RegExp(r, 'igm');
        case r.multiline:
            return new RegExp(r, 'gm');
        case r.ignoreCase:
            return new RegExp(r, 'ig');
        default:
            return new RegExp(r, 'g');
    }
}

export { Document, Paragraph, Sentence };