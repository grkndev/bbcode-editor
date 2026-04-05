import { parseBBCode } from '@/lib/parser';

export function BBCodeRenderer({ content }:{content:string}) {
  return (
    <div
      className="bbcode-output"
      dangerouslySetInnerHTML={{ __html: parseBBCode(content) }}
    />
  );
}