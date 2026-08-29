(function () {
  var CMS = window.CMS;
  var createClass = window.createClass;
  var h = window.h;

  if (!CMS || !createClass || !h) {
    console.error("TipTap widget could not register: Decap CMS globals are missing.");
    return;
  }

  var tipTapPromise;

  function loadTipTap() {
    if (!tipTapPromise) {
      tipTapPromise = Promise.all([
        import("https://esm.sh/@tiptap/core@2.4.0"),
        import("https://esm.sh/@tiptap/starter-kit@2.4.0"),
        import("https://esm.sh/@tiptap/extension-link@2.4.0"),
        import("https://esm.sh/@tiptap/extension-underline@2.4.0"),
        import("https://esm.sh/@tiptap/extension-placeholder@2.4.0"),
        import("https://esm.sh/@tiptap/extension-image@2.4.0"),
        import("https://esm.sh/@tiptap/extension-highlight@2.4.0"),
        import("https://esm.sh/@tiptap/extension-superscript@2.4.0"),
        import("https://esm.sh/@tiptap/extension-subscript@2.4.0"),
        import("https://esm.sh/@tiptap/extension-text-align@2.4.0"),
        import("https://esm.sh/@tiptap/extension-task-list@2.4.0"),
        import("https://esm.sh/@tiptap/extension-task-item@2.4.0"),
      ]).then(function (modules) {
        var VideoEmbed = modules[0].Node.create({
          name: "videoEmbed",
          group: "block",
          atom: true,
          draggable: true,

          addAttributes: function () {
            return {
              src: {
                default: "",
                parseHTML: function (element) {
                  return element.getAttribute("data-src") || "";
                },
              },
              align: {
                default: "center",
                parseHTML: function (element) {
                  return element.getAttribute("data-align") || "center";
                },
              },
            };
          },

          parseHTML: function () {
            return [{ tag: "div[data-video-embed]" }];
          },

          renderHTML: function (data) {
            var source = data.node.attrs.src;
            var align = data.node.attrs.align || "center";
            var attributes = {
              "data-video-embed": "true",
              "data-src": source,
              "data-align": align,
              class: "article-media article-media-" + align,
            };

            if (/\.(?:mp4|webm|ogg)(?:\?.*)?$/i.test(source)) {
              return ["div", attributes, ["video", { src: source, controls: "controls" }]];
            }

            return [
              "div",
              attributes,
              [
                "iframe",
                {
                  src: videoEmbedUrl(source),
                  title: "Embedded video",
                  frameborder: "0",
                  allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                  allowfullscreen: "true",
                },
              ],
            ];
          },

          addCommands: function () {
            return {
              setVideoEmbed: function (attributes) {
                return function (context) {
                  return context.commands.insertContent({
                    type: "videoEmbed",
                    attrs: attributes,
                  });
                };
              },
            };
          },
        });

        return {
          Editor: modules[0].Editor,
          StarterKit: modules[1].StarterKit || modules[1].default,
          Link: modules[2].Link || modules[2].default,
          Underline: modules[3].Underline || modules[3].default,
          Placeholder: modules[4].Placeholder || modules[4].default,
          Image: modules[5].Image || modules[5].default,
          Highlight: modules[6].Highlight || modules[6].default,
          Superscript: modules[7].Superscript || modules[7].default,
          Subscript: modules[8].Subscript || modules[8].default,
          TextAlign: modules[9].TextAlign || modules[9].default,
          TaskList: modules[10].TaskList || modules[10].default,
          TaskItem: modules[11].TaskItem || modules[11].default,
          VideoEmbed: VideoEmbed,
        };
      });
    }

    return tipTapPromise;
  }

  function videoEmbedUrl(source) {
    var value = source || "";
    var youtube = value.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/i);
    var vimeo = value.match(/vimeo\.com\/(?:video\/)?([0-9]+)/i);

    if (youtube) {
      return "https://www.youtube.com/embed/" + youtube[1];
    }

    if (vimeo) {
      return "https://player.vimeo.com/video/" + vimeo[1];
    }

    return value;
  }

  function escapeHtml(value) {
    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function alreadyContainsHtml(value) {
    return /<\/?(?:p|br|h[1-6]|ul|ol|li|strong|b|em|i|u|a|blockquote|pre|code|hr)\b[^>]*>/i.test(value);
  }

  function normalizeContent(value) {
    var text = typeof value === "string" ? value : "";

    if (!text || alreadyContainsHtml(text)) {
      return text;
    }

    return text
      .replace(/\r\n?/g, "\n")
      .split(/\n{2,}/)
      .map(function (block) {
        return "<p>" + escapeHtml(block).replace(/\n/g, "<br>") + "</p>";
      })
      .join("");
  }

  var styles = `
    .tiptap-split-pane {
      display: flex;
      gap: 12px;
      height: 500px;
    }

    .tiptap-editor-pane,
    .tiptap-preview-pane {
      flex: 1;
      min-width: 0;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      overflow: hidden;
      background: white;
    }

    .tiptap-editor-pane {
      display: flex;
      flex-direction: column;
    }

    .tiptap-toolbar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 2px;
      padding: 6px 8px;
      border-bottom: 1px solid #e5e7eb;
      background: #18181b;
    }

    .tiptap-toolbar button {
      min-width: 28px;
      padding: 4px 7px;
      border: none;
      border-radius: 4px;
      background: transparent;
      color: #e4e4e7;
      cursor: pointer;
      font-size: 13px;
      line-height: 1.4;
      transition: background 0.1s;
    }

    .tiptap-toolbar button:hover {
      background: #3f3f46;
      color: #fff;
    }

    .tiptap-toolbar button.active {
      background: #2563eb;
      color: #fff;
    }

    .tiptap-toolbar button:disabled {
      cursor: not-allowed;
      opacity: 0.35;
    }

    .tiptap-separator {
      width: 1px;
      height: 20px;
      margin: 0 4px;
      background: #3f3f46;
      flex-shrink: 0;
    }

    .tiptap-editor .ProseMirror p { margin: 0 0 0.75rem; }
    .tiptap-editor .ProseMirror h1 { font-size: 2rem; font-weight: 700; margin: 1.5rem 0 0.75rem; color: #111; }
    .tiptap-editor .ProseMirror h2 { font-size: 1.6rem; font-weight: 700; margin: 1.25rem 0 0.6rem; color: #111; }
    .tiptap-editor .ProseMirror h3 { font-size: 1.3rem; font-weight: 700; margin: 1rem 0 0.5rem; color: #111; }
    .tiptap-editor .ProseMirror h4 { font-size: 1.1rem; font-weight: 700; margin: 0.75rem 0 0.4rem; color: #111; }
    .tiptap-editor .ProseMirror strong, .tiptap-editor .ProseMirror b { font-weight: 700; }
    .tiptap-editor .ProseMirror em, .tiptap-editor .ProseMirror i { font-style: italic; }
    .tiptap-editor .ProseMirror u { text-decoration: underline; }
    .tiptap-editor .ProseMirror s { text-decoration: line-through; }
    .tiptap-editor .ProseMirror code { font-family: monospace; background: #f3f4f6; padding: 1px 4px; border-radius: 3px; font-size: 0.9em; }
    .tiptap-editor .ProseMirror mark { background: #fef08a; padding: 0 2px; border-radius: 2px; }
    .tiptap-editor .ProseMirror a { color: #2563eb; text-decoration: underline; cursor: pointer; }
    .tiptap-editor .ProseMirror ul { list-style-type: disc; margin: 0 0 0.75rem 1.5rem; }
    .tiptap-editor .ProseMirror ol { list-style-type: decimal; margin: 0 0 0.75rem 1.5rem; }
    .tiptap-editor .ProseMirror li { margin-bottom: 0.2rem; }
    .tiptap-editor .ProseMirror ul[data-type="taskList"] { list-style: none; margin-left: 0.5rem; }
    .tiptap-editor .ProseMirror ul[data-type="taskList"] li { display: flex; align-items: flex-start; gap: 6px; }
    .tiptap-editor .ProseMirror ul[data-type="taskList"] li label { margin-top: 2px; }
    .tiptap-editor .ProseMirror sup { vertical-align: super; font-size: 0.75em; }
    .tiptap-editor .ProseMirror sub { vertical-align: sub; font-size: 0.75em; }
    .tiptap-editor .ProseMirror blockquote { border-left: 3px solid #d1d5db; padding-left: 1rem; color: #6b7280; font-style: italic; margin: 1rem 0; }
    .tiptap-editor .ProseMirror hr { border: none; border-top: 2px solid #e5e7eb; margin: 1.5rem 0; }
    .tiptap-editor .ProseMirror p.is-editor-empty:first-child::before { content: attr(data-placeholder); color: #9ca3af; pointer-events: none; float: left; height: 0; }

    .tiptap-editor {
      flex: 1;
      min-height: 0;
      overflow-y: auto;
      padding: 16px;
      color: #374151;
      font-size: 15px;
      line-height: 1.8;
    }

    .tiptap-editor .ProseMirror {
      min-height: 100%;
      outline: none;
    }

    .tiptap-editor .is-editor-empty:first-child::before {
      float: left;
      height: 0;
      color: #9ca3af;
      content: attr(data-placeholder);
      pointer-events: none;
    }

    .tiptap-editor p,
    .tiptap-preview-article p {
      margin: 0 0 1rem;
    }

    .tiptap-editor h2,
    .tiptap-preview-article h2 {
      margin: 1.5rem 0 0.75rem;
      color: #111827;
      font-size: 1.875rem;
      font-weight: 700;
    }

    .tiptap-editor h3,
    .tiptap-preview-article h3 {
      margin: 1.25rem 0 0.5rem;
      color: #111827;
      font-size: 1.5rem;
      font-weight: 700;
    }

    .tiptap-editor a,
    .tiptap-preview-article a {
      color: #2563eb;
      text-decoration: underline;
    }

    .tiptap-editor ul,
    .tiptap-editor ol,
    .tiptap-preview-article ul,
    .tiptap-preview-article ol {
      margin: 0 0 1rem 1.5rem;
    }

    .tiptap-preview-pane {
      min-height: 0;
      overflow-y: scroll;
      overscroll-behavior: contain;
      padding: 16px;
      scrollbar-gutter: stable;
    }

    .tiptap-pane-label {
      margin: 0 0 12px;
      color: #9ca3af;
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }

    .tiptap-preview-article {
      color: #374151;
      font-family: inherit;
      font-size: 20px;
      line-height: 2;
    }

    .tiptap-preview-article::after,
    .tiptap-editor .ProseMirror::after {
      display: block;
      clear: both;
      content: "";
    }

    .tiptap-preview-article img,
    .tiptap-editor img,
    .tiptap-preview-article video,
    .tiptap-editor video {
      display: block;
      max-width: 100%;
      height: auto;
    }

    .article-media {
      box-sizing: border-box;
      max-width: 100%;
    }

    img.article-media-left,
    .article-media-left {
      float: left;
      width: min(45%, 420px);
      margin: 0.35rem 1.5rem 1rem 0;
    }

    img.article-media-right,
    .article-media-right {
      float: right;
      width: min(45%, 420px);
      margin: 0.35rem 0 1rem 1.5rem;
    }

    img.article-media-center,
    .article-media-center {
      float: none;
      clear: both;
      width: min(100%, 760px);
      margin: 1.25rem auto;
    }

    [data-video-embed] iframe,
    [data-video-embed] video {
      display: block;
      width: 100%;
      aspect-ratio: 16 / 9;
      border: 0;
      background: #111827;
    }

    .tiptap-status {
      padding: 16px;
      color: #6b7280;
    }

    .tiptap-status.error {
      color: #b91c1c;
    }

    @media (max-width: 900px) {
      .tiptap-split-pane {
        height: auto;
        flex-direction: column;
      }

      .tiptap-editor-pane,
      .tiptap-preview-pane {
        min-height: 400px;
      }
    }
  `;

  var TipTapControl = createClass({
    displayName: "TipTapControl",

    getInitialState: function () {
      return {
        loaded: false,
        error: "",
        html: normalizeContent(this.props.value || ""),
        activeMarks: {},
      };
    },

    componentDidMount: function () {
      var self = this;
      var originalValue = this.props.value || "";
      var initialContent = normalizeContent(originalValue);

      this.isMountedForTipTap = true;

      loadTipTap()
        .then(function (tipTap) {
          if (!self.isMountedForTipTap || !self.editorElement) {
            return;
          }

          var AlignedImage = tipTap.Image.extend({
            addAttributes: function () {
              var parentAttributes = this.parent ? this.parent() : {};
              return Object.assign({}, parentAttributes, {
                align: {
                  default: "center",
                  parseHTML: function (element) {
                    return element.getAttribute("data-align") || "center";
                  },
                  renderHTML: function (attributes) {
                    var align = attributes.align || "center";
                    return {
                      "data-align": align,
                      class: "article-media article-media-" + align,
                    };
                  },
                },
              });
            },
          });

          self.editor = new tipTap.Editor({
            element: self.editorElement,
            extensions: [
              tipTap.StarterKit,
              tipTap.Underline,
              tipTap.Link.configure({ openOnClick: false, autolink: true, linkOnPaste: true }),
              tipTap.Placeholder.configure({ placeholder: "Start writing here..." }),
              AlignedImage.configure({ allowBase64: false }),
              tipTap.VideoEmbed,
              tipTap.Highlight.configure({ multicolor: false }),
              tipTap.Superscript,
              tipTap.Subscript,
              tipTap.TextAlign.configure({ types: ["heading", "paragraph"] }),
              tipTap.TaskList,
              tipTap.TaskItem.configure({ nested: true }),
            ],
            content: initialContent,
            onUpdate: function (event) {
              var html = event.editor.getHTML();
              self.setState({
                html: html,
                activeMarks: self.getActiveMarks(event.editor),
              });
              self.props.onChange(html);
            },
            onSelectionUpdate: function (event) {
              self.setState({
                activeMarks: self.getActiveMarks(event.editor),
              });
            },
          });

          self.setState({
            loaded: true,
            html: self.editor.getHTML(),
            activeMarks: self.getActiveMarks(self.editor),
          });

          if (initialContent !== originalValue) {
            self.props.onChange(self.editor.getHTML());
          }
        })
        .catch(function (error) {
          console.error("TipTap failed to load:", error);
          if (self.isMountedForTipTap) {
            self.setState({
              error: "TipTap failed to load. Check the browser console and internet connection.",
            });
          }
        });
    },

    componentDidUpdate: function (previousProps) {
      if (!this.editor || previousProps.value === this.props.value) {
        return;
      }

      var incomingContent = normalizeContent(this.props.value || "");
      if (incomingContent !== this.editor.getHTML()) {
        this.editor.commands.setContent(incomingContent, false);
        this.setState({ html: this.editor.getHTML() });
      }
    },

    componentWillUnmount: function () {
      this.isMountedForTipTap = false;
      if (this.editor) {
        this.editor.destroy();
        this.editor = null;
      }
    },

    getActiveMarks: function (editor) {
      return {
        bold: editor.isActive("bold"),
        italic: editor.isActive("italic"),
        underline: editor.isActive("underline"),
        strike: editor.isActive("strike"),
        code: editor.isActive("code"),
        highlight: editor.isActive("highlight"),
        superscript: editor.isActive("superscript"),
        subscript: editor.isActive("subscript"),
        h1: editor.isActive("heading", { level: 1 }),
        h2: editor.isActive("heading", { level: 2 }),
        h3: editor.isActive("heading", { level: 3 }),
        h4: editor.isActive("heading", { level: 4 }),
        bulletList: editor.isActive("bulletList"),
        orderedList: editor.isActive("orderedList"),
        taskList: editor.isActive("taskList"),
        link: editor.isActive("link"),
        image: editor.isActive("image"),
        video: editor.isActive("videoEmbed"),
        alignLeft: editor.isActive({ textAlign: "left" }),
        alignCenter: editor.isActive({ textAlign: "center" }),
        alignRight: editor.isActive({ textAlign: "right" }),
        alignJustify: editor.isActive({ textAlign: "justify" }),
      };
    },

    run: function (command) {
      if (this.editor) {
        command(this.editor.chain().focus()).run();
      }
    },

    addLink: function () {
      if (!this.editor) {
        return;
      }

      var currentUrl = this.editor.getAttributes("link").href || "";
      var url = window.prompt("Enter URL:", currentUrl);

      if (url === null) {
        return;
      }

      if (!url.trim()) {
        this.editor.chain().focus().extendMarkRange("link").unsetLink().run();
        return;
      }

      this.editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url.trim() })
        .run();
    },

    addImage: function () {
      if (!this.editor) return;
      var self = this;
      var input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = function () {
        var file = input.files[0];
        if (!file) return;
        var reader = new FileReader();
        reader.onload = function (e) {
          var base64 = e.target.result.split(",")[1];
          var filename = "images/" + Date.now() + "-" + file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
          var token = window.localStorage.getItem("decap-cms-github-token") ||
                      (window.netlifyIdentity && window.netlifyIdentity.currentUser && window.netlifyIdentity.currentUser().token && window.netlifyIdentity.currentUser().token.access_token) ||
                      "";
          if (!token) {
            var url = window.prompt("Could not auto-detect GitHub token. Enter image URL manually (upload via Decap Media first):");
            if (url) self.editor.chain().focus().setImage({ src: url, align: "center" }).run();
            return;
          }
          fetch("https://api.github.com/repos/robert-brunner/roysRant/contents/public/" + filename, {
            method: "PUT",
            headers: { "Authorization": "token " + token, "Content-Type": "application/json" },
            body: JSON.stringify({ message: "Upload image: " + file.name, content: base64 }),
          })
          .then(function(r) { return r.json(); })
          .then(function(data) {
            var url = data.content && data.content.download_url;
            if (url) {
              var alt = window.prompt("Image description (for accessibility):", "") || "";
              self.editor.chain().focus().setImage({ src: url, alt: alt, align: "center" }).run();
            } else {
              window.alert("Upload failed. Try using Decap Media instead.");
            }
          })
          .catch(function() { window.alert("Upload failed. Try using Decap Media instead."); });
        };
        reader.readAsDataURL(file);
      };
      input.click();
    },

    addVideo: function () {
      if (!this.editor) {
        return;
      }

      var source = window.prompt(
        "YouTube, Vimeo, MP4, WebM, or Ogg URL:"
      );

      if (!source || !source.trim()) {
        return;
      }

      this.editor
        .chain()
        .focus()
        .setVideoEmbed({ src: source.trim(), align: "center" })
        .run();
    },

    alignMedia: function (alignment) {
      if (!this.editor) {
        return;
      }

      if (this.editor.isActive("image")) {
        this.editor.chain().focus().updateAttributes("image", { align: alignment }).run();
        return;
      }

      if (this.editor.isActive("videoEmbed")) {
        this.editor.chain().focus().updateAttributes("videoEmbed", { align: alignment }).run();
        return;
      }

      window.alert("Select an image or video in the editor first.");
    },

    toolbarButton: function (key, label, title, activeKey, action) {
      var self = this;
      return h(
        "button",
        {
          key: key,
          type: "button",
          title: title,
          disabled: !this.state.loaded,
          className: this.state.activeMarks[activeKey] ? "active" : "",
          onClick: function (event) {
            event.preventDefault();
            action.call(self);
          },
        },
        label
      );
    },

    separator: function (key) {
      return h("span", { key: key, className: "tiptap-separator" });
    },

    render: function () {
      var self = this;

      if (this.state.error) {
        return h(
          "div",
          null,
          h("style", null, styles),
          h("div", { className: "tiptap-status error" }, this.state.error)
        );
      }

      return h(
        "div",
        { className: this.props.classNameWrapper },
        h("style", null, styles),
        h(
          "div",
          { className: "tiptap-split-pane" },
          h(
            "div",
            { className: "tiptap-editor-pane" },
            h("div", { className: "tiptap-toolbar" },
              this.toolbarButton("undo", "↩", "Undo", "unused", function () { self.run(function(c){return c.undo();}); }),
              this.toolbarButton("redo", "↪", "Redo", "unused", function () { self.run(function(c){return c.redo();}); }),
              this.separator("sep-0"),
              this.toolbarButton("bullet-list", "☰", "Bullet list", "bulletList", function () { self.run(function(c){return c.toggleBulletList();}); }),
              this.toolbarButton("ordered-list", "①", "Numbered list", "orderedList", function () { self.run(function(c){return c.toggleOrderedList();}); }),
              this.toolbarButton("task-list", "☑", "Task list", "taskList", function () { self.run(function(c){return c.toggleTaskList();}); }),
              this.toolbarButton("indent", "→|", "Indent", "unused", function () { self.run(function(c){return c.sinkListItem("listItem");}); }),
              this.toolbarButton("outdent", "|←", "Outdent", "unused", function () { self.run(function(c){return c.liftListItem("listItem");}); }),
              this.separator("sep-2"),
              this.toolbarButton("bold", "B", "Bold", "bold", function () { self.run(function(c){return c.toggleBold();}); }),
              this.toolbarButton("italic", "I", "Italic", "italic", function () { self.run(function(c){return c.toggleItalic();}); }),
              this.toolbarButton("strike", "S̶", "Strikethrough", "strike", function () { self.run(function(c){return c.toggleStrike();}); }),
              this.toolbarButton("code", "</>", "Inline code", "code", function () { self.run(function(c){return c.toggleCode();}); }),
              this.toolbarButton("underline", "U̲", "Underline", "underline", function () { self.run(function(c){return c.toggleUnderline();}); }),
              this.toolbarButton("highlight", "▐H", "Highlight", "highlight", function () { self.run(function(c){return c.toggleHighlight();}); }),
              this.toolbarButton("link", "🔗", "Add link", "link", this.addLink),
              this.toolbarButton("superscript", "x²", "Superscript", "superscript", function () { self.run(function(c){return c.toggleSuperscript();}); }),
              this.toolbarButton("subscript", "x₂", "Subscript", "subscript", function () { self.run(function(c){return c.toggleSubscript();}); }),
              this.separator("sep-3"),
              this.toolbarButton("align-left", "⇤", "Align left", "alignLeft", function () { self.run(function(c){return c.setTextAlign("left");}); }),
              this.toolbarButton("align-center", "≡", "Align center", "alignCenter", function () { self.run(function(c){return c.setTextAlign("center");}); }),
              this.toolbarButton("align-right", "⇥", "Align right", "alignRight", function () { self.run(function(c){return c.setTextAlign("right");}); }),
              this.toolbarButton("align-justify", "☰", "Justify", "alignJustify", function () { self.run(function(c){return c.setTextAlign("justify");}); }),
              this.separator("sep-4"),
              this.toolbarButton("image", "🖼 Add", "Upload image", "unused", this.addImage),
              this.toolbarButton("video", "▶ Video", "Embed video", "video", this.addVideo),
              this.toolbarButton("unlink", "✂ Unlink", "Remove link", "unused", function () { self.run(function(c){return c.extendMarkRange("link").unsetLink();}); })
            ),
            !this.state.loaded
              ? h("div", { className: "tiptap-status" }, "Loading editor...")
              : null,
            h("div", {
              id: this.props.forID,
              className: "tiptap-editor",
              ref: function (element) {
                self.editorElement = element;
              },
            })
          ),
          h(
            "div",
            { className: "tiptap-preview-pane" },
            h("p", { className: "tiptap-pane-label" }, "Live preview"),
            h("div", {
              className: "tiptap-preview-article",
              dangerouslySetInnerHTML: {
                __html:
                  this.state.html ||
                  '<p style="color:#9ca3af">Your content will appear here...</p>',
              },
            })
          )
        )
      );
    },
  });

  var TipTapPreview = createClass({
    displayName: "TipTapPreview",

    render: function () {
      return h(
        "div",
        null,
        h("style", null, styles),
        h("div", {
          className: "tiptap-preview-article",
          dangerouslySetInnerHTML: {
            __html: normalizeContent(this.props.value || ""),
          },
        })
      );
    },
  });

  CMS.registerWidget("tiptap", TipTapControl, TipTapPreview);
  console.log("TipTap widget registered.");

})();

