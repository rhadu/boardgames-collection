"use client"

import { Button } from "@components/ui/button"
import { type Language, getTranslation } from "@/lib/i18n"

type ContactSectionProps = {
  language: Language
  onContact: () => void
}

export function ContactSection({ language, onContact }: ContactSectionProps) {
  const t = (key: Parameters<typeof getTranslation>[1]) => getTranslation(language, key)

  return (
    <section className="border-t bg-gradient-to-b from-muted/40 via-muted/30 to-background">
      <div className="container mx-auto px-4 py-20 md:py-24 max-w-[1280px]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t("readyToAdd")}</h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">{t("contactDescription")}</p>
          <div className="flex justify-center">
            <Button 
              size="lg" 
              className="text-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
              onClick={onContact}
            >
              {t("contactMe")}
            </Button>
          </div>

          <div className="mt-16 pt-8 border-t border-muted-foreground/20">
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {t("contactFooter")}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

