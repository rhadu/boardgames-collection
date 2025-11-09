import BGGDefault from "@components/ui/icons/bgg-default"
import BGGHover from "@components/ui/icons/bgg-hover"

export const BGGLogo = ({ className }: { className?: string }) => (
  <div className={`relative ${className}`}>
    <BGGDefault className="w-full h-full transition-opacity duration-200 group-hover:opacity-0" />
    <BGGHover className="absolute inset-0 w-full h-full opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
  </div>
)

