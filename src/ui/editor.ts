import Quill from 'quill';

let Inline = Quill.import('blots/inline');

class LinkBlot extends Inline {
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
LinkBlot.blotName = 'rule';
LinkBlot.tagName = 'span';

Quill.register(LinkBlot);


class Editor {
    private static instance: Editor;

    private q: Quill;

    private constructor() {
        this.q = new Quill('#editor', {
			theme: 'bubble',
			placeholder: 'Paste cable here...',
			formats: ['background', 'bold', 'italic', 'underline', 'indent', 'list', 'size', 'rule'],
        })
        Quill.register(LinkBlot);
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

    public format(index: number, length: number, text: string) {
        const delta = this.q.formatText(index, length, 'rule', text);
        console.log('delta', delta);
    }
}

export { Editor };