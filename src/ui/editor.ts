import Quill from 'quill';
import type { Hit } from '../rules/ruleset';

let Inline = Quill.import('blots/inline');

class RuleBlot extends Inline {
  static blotName = 'rule';
  static tagName = 'span';
  static create(value) {
    let node = super.create();
    // Sanitize url value if desired
    // Okay to set other non-format related attributes
    // These are invisible to Parchment so must be static
    node.setAttribute('data-tooltip', true);
    node.setAttribute('title', value);
    //node.setAttribute('style', "background: red;");
    node.setAttribute('class', "rule");
    
    return node;
  }

  static formats(node) {
    // We will only be called with a node already
    // determined to be a Link blot, so we do
    // not need to check ourselves
    return node.getAttribute('title') || true;
  }
}

Quill.register(RuleBlot);


class Editor {
    private static instance: Editor;

    private q: Quill;


    private constructor() {
        this.q = new Quill('#editor', {
			theme: 'bubble',
			placeholder: 'Paste cable here...',
			formats: ['background', 'bold', 'italic', 'underline', 'indent', 'size', 'rule'],
        })
        Quill.register(RuleBlot);
     }

    public static getInstance(): Editor {
        if (!Editor.instance) {
            Editor.instance = new Editor();
        }

        return Editor.instance;
    }

    public on(event: String, f) {
        this.q.on(event, f);
    }

    public getContents() {
        return this.q.getContents();
    }

    public getText() {
        return this.q.getText();
    }

    public highlightHits(hits: Hit[]) {
        // sorts by end of the span in reverse order.  Applying rules from the end
        // of the doc to the beginning.
        hits.sort((a,b)=> { return (b.index+b.offset)-(a.index+a.offset) } )
        // blow away all prior rule formatting
        this.q.formatText(0, this.q.getText().length, 'rule', false);
        hits.forEach((hit, i) => {
            const ruleNumber: number = i % 5;
            this.q.formatText(hit.index, hit.offset, 'rule', hit.reason);
        });
    }
}

export { Editor };