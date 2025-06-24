"use client";
import { useEffect } from 'react';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import bash from 'highlight.js/lib/languages/bash';
import python from 'highlight.js/lib/languages/python';
import 'highlight.js/styles/github.css';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('python', python);

interface CodeBlockProps {
  html: string;
}

export default function CodeBlock({ html }: CodeBlockProps) {
  useEffect(() => {
    document.querySelectorAll('pre code').forEach((block) => {
      const element = block as HTMLElement;
      hljs.highlightElement(element);
      const lines = element.innerHTML.split('\n');
      if (lines.length > 0) {
        element.innerHTML = lines
          .map((line, i) => {
            const safeLine = line || '&nbsp;';
            return `<span class="line" data-line-number="${i + 1}">${safeLine}</span>`;
          })
          .join('');
      }
    });

    document.querySelectorAll('pre').forEach((pre) => {
      const wrapper = pre as HTMLElement;
      if (wrapper.querySelector('.copy-button')) return;

      wrapper.style.position = 'relative';
      const button = document.createElement('button');
      button.innerText = 'Copy';
      button.className = 'copy-button';
      button.addEventListener('click', () => {
        navigator.clipboard.writeText(pre.textContent || '');
        button.innerText = 'Copied';
        setTimeout(() => { button.innerText = 'Copy'; }, 2000);
      });
      wrapper.appendChild(button);
    });
  }, [html]);

  return <div className="markdown" dangerouslySetInnerHTML={{ __html: html }} />;
}