'use client';

import { FC } from 'react';

interface Member {
  id?: string | number;
  name: string;
  avatar?: string;
}

interface AvatarGroupProps {
  members: Member[];
  max?: number; // max number of avatars to show
}

export const AvatarGroup: FC<AvatarGroupProps> = ({ members, max = 3 }) => {
  const displayedMembers = members.slice(0, max);
  const extraCount = members.length - displayedMembers.length;
  const randomColor = () => {
    const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500', 'bg-teal-500'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  return (
    <div className="flex -space-x-3">
      {displayedMembers.map((member, idx) => (
        <div
          key={member.id || idx}
          className={`w-8 h-8 rounded-full border-2 border-white ${randomColor()} flex items-center justify-center text-xs font-semibold text-white overflow-hidden`}
          title={member.name}
          style={{ zIndex: members.length - idx }}
        >
          {member.avatar ? (
            <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
          ) : (
            member.name.charAt(0).toUpperCase()
          )}
        </div>
      ))}
      {extraCount > 0 && (
        <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-300 flex items-center justify-center text-xs font-semibold text-slate-800">
          +{extraCount}
        </div>
      )}
    </div>
  );
};
