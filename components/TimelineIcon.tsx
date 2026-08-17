'use client';

import { Trophy, Crown, Flag, Airplane, Medal, VideoCamera, Briefcase, UsersThree, GraduationCap, MapPin, ChartLineUp, Certificate } from '@phosphor-icons/react';

const iconMap: Record<string, any> = {
  trophy: Trophy,
  crown: Crown,
  flag: Flag,
  airplane: Airplane,
  medal: Medal,
  video: VideoCamera,
  briefcase: Briefcase,
  users: UsersThree,
  graduation: GraduationCap,
  pin: MapPin,
  chart: ChartLineUp,
  certificate: Certificate,
};

export default function TimelineIcon({ icon }: { icon: string }) {
  const Icon = iconMap[icon] || Trophy;
  return <Icon weight="regular" className="w-4 h-4 text-red-400" />;
}
