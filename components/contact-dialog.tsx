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

type ContactDialogProps = {
  language: Language
  open: boolean
  onOpenChange: (open: boolean) => void
  context?: "game" | "selection"
  gameTitle?: string
}

export function ContactDialog({
  language,
  open,
  onOpenChange,
  context = "game",
  gameTitle,
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

  // Generate context-specific messages
  const emailSubject =
    context === "selection"
      ? t("emailSubjectSelection")
      : `${t("emailSubjectGame")}: ${gameTitle || ""}`
  const emailBody =
    context === "selection"
      ? t("emailBodySelection")
      : `${t("emailBodyGame")} "${gameTitle || ""}".\n\n${language === "ro" ? "Mulțumesc!" : "Thank you!"}`

  const whatsAppMessage =
    context === "selection"
      ? t("whatsAppMessageSelection")
      : `${t("whatsAppMessageGame")} "${gameTitle || ""}".`

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
            className="w-full justify-start gap-3 h-auto py-3"
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
            className="w-full justify-start gap-3 h-auto py-3"
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
              className="flex-1 justify-start gap-3 h-auto py-3"
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
              className="shrink-0 px-4 h-auto py-3"
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

