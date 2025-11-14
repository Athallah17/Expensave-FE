import { Avatar } from '@/components/atoms/Avatar';

interface UserProfileProps {
  name: string;
  email: string;
  initials: string;
}

export function UserProfile({ name, email, initials }: UserProfileProps) {
  return (
    <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
      <div className="text-right hidden sm:block">
        <p className="text-sm font-semibold text-slate-800">{name}</p>
        <p className="text-xs text-slate-500">{email}</p>
      </div>
      <Avatar initials={initials} />
    </div>
  );
}