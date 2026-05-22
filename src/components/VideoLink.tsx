import { PlayCircle } from 'lucide-react';

interface Props {
  url: string;
  label?: string;
  small?: boolean;
}

export function VideoLink({ url, label, small }: Props) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer noopener"
      className={`inline-flex items-center gap-1.5 text-link underline underline-offset-2 decoration-1 ${
        small ? 'text-xs' : 'text-sm'
      }`}
    >
      <PlayCircle size={small ? 13 : 15} strokeWidth={1.6} />
      <span>{label ?? 'Guarda tutorial'}</span>
    </a>
  );
}
