import KSDefault from "@components/ui/icons/ks-default"
import KSHover from "@components/ui/icons/ks-hover"

export const KickstarterLogo = ({ className }: { className?: string }) => (
  <div className={`relative ${className}`}>
    <KSDefault className="w-full h-full transition-opacity duration-200 group-hover:opacity-0" />
    <KSHover className="absolute inset-0 w-full h-full opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
  </div>
)

