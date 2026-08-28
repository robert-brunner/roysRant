(function () {
  const h = window.h || React.createElement;

  // Load TipTap + extensions from CDN
  const TIPTAP_CDN = 'https://esm.sh';

  async function loadTipTap() {
    const [
      { Editor },
      { StarterKit },
      { Link },
      { Underline },
      { Placeholder },
    ] = await Promise.all([
      import(`${TIPTAP_CDN}/@tiptap/core@2.4.0`),
      import(`${TIPTAP_CDN}/@tiptap/starter-kit@2.4.0`),
      import(`${TIPTAP_CDN}/@tiptap/extension-link@2.4.0`),
      import(`${TIPTAP_CDN}/@tiptap/extension-underline@2.4.0`),
      import(`${TIPTAP_CDN}/@tiptap/extension-placeholder@2.4.0`),
    ]);
    return { Editor, StarterKit, Link, Underline, Placeholder };
  }

  const PREVIEW_STYLE = `
    .preview-article { font-size: 18px; line-height: 1.9; color: #374151; font-family: Georgia, serif; }
    .preview-article h1 { font-size: 2rem; font-weight: 700; margin-bottom: 1rem; color: #111; text-align: center; }
    .preview-article h2 { font-size: 1.5rem; font-weight: 700; margin: 1.5rem 0 0.75rem; color: #111; }
    .preview-article h3 { font-size: 1.2rem; font-weight: 600; margin: 1.2rem 0 0.5rem; color: #111; }
    .preview-article p { margin-bottom: 1rem; }
    .preview-article a { color: #2563eb; text-decoration: underline; }
    .preview-article ul, .preview-article ol { margin: 0 0 1rem 1.5rem; }
    .preview-article li { margin-bottom: 0.3rem; }
    .preview-article strong { font-weight: 700; }
    .preview-article em { font-style: italic; }
    .preview-article u { text-decoration: underline; }
  `;

  const TOOLBAR_STYLE = `
    .tiptap-toolbar { display: flex; flex-wrap: wrap; gap: 2px; padding: 8px; border-bottom: 1px solid #e5e7eb; background: #f9fafb; }
    .tiptap-toolbar button { padding: 4px 8px; border: 1px solid #d1d5db; border-radius: 4px; background: white; cursor: pointer; font-size: 13px; color: #374151; min-width: 28px; }
    .tiptap-toolbar button:hover { background: #f3f4f6; }
    .tiptap-toolbar button.active { background: #dbeafe; border-color: #93c5fd; color: #1d4ed8; }
    .tiptap-toolbar .sep { width: 1px; background: #d1d5db; margin: 0 4px; align-self: stretch; }
    .tiptap-wrap { border: 1px solid #e5e7eb; border-radius: 6px; overflow: hidden; background: white; flex: 1; display: flex; flex-direction: column; }
    .tiptap-editor { padding: 16px; min-height: 300px; flex: 1; overflow-y: auto; font-size: 15px; line-height: 1.8; color: #374151; outline: none; }
    .tiptap-editor .is-editor-empty:before { content: attr(data-placeholder); color: #9ca3af; pointer-events: none; float: left; height: 0; }
    .tiptap-editor p { margin-bottom: 0.75rem; }
    .tiptap-editor h2 { font-size: 1.4rem; font-weight: 700; margin: 1rem 0 0.5rem; }
    .tiptap-editor h3 { font-size: 1.1rem; font-weight: 600; margin: 0.8rem 0 0.4rem; }
    .tiptap-editor a { color: #2563eb; text-decoration: underline; }
    .tiptap-editor ul, .tiptap-editor ol { margin: 0 0 0.75rem 1.25rem; }
    .split-pane { display: flex; gap: 12px; height: 500px; }
    .preview-pane { flex: 1; border: 1px solid #e5e7eb; border-radius: 6px; overflow-y: auto; padding: 16px; background: white; }
    .preview-pane h3.pane-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #9ca3af; margin-bottom: 12px; font-weight: 500; }
  `;

  class TipTapWidget extends React.Component {
    constructor(props) {
      super(props);
      this.editorRef = React.createRef();
      this.previewRef = React.createRef();
      this.editor = null;
      this.state = {
        loaded: false,
        html: props.value || '',
        activeMarks: {},
      };
    }

    async componentDidMount() {
      const { Editor, StarterKit, Link, Underline, Placeholder } = await loadTipTap();

      this.editor = new Editor({
        element: this.editorRef.current,
        extensions: [
          StarterKit,
          Underline,
          Link.configure({ openOnClick: false, autolink: true }),
          Placeholder.configure({ placeholder: 'Start writing here...' }),
        ],
        content: this.props.value || '',
        onUpdate: ({ editor }) => {
          const html = editor.getHTML();
          this.setState({ html, activeMarks: this.getActiveMarks(editor) });
          if (this.props.onChange) this.props.onChange(html);
        },
        onSelectionUpdate: ({ editor }) => {
          this.setState({ activeMarks: this.getActiveMarks(editor) });
        },
      });

      this.setState({ loaded: true, activeMarks: this.getActiveMarks(this.editor) });
    }

    getActiveMarks(editor) {
      return {
        bold: editor.isActive('bold'),
        italic: editor.isActive('italic'),
        underline: editor.isActive('underline'),
        h2: editor.isActive('heading', { level: 2 }),
        h3: editor.isActive('heading', { level: 3 }),
        bulletList: editor.isActive('bulletList'),
        orderedList: editor.isActive('orderedList'),
        link: editor.isActive('link'),
      };
    }

    componentWillUnmount() {
      if (this.editor) this.editor.destroy();
    }

    addLink() {
      const url = window.prompt('Enter URL:');
      if (url) {
        this.editor.chain().focus().setLink({ href: url }).run();
      }
    }

    btn(label, action, activeKey, title) {
      const isActive = this.state.activeMarks[activeKey];
      return React.createElement('button', {
        type: 'button',
        className: isActive ? 'active' : '',
        title: title || label,
        onClick: (e) => { e.preventDefault(); action(); },
        dangerouslySetInnerHTML: { __html: label },
      });
    }

    render() {
      const { html, loaded } = this.state;
      const e = this.editor;

      return React.createElement('div', null,
        React.createElement('style', null, TOOLBAR_STYLE + PREVIEW_STYLE),

        React.createElement('div', { className: 'split-pane' },

          // LEFT — editor
          React.createElement('div', { className: 'tiptap-wrap', style: { flex: 1 } },
            React.createElement('div', { className: 'tiptap-toolbar' },
              loaded && [
                this.btn('<b>B</b>', () => e.chain().focus().toggleBold().run(), 'bold', 'Bold'),
                this.btn('<i>I</i>', () => e.chain().focus().toggleItalic().run(), 'italic', 'Italic'),
                this.btn('<u>U</u>', () => e.chain().focus().toggleUnderline().run(), 'underline', 'Underline'),
                React.createElement('div', { className: 'sep', key: 'sep1' }),
                this.btn('H2', () => e.chain().focus().toggleHeading({ level: 2 }).run(), 'h2', 'Heading 2'),
                this.btn('H3', () => e.chain().focus().toggleHeading({ level: 3 }).run(), 'h3', 'Heading 3'),
                React.createElement('div', { className: 'sep', key: 'sep2' }),
                this.btn('&#8226; List', () => e.chain().focus().toggleBulletList().run(), 'bulletList', 'Bullet list'),
                this.btn('1. List', () => e.chain().focus().toggleOrderedList().run(), 'orderedList', 'Numbered list'),
                React.createElement('div', { className: 'sep', key: 'sep3' }),
                React.createElement('button', { type: 'button', title: 'Add link', onClick: (ev) => { ev.preventDefault(); this.addLink(); } }, '🔗'),
                React.createElement('button', { type: 'button', title: 'Remove link', onClick: (ev) => { ev.preventDefault(); e.chain().focus().unsetLink().run(); } }, '✂'),
                React.createElement('div', { className: 'sep', key: 'sep4' }),
                React.createElement('button', { type: 'button', title: 'Undo', onClick: (ev) => { ev.preventDefault(); e.chain().focus().undo().run(); } }, '↩'),
                React.createElement('button', { type: 'button', title: 'Redo', onClick: (ev) => { ev.preventDefault(); e.chain().focus().redo().run(); } }, '↪'),
              ]
            ),
            React.createElement('div', { className: 'tiptap-editor', ref: this.editorRef })
          ),

          // RIGHT — live preview
          React.createElement('div', { className: 'preview-pane', style: { flex: 1 } },
            React.createElement('p', { className: 'pane-label' }, 'Live preview'),
            React.createElement('div', {
              className: 'preview-article',
              dangerouslySetInnerHTML: { __html: html || '<p style="color:#9ca3af">Your content will appear here...</p>' }
            })
          )
        )
      );
    }
  }

  const TipTapControl = TipTapWidget;
  TipTapControl.displayName = 'TipTapControl';

  const TipTapPreview = ({ value }) =>
    React.createElement('div', {
      className: 'preview-article',
      dangerouslySetInnerHTML: { __html: value || '' }
    });

  if (window.CMS) {
    window.CMS.registerWidget('tiptap', TipTapControl, TipTapPreview);
  } else {
    window.addEventListener('load', () => {
      if (window.CMS) window.CMS.registerWidget('tiptap', TipTapControl, TipTapPreview);
    });
  }
})();