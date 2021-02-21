import { Subject } from "rxjs";
import type { Editor } from "./editor";
import { debounceTime, distinctUntilChanged, throttleTime } from 'rxjs/operators';
import type { Ruleset } from "../rules/ruleset";
import { Document } from '../text/doc';

export class Engine {
    private contents = new Subject();
    private debouncedContents = this.contents.pipe(
        debounceTime(400),
        throttleTime(500),
    )

    constructor(q: Editor, ruleset: Ruleset) {
        this.debouncedContents.subscribe(c => {
            if (c) {
                if (c) {
                    const text = q.getText();
                    const doc = new Document(text);
                    const hits = ruleset.check(doc);
                    console.log('hits', hits);
                    q.highlightHits(hits);
                }
            }
        })
    }

    next(c: any) {
        this.contents.next(c);
    }
}