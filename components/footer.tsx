import { type Language, getTranslation } from "@/lib/i18n"

type FooterProps = {
  language: Language
}

export function Footer({ language }: FooterProps) {
  const t = (key: Parameters<typeof getTranslation>[1]) => getTranslation(language, key)

  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground max-w-[1280px]">
        <p>
          {t("copyright")} © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}

