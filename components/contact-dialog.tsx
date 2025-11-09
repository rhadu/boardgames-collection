"use client"

import { useState } from "react"
import { Button } from "@components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog"
import { Mail, MessageCircle, Phone, Copy, Check } from "lucide-react"
import { type Language, getTranslation } from "@/lib/i18n"
import { contactInfo, getEmailLink, getWhatsAppLink } from "@/lib/contact"
import { type Game } from "@/lib/types"

type ContactDialogProps = {
  language: Language
  open: boolean
  onOpenChange: (open: boolean) => void
  game?: Game
  selectedGames?: Game[]
  isBulkDeal?: boolean
}

export function ContactDialog({
  language,
  open,
  onOpenChange,
  game,
  selectedGames,
  isBulkDeal = false,
}: ContactDialogProps) {
  const t = (key: Parameters<typeof getTranslation>[1]) =>
    getTranslation(language, key)
  const [copied, setCopied] = useState(false)

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(contactInfo.phone)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy phone number:", err)
    }
  }

  const handleCall = () => {
    window.location.href = `tel:${contactInfo.phone.replace(/\s+/g, "")}`
  }

  // Format game details for messages
  const formatGameDetails = (games: Game[]): string => {
    return games
      .map((g, index) => {
        const price = `${g.price.toLocaleString()} ${g.currency}`
        return `${index + 1}. ${g.title}${g.year ? ` (${g.year})` : ""} - ${price}`
      })
      .join("\n")
  }

  // Calculate total price
  const calculateTotal = (games: Game[]): string => {
    const total = games.reduce((sum, g) => sum + g.price, 0)
    const currency = games[0]?.currency || "RON"
    return `${total.toLocaleString()} ${currency}`
  }

  // Generate context-specific messages
  const isSelection = selectedGames && selectedGames.length > 0
  const games = isSelection ? selectedGames : game ? [game] : []

  const emailSubject = isBulkDeal
    ? t("emailSubjectBulkDeal")
    : isSelection
      ? t("emailSubjectSelection")
      : `${t("emailSubjectGame")}: ${game?.title || ""}`

  const emailBody = isBulkDeal
    ? t("emailBodyBulkDeal")
    : isSelection
      ? `${t("emailBodySelection")}\n\n${t("gamesSelected")}:\n${formatGameDetails(selectedGames!)}\n\n${t("total")}: ${calculateTotal(selectedGames!)}\n\n${language === "ro" ? "Mulțumesc!" : "Thank you!"}`
      : `${t("emailBodyGame")} "${game?.title || ""}".\n\n${game ? `${t("priceLabel")}: ${game.price.toLocaleString()} ${game.currency}` : ""}\n\n${language === "ro" ? "Mulțumesc!" : "Thank you!"}`

  const whatsAppMessage = isBulkDeal
    ? t("whatsAppMessageBulkDeal")
    : isSelection
      ? `${t("whatsAppMessageSelection")}\n\n${formatGameDetails(selectedGames!)}\n\n${t("total")}: ${calculateTotal(selectedGames!)}`
      : `${t("whatsAppMessageGame")} "${game?.title || ""}".${game ? ` ${t("priceLabel")}: ${game.price.toLocaleString()} ${game.currency}` : ""}`

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("contactOptions")}</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          {/* Email Option */}
          <Button
            variant="outline"
            className="w-full justify-start gap-3 h-auto py-3 border-muted-foreground/30 hover:bg-muted hover:border-muted-foreground/50 hover:text-foreground transition-colors"
            asChild
          >
            <a
              href={getEmailLink(contactInfo.email, emailSubject, emailBody)}
              onClick={() => onOpenChange(false)}
            >
              <Mail className="w-5 h-5 shrink-0" />
              <div className="flex flex-col items-start">
                <span className="font-medium">{t("sendEmail")}</span>
                <span className="text-xs text-muted-foreground">
                  {contactInfo.email}
                </span>
              </div>
            </a>
          </Button>

          {/* WhatsApp Option */}
          <Button
            variant="outline"
            className="w-full justify-start gap-3 h-auto py-3 border-muted-foreground/30 hover:bg-muted hover:border-muted-foreground/50 hover:text-foreground transition-colors"
            asChild
          >
            <a
              href={getWhatsAppLink(contactInfo.phone, whatsAppMessage)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onOpenChange(false)}
            >
              <MessageCircle className="w-5 h-5 shrink-0" />
              <div className="flex flex-col items-start">
                <span className="font-medium">{t("openWhatsApp")}</span>
                <span className="text-xs text-muted-foreground">
                  {contactInfo.phone}
                </span>
              </div>
            </a>
          </Button>

          {/* Phone Number Options */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 justify-start gap-3 h-auto py-3 border-muted-foreground/30 hover:bg-muted hover:border-muted-foreground/50 hover:text-foreground transition-colors"
              onClick={handleCopyPhone}
            >
              {copied ? (
                <Check className="w-5 h-5 shrink-0" />
              ) : (
                <Copy className="w-5 h-5 shrink-0" />
              )}
              <div className="flex flex-col items-start">
                <span className="font-medium">
                  {copied ? t("phoneNumberCopied") : t("copyPhoneNumber")}
                </span>
                <span className="text-xs text-muted-foreground">
                  {contactInfo.phone}
                </span>
              </div>
            </Button>
            <Button
              variant="outline"
              className="shrink-0 px-4 h-auto py-3 border-muted-foreground/30 hover:bg-muted hover:border-muted-foreground/50 hover:text-foreground transition-colors"
              onClick={handleCall}
              aria-label={t("callPhone")}
            >
              <Phone className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

