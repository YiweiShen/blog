interface CodeBlockProps {
  html: string;
}

export default function CodeBlock({ html }: CodeBlockProps) {
  return <div className="markdown" dangerouslySetInnerHTML={{ __html: html }} />;
}