import { Link } from '@/i18n/routing';

interface Props {
  compact?: boolean;
}

export default function Logo({ compact = false }: Props) {
  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      <span className="flex items-center justify-center w-9 h-9 rounded-md bg-red-600 text-white font-display font-bold text-sm shrink-0 group-hover:bg-red-500 transition-colors">
        PH
      </span>
      {!compact && (
        <span className="text-xl font-bold text-white whitespace-nowrap">
          Petr Hollan
        </span>
      )}
    </Link>
  );
}
