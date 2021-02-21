import Quill from 'quill';

let Inline = Quill.import('blots/inline');

export class Rule0 extends Inline {
    static blotName = 'rule0';
    static tagName = 'span';
    static create(value) {
      let node = super.create();
      // Sanitize url value if desired
      // Okay to set other non-format related attributes
      // These are invisible to Parchment so must be static
      node.setAttribute('data-tooltip', true);
      node.setAttribute('title', value);
      //node.setAttribute('style', "background: red;");
      node.setAttribute('class', "rule0");
      
      return node;
    }
  
    static formats(node) {
      // We will only be called with a node already
      // determined to be a Link blot, so we do
      // not need to check ourselves
      return node.getAttribute('title') || true;
    }
  }
  
  Quill.register(Rule0);

export class Rule1 extends Inline {
  static blotName = 'rule1';
  static tagName = 'span';
  static create(value) {
    let node = super.create();
    // Sanitize url value if desired
    // Okay to set other non-format related attributes
    // These are invisible to Parchment so must be static
    node.setAttribute('data-tooltip', true);
    node.setAttribute('title', value);
    //node.setAttribute('style', "background: red;");
    node.setAttribute('class', "rule1");
    
    return node;
  }

  static formats(node) {
    // We will only be called with a node already
    // determined to be a Link blot, so we do
    // not need to check ourselves
    return node.getAttribute('title') || true;
  }
}

Quill.register(Rule1);

export class Rule2 extends Inline {
    static blotName = 'rule2';
    static tagName = 'span';
    static create(value) {
      let node = super.create();
      // Sanitize url value if desired
      // Okay to set other non-format related attributes
      // These are invisible to Parchment so must be static
      node.setAttribute('data-tooltip', true);
      node.setAttribute('title', value);
      //node.setAttribute('style', "background: red;");
      node.setAttribute('class', "rule2");
      
      return node;
    }
  
    static formats(node) {
      // We will only be called with a node already
      // determined to be a Link blot, so we do
      // not need to check ourselves
      return node.getAttribute('title') || true;
    }
  }
  
  Quill.register(Rule2);

  export class Rule3 extends Inline {
    static blotName = 'rule3';
    static tagName = 'span';
    static create(value) {
      let node = super.create();
      // Sanitize url value if desired
      // Okay to set other non-format related attributes
      // These are invisible to Parchment so must be static
      node.setAttribute('data-tooltip', true);
      node.setAttribute('title', value);
      //node.setAttribute('style', "background: red;");
      node.setAttribute('class', "rule3");
      
      return node;
    }
  
    static formats(node) {
      // We will only be called with a node already
      // determined to be a Link blot, so we do
      // not need to check ourselves
      return node.getAttribute('title') || true;
    }
  }
  
  Quill.register(Rule3);

  export class Rule4 extends Inline {
    static blotName = 'rule4';
    static tagName = 'span';
    static create(value) {
      let node = super.create();
      // Sanitize url value if desired
      // Okay to set other non-format related attributes
      // These are invisible to Parchment so must be static
      node.setAttribute('data-tooltip', true);
      node.setAttribute('title', value);
      //node.setAttribute('style', "background: red;");
      node.setAttribute('class', "rule4");
      
      return node;
    }
  
    static formats(node) {
      // We will only be called with a node already
      // determined to be a Link blot, so we do
      // not need to check ourselves
      return node.getAttribute('title') || true;
    }
  }
  
  Quill.register(Rule4);

  