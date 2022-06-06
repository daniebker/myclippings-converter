exports.bookTemplate = {
  template: `---
title: {{&title}}
bookauthor: {{&author}}
date: {{date}}
header:
  teaser: {{{coverUrl}}}
---

## {{&author}} - {{&title}}

<img width="300" src="{{{ coverUrl }}}"/>

{{#quotes}}
### {{date}}
> {{&quote}}
{{/quotes}}
`, fileExt: 'md'};

exports.orgModeTemplate = {
  template: `* {{&author}}, {{&title}}
:PROPERTIES:
:CREATED: {{date}}
:TITLE: {{&title}}
:AUTHOR: {{&author}}
:END'

{{#quotes}}
** {{date}}
#+BEGIN_QUOTE
{{&quote}}
#+END_QUOTE
{{/quotes}}
`,
  fileExt: 'org'
}

exports.obsidianTemplate = {
  template: `---
title: {{&title}}
bookauthor: {{&author}}
date: {{date}}
---

### {{ location }}

{{#quotes}}
### {{date}}
> {{&quote}}
{{/quotes}}

`,
  fileExt: "md",
};
