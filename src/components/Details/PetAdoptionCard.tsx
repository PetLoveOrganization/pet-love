import React from 'react'
import { AnchorButton } from '../AnchorButton'
import { Level } from '@/types.d'
import { ArrowRight } from '@/icons/ArrowRight'

interface PetCharacteristicProps {
  label: string
  level: Level
}

// Sub-component for the progress bars
const CharacteristicBar = ({ label, level }: PetCharacteristicProps) => {
  const levelMap = {
    [Level.Low]: { width: '25%', labelEn: 'Low' },
    [Level.Medium]: { width: '50%', labelEn: 'Moderate' },
    [Level.High]: { width: '75%', labelEn: 'High' },
    [Level.VeryHigh]: { width: '100%', labelEn: 'Very High' },
  }

  const { width, labelEn } = levelMap[level]

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-slate-500 text-sm font-medium">{label}</span>
        <span className="text-green-pet text-sm font-bold">{labelEn}</span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-2.5">
        <div
          className="bg-green-pet h-2.5 rounded-full transition-all duration-500"
          style={{ width }}
        ></div>
      </div>
    </div>
  )
}

interface PetAdoptionCardProps {
  adoptionFee: number
  currency?: string
  energyLevel: Level
  affectionLevel: Level
  exerciseNeeds: Level
  adoptionLink: string
}

export const PetAdoptionCard = ({
  adoptionFee,
  currency = '',
  energyLevel,
  affectionLevel,
  exerciseNeeds,
  adoptionLink,
}: PetAdoptionCardProps) => {
  const fee = adoptionFee > 0 ? `$${adoptionFee.toLocaleString()} ${currency}` : 'Free'
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8    md:min-w-xl max-w-md border-t-8 border-green-pet">
      <div className="text-center mb-6">
        <span className="text-slate-400 text-xs font-bold tracking-widest uppercase">
          Adoption Fee
        </span>
        <div className="text-lg lg:text-3xl font-extrabold text-slate-800 mt-1">
          {fee}
        </div>
      </div>
      <div className="mb-10">
        <AnchorButton
          href={adoptionLink}
          hasShadow
          className="w-full py-4 text-base lg:text-lg flex justify-center gap-2 group"
        >
          Request Adoption
          <ArrowRight className="size-6 group-hover:translate-x-1 transition-transform" />
        </AnchorButton>
      </div>

      <hr className="border-slate-100 mb-8" />
      <div>
        <h3 className="text-slate-800 font-bold mb-6">Main Characteristics</h3>

        <CharacteristicBar
          label="Energy Level"
          level={energyLevel}
        />

        <CharacteristicBar
          label="Affection"
          level={affectionLevel}
        />

        <CharacteristicBar
          label="Exercise Needs"
          level={exerciseNeeds}
        />
      </div>
    </div>
  )
}