(function () {
  var CMS = window.CMS;
  var createClass = window.createClass;
  var h = window.h;

  if (!CMS || !createClass || !h) {
    console.error("Article preview override could not register.");
    return;
  }

  var layoutStyles = document.createElement("style");
  layoutStyles.textContent = `
    .tiptap-preview-pane { display: none !important; }
    .tiptap-split-pane { display: block !important; width: 100% !important; height: 600px !important; }
    .tiptap-editor-pane { display: flex !important; width: 100% !important; max-width: none !important; height: 100% !important; flex: none !important; }
  `;
  document.head.appendChild(layoutStyles);

  function escapeHtml(value) {
    return String(value || "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;");
  }

  function normalizeContent(value) {
    var text = typeof value === "string" ? value : "";
    var containsHtml = /<\/?(?:p|br|h[1-6]|ul|ol|li|strong|b|em|i|u|a|blockquote|pre|code|hr|img|video|iframe|div)\b[^>]*>/i.test(text);
    if (!text || containsHtml) return text;
    return text.replace(/\r\n?/g,"\n").split(/\n{2,}/).map(function(block){ return "<p>"+escapeHtml(block).replace(/\n/g,"<br>")+"</p>"; }).join("");
  }

  function linkifyHtml(value) {
    var container = document.createElement("div");
    container.innerHTML = normalizeContent(value);
    var walker = document.createTreeWalker(container, window.NodeFilter.SHOW_TEXT);
    var textNodes = [];
    var currentNode;
    while ((currentNode = walker.nextNode())) {
      if (currentNode.parentElement && !currentNode.parentElement.closest("a, script, style") && /https?:\/\//i.test(currentNode.nodeValue)) {
        textNodes.push(currentNode);
      }
    }
    textNodes.forEach(function(textNode) {
      var text = textNode.nodeValue;
      var expression = /https?:\/\/[^\s<>]+/gi;
      var fragment = document.createDocumentFragment();
      var lastIndex = 0;
      var match;
      while ((match = expression.exec(text))) {
        var completeMatch = match[0];
        var trailing = completeMatch.match(/[),.;!?]+$/);
        var url = trailing ? completeMatch.slice(0, -trailing[0].length) : completeMatch;
        fragment.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
        var link = document.createElement("a");
        link.href = url; link.textContent = url; link.target = "_blank"; link.rel = "noopener noreferrer";
        fragment.appendChild(link);
        if (trailing) fragment.appendChild(document.createTextNode(trailing[0]));
        lastIndex = match.index + completeMatch.length;
      }
      fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
      textNode.parentNode.replaceChild(fragment, textNode);
    });
    return container.innerHTML;
  }

  function domainFromUrl(value) {
    try { return new URL(value).hostname.replace(/^www\./i,""); } catch(e) { return value; }
  }

  var previewStyles = `
    .roy-site-preview { position:relative; box-sizing:border-box; min-height:100%; padding:48px 42px 120px; background:#fff; color:#374151; font-family:Arial,Helvetica,sans-serif; }
    .roy-site-preview h1 { max-width:896px; margin:0 auto 40px; color:#000; font-size:48px; font-weight:700; line-height:1.15; text-align:center; }
    .roy-site-preview-subtitle { max-width:896px; margin:-20px auto 40px; color:#6b7280; font-size:20px; font-style:italic; font-weight:700; line-height:1.5; text-align:center; }
    .roy-site-preview-body { max-width:896px; margin:0 auto; color:#374151; font-size:20px; line-height:2; overflow-wrap:anywhere; }
    .roy-site-preview-body::after { display:block; clear:both; content:""; }
    .roy-site-preview-body p { margin:0 0 1rem; }
    .roy-site-preview-body h2 { margin:2rem 0 1rem; color:#111827; font-size:30px; font-weight:700; line-height:1.3; }
    .roy-site-preview-body h3 { margin:1.5rem 0 0.75rem; color:#111827; font-size:24px; font-weight:700; line-height:1.35; }
    .roy-site-preview-body a { color:#2563eb; text-decoration:underline; cursor:pointer; }
    .roy-site-preview-body a:hover { color:#1e40af; }
    .roy-site-preview-body ul, .roy-site-preview-body ol { margin:0 0 1rem 1.5rem; }
    .roy-site-preview-body img, .roy-site-preview-body video { display:block; max-width:100%; height:auto; }
    .roy-site-preview-body .article-media-left { float:left; width:min(45%,420px); margin:0.35rem 1.5rem 1rem 0; }
    .roy-site-preview-body .article-media-right { float:right; width:min(45%,420px); margin:0.35rem 0 1rem 1.5rem; }
    .roy-site-preview-body .article-media-center { float:none; clear:both; width:min(100%,760px); margin:1.25rem auto; }
    .roy-site-preview-body [data-video-embed] iframe, .roy-site-preview-body [data-video-embed] video { display:block; width:100%; aspect-ratio:16/9; border:0; background:#111827; }
    .roy-link-preview-card { position:absolute; z-index:50; width:min(360px,calc(100% - 32px)); overflow:hidden; border:1px solid #e5e7eb; border-radius:12px; background:#fff; box-shadow:0 20px 35px rgba(17,24,39,0.18); color:#111827; pointer-events:none; }
    .roy-link-preview-card-main { padding:17px 16px 15px; }
    .roy-link-preview-domain { margin:0 0 10px; color:#6b7280; font-size:12px; }
    .roy-link-preview-title { margin:0; color:#111827; font-size:14px; font-weight:700; }
    .roy-link-preview-url { margin:0; padding:11px 16px; border-top:1px solid #f3f4f6; background:#f9fafb; color:#6b7280; font-size:12px; overflow-wrap:anywhere; }
  `;

  var ArticlePreview = createClass({
    displayName: "ArticlePreview",
    getInitialState: function() { return { hoveredUrl: "", cardLeft: 16, cardTop: 16 }; },
    showLinkCard: function(event) {
      var link = event.target.closest ? event.target.closest("a") : null;
      if (!link || !this.previewElement || !this.previewElement.contains(link)) return;
      var linkBox = link.getBoundingClientRect();
      var previewBox = this.previewElement.getBoundingClientRect();
      var cardWidth = 360;
      var left = linkBox.left - previewBox.left;
      var maxLeft = Math.max(16, previewBox.width - cardWidth - 16);
      this.setState({ hoveredUrl: link.href, cardLeft: Math.max(16, Math.min(left, maxLeft)), cardTop: linkBox.bottom - previewBox.top + 10 });
    },
    hideLinkCard: function(event) {
      if (event.target.closest && event.target.closest("a")) this.setState({ hoveredUrl: "" });
    },
    stopPreviewNavigation: function(event) {
      if (event.target.closest && event.target.closest("a")) event.preventDefault();
    },
    render: function() {
      var self = this;
      var title = this.props.entry.getIn(["data", "title"]) || "Untitled Article";
      var subtitle = this.props.entry.getIn(["data", "subtitle"]) || "";
      var body = this.props.entry.getIn(["data", "body"]) || "";
      var domain = domainFromUrl(this.state.hoveredUrl);
      return h("article", {
        className: "roy-site-preview",
        ref: function(el) { self.previewElement = el; },
        onMouseOver: this.showLinkCard,
        onMouseOut: this.hideLinkCard,
        onClick: this.stopPreviewNavigation,
      },
        h("style", null, previewStyles),
        h("h1", null, title),
        subtitle ? h("p", { className: "roy-site-preview-subtitle" }, subtitle) : null,
        h("div", { className: "roy-site-preview-body", dangerouslySetInnerHTML: { __html: linkifyHtml(body) } }),
        this.state.hoveredUrl ? h("div", {
          className: "roy-link-preview-card",
          style: { left: this.state.cardLeft + "px", top: this.state.cardTop + "px" }
        },
          h("div", { className: "roy-link-preview-card-main" },
            h("p", { className: "roy-link-preview-domain" }, domain),
            h("p", { className: "roy-link-preview-title" }, domain)
          ),
          h("p", { className: "roy-link-preview-url" }, this.state.hoveredUrl)
        ) : null
      );
    },
  });

  CMS.registerPreviewTemplate("articles", ArticlePreview);
  console.log("Article preview template registered.");
})();