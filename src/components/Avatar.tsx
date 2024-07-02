import { ElementType } from 'react';
import Avatar1 from '../assets/avatars/Group-1.svg';
import Avatar2 from '../assets/avatars/Group-2.svg';
import Avatar3 from '../assets/avatars/Group-3.svg';
import Avatar4 from '../assets/avatars/Group-4.svg';
import Avatar5 from '../assets/avatars/Group-5.svg';
import Avatar6 from '../assets/avatars/Group-6.svg';
import Avatar7 from '../assets/avatars/Group-7.svg';
import Avatar8 from '../assets/avatars/Group-8.svg';
import Avatar9 from '../assets/avatars/Group-9.svg';
import Avatar10 from '../assets/avatars/Group-10.svg';
import Avatar11 from '../assets/avatars/Group-11.svg';
import Avatar12 from '../assets/avatars/Group-12.svg';
import Avatar13 from '../assets/avatars/Group-13.svg';
import Avatar14 from '../assets/avatars/Group-14.svg';
import Avatar15 from '../assets/avatars/Group-15.svg';
import Avatar16 from '../assets/avatars/Group-16.svg';

const AVATARS: Record<string, ElementType> = {
  '1': Avatar1,
  '2': Avatar2,
  '3': Avatar3,
  '4': Avatar4,
  '5': Avatar5,
  '6': Avatar6,
  '7': Avatar7,
  '8': Avatar8,
  '9': Avatar9,
  '10': Avatar10,
  '11': Avatar11,
  '12': Avatar12,
  '13': Avatar13,
  '14': Avatar14,
  '15': Avatar15,
  '16': Avatar16,
};

interface AvatarProps {
  variant?: string | number;
  className?: string;
}

export default function Avatar({ variant = '1', className }: AvatarProps) {
  const SVGComponent = AVATARS[variant] || AVATARS['1'];
  return <SVGComponent className={className} />;
}
