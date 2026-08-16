'use client';

import { useState } from 'react';
import { Link2, Check } from 'lucide-react';

export default function CopyLinkButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API unavailable, ignore silently
    }
  };

  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-red-400 transition-colors"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          <span>Zkopírováno</span>
        </>
      ) : (
        <>
          <Link2 className="w-4 h-4" />
          <span>Sdílet odkaz</span>
        </>
      )}
    </button>
  );
}
