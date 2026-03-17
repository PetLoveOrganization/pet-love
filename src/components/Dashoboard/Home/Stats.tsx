import { Description } from '@/icons/Description'
import { Heart } from '@/icons/Heart'
import { Mail } from '@/icons/Mail'
import { useFavoriteStore } from '@/store/favorites'
import React from 'react'
interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>
  title: string
  value: string
  badgeText?: string
  iconColorClass?: string
  iconBgClass?: string
}

const StatCard = ({ icon: Icon, title, value, badgeText, iconColorClass = 'text-blue-600', iconBgClass = 'bg-blue-50' }: StatCardProps) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-xs flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div className={`p-3 rounded-xl ${iconBgClass}`}>
          <Icon className={`w-6 h-6 ${iconColorClass}`} />
        </div>
        {badgeText && (
          <span className={`${iconBgClass} ${iconColorClass} text-xs font-semibold px-3 py-1 rounded-full`}>
            {badgeText}
          </span>
        )}
      </div>

      <div className="space-y-1">
        <h3 className="text-gray-500 font-medium text-sm">{title}</h3>
        <p className="text-4xl font-bold text-slate-800">{value}</p>
      </div>
    </div>
  )
}

interface Props {
  totalAdoptionRequests: number
}
export const DashboardStats = ({ totalAdoptionRequests }: Props) => {
  const favCount  = useFavoriteStore(state => state.favoriteIds.length)
  const badgeText = totalAdoptionRequests > 1 ? 'new' : ''
  const stats: StatCardProps[] = [
    {
      title: 'Active Applications',
      value: String(totalAdoptionRequests),
      icon: Description,
      badgeText,
      iconColorClass: 'text-blue-600',
      iconBgClass: 'bg-blue-50',
    },
    {
      title: 'Favorite Pets',
      value: String(favCount),
      icon: Heart,
      iconColorClass: 'text-red-500',
      iconBgClass: 'bg-red-50',
    },
    {
      title: 'Messages',
      value: '5',
      icon: Mail,
      badgeText: '3 unread',
      iconColorClass: 'text-purple-600',
      iconBgClass: 'bg-purple-50',
    },
  ]

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </section>
  )
}
