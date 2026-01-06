import { Badge } from "@components/ui/badge"
import { Button } from "@components/ui/button"
import { Card, CardContent } from "@components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select"
import { Package, Sparkles, ShieldCheck, TrendingUp, Globe } from "lucide-react"
import { type Language, getTranslation } from "@/lib/i18n"

type HeroSectionProps = {
  language: Language
  onLanguageChange: (lang: Language) => void
  totalGames: number
  bulkDiscountPrice: number
  totalInventoryValue: number
  onContactBulkDeal: () => void
}

export function HeroSection({
  language,
  onLanguageChange,
  totalGames,
  bulkDiscountPrice,
  totalInventoryValue,
  onContactBulkDeal,
}: HeroSectionProps) {
  const t = (key: Parameters<typeof getTranslation>[1]) => getTranslation(language, key)

  return (
    <section className="border-b bg-gradient-to-b from-card via-card to-background">
      <div className="container mx-auto px-4 py-12 md:py-24 max-w-[1280px]">
        <div className="flex justify-end mb-8">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-muted-foreground" />
            <Select value={language} onValueChange={(val) => onLanguageChange(val as Language)}>
              <SelectTrigger className="w-[100px] border-muted-foreground/20 hover:border-muted-foreground/40 transition-colors">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ro">RO</SelectItem>
                <SelectItem value="en">EN</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="max-w-4xl">
          <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 px-3 py-1 text-sm font-medium">
            {t("premiumCollectionSale")}
          </Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-balance leading-tight">
            {t("heroTitle")}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-3xl">
            {totalGames} {t("heroDescription")}{" "}
            <span className="font-semibold text-foreground">{t("heroDiscountText")}</span>.
          </p>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
              <div className="p-2 rounded-md bg-sealed/10">
                <ShieldCheck className="w-5 h-5 text-sealed" />
              </div>
              <span className="text-sm font-medium">{t("nonSmokerHome")}</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
              <div className="p-2 rounded-md bg-primary/10">
                <Package className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm font-medium">{t("storedVertically")}</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
              <div className="p-2 rounded-md bg-kickstarter/10">
                <Sparkles className="w-5 h-5 text-kickstarter" />
              </div>
              <span className="text-sm font-medium">{t("kickstarterExclusives")}</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
              <div className="p-2 rounded-md bg-primary/10">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm font-medium">{t("manySealed")}</span>
            </div>
          </div>

          {/* Bulk Deal Callout */}
          <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/30 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-2xl">💎</div>
                    <h3 className="font-bold text-xl">{t("bulkDealTitle")}</h3>
                  </div>
                  <p className="text-base text-muted-foreground">
                    {t("bulkDealDescription")} {totalGames} {t("bulkDealGames")}{" "}
                    <span className="font-bold text-foreground text-lg">{bulkDiscountPrice.toLocaleString()} RON</span>
                    <span className="ml-2 line-through text-muted-foreground text-sm">
                      {totalInventoryValue.toLocaleString()} RON
                    </span>
                  </p>
                  <p className="text-sm font-medium text-primary">
                    {t("bulkDealSave")} {(totalInventoryValue - bulkDiscountPrice).toLocaleString()} RON (30%{" "}
                    {t("bulkDealDiscount")})
                  </p>
                </div>
                <Button 
                  size="lg" 
                  className="whitespace-nowrap shadow-md hover:shadow-lg transition-shadow"
                  onClick={onContactBulkDeal}
                >
                  {t("contactBulkDeal")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

