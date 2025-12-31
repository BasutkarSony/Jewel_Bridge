import { ShieldCheck } from 'lucide-react';

interface VerifiedBadgeProps {
  className?: string;
}

export function VerifiedBadge({ className }: VerifiedBadgeProps) {
  return (
    <span className={`verified-badge ${className || ''}`}>
      <ShieldCheck className="h-3.5 w-3.5" />
      Verified Local Shop
    </span>
  );
}
