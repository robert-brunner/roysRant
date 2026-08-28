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
      gap: 3px;
      padding: 8px;
      border-bottom: 1px solid #e5e7eb;
      background: #f9fafb;
    }

    .tiptap-toolbar button {
      min-width: 30px;
      padding: 5px 8px;
      border: 1px solid #d1d5db;
      border-radius: 4px;
      background: white;
      color: #374151;
      cursor: pointer;
      font-size: 13px;
    }

    .tiptap-toolbar button:hover {
      background: #f3f4f6;
    }

    .tiptap-toolbar button.active {
      border-color: #93c5fd;
      background: #dbeafe;
      color: #1d4ed8;
    }

    .tiptap-toolbar button:disabled {
      cursor: not-allowed;
      opacity: 0.45;
    }

    .tiptap-separator {
      width: 1px;
      margin: 0 4px;
      background: #d1d5db;
    }

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
              tipTap.Link.configure({
                openOnClick: false,
                autolink: true,
                linkOnPaste: true,
              }),
              tipTap.Placeholder.configure({
                placeholder: "Start writing here...",
              }),
              AlignedImage.configure({
                allowBase64: false,
              }),
              tipTap.VideoEmbed,
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
        h2: editor.isActive("heading", { level: 2 }),
        h3: editor.isActive("heading", { level: 3 }),
        bulletList: editor.isActive("bulletList"),
        orderedList: editor.isActive("orderedList"),
        link: editor.isActive("link"),
        image: editor.isActive("image"),
        video: editor.isActive("videoEmbed"),
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
      if (!this.editor) {
        return;
      }

      var source = window.prompt(
        "Image path or URL. Upload local images in Decap Media first, then use /images/filename.jpg:"
      );

      if (!source || !source.trim()) {
        return;
      }

      var alt = window.prompt("Describe the image for accessibility:", "") || "";
      this.editor
        .chain()
        .focus()
        .setImage({ src: source.trim(), alt: alt, align: "center" })
        .run();
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
            h(
              "div",
              { className: "tiptap-toolbar" },
              this.toolbarButton("bold", "B", "Bold", "bold", function () {
                self.run(function (chain) { return chain.toggleBold(); });
              }),
              this.toolbarButton("italic", "I", "Italic", "italic", function () {
                self.run(function (chain) { return chain.toggleItalic(); });
              }),
              this.toolbarButton("underline", "U", "Underline", "underline", function () {
                self.run(function (chain) { return chain.toggleUnderline(); });
              }),
              this.separator("separator-1"),
              this.toolbarButton("h2", "H2", "Heading 2", "h2", function () {
                self.run(function (chain) { return chain.toggleHeading({ level: 2 }); });
              }),
              this.toolbarButton("h3", "H3", "Heading 3", "h3", function () {
                self.run(function (chain) { return chain.toggleHeading({ level: 3 }); });
              }),
              this.separator("separator-2"),
              this.toolbarButton("bullet-list", "• List", "Bullet list", "bulletList", function () {
                self.run(function (chain) { return chain.toggleBulletList(); });
              }),
              this.toolbarButton("ordered-list", "1. List", "Numbered list", "orderedList", function () {
                self.run(function (chain) { return chain.toggleOrderedList(); });
              }),
              this.separator("separator-3"),
              this.toolbarButton("link", "Link", "Add or edit link", "link", this.addLink),
              this.toolbarButton("unlink", "Unlink", "Remove link", "unused", function () {
                self.run(function (chain) { return chain.extendMarkRange("link").unsetLink(); });
              }),
              this.separator("separator-4"),
              this.toolbarButton("image", "Image", "Insert image", "image", this.addImage),
              this.toolbarButton("video", "Video", "Insert video", "video", this.addVideo),
              this.toolbarButton("media-left", "Left", "Float selected media left", "unused", function () {
                self.alignMedia("left");
              }),
              this.toolbarButton("media-center", "Center", "Center selected media", "unused", function () {
                self.alignMedia("center");
              }),
              this.toolbarButton("media-right", "Right", "Float selected media right", "unused", function () {
                self.alignMedia("right");
              }),
              this.separator("separator-5"),
              this.toolbarButton("undo", "Undo", "Undo", "unused", function () {
                self.run(function (chain) { return chain.undo(); });
              }),
              this.toolbarButton("redo", "Redo", "Redo", "unused", function () {
                self.run(function (chain) { return chain.redo(); });
              })
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
