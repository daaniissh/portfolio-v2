import { Marked, type RendererObject } from 'marked';

interface Props {
  markdown: string;
}

export default function Markdown({ markdown }: Props) {
  const renderer: RendererObject = {
    heading({ tokens, depth }) {
      const text = this.parser.parseInline(tokens);
      const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

      return `<h${depth}>
        <a name="${escapedText}" class="text-primary!" href="#${escapedText}">#.</a>
        ${text}
      </h${depth}>`;
    },
    link(args) {
      const link = marked.Renderer.prototype.link.call(this, args);
      return link.replace('<a', '<a target="_blank" rel="noreferrer"');
    },
  };

  const marked = new Marked({ renderer });

  return (
    <article
      className="prose prose-sm dark:prose-invert prose-headings:text-foreground prose-p:text-neutral prose-a:link prose-strong:text-foreground prose-li:text-neutral py-5 md:w-3/5 md:py-10 lg:py-20"
      dangerouslySetInnerHTML={{ __html: marked.parse(markdown) }}
    ></article>
  );
}
