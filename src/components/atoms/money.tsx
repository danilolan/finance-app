import { cn } from "@/lib/utils"

interface MoneyProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: number
  currency?: string
  locale?: string
  signDisplay?: "auto" | "always" | "never"
  colored?: boolean
}

export function Money({ 
  value, 
  currency = "BRL", 
  locale = "pt-BR",
  signDisplay = "auto",
  colored = true,
  className,
  ...props 
}: MoneyProps) {
  const formatted = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    signDisplay,
  }).format(value)

  // Split the formatted string into symbol and amount, handling "R$" as a single unit
  const matches = formatted.match(/^(R\$|[€$£¥])\s*(.+)$/)
  const [, symbol, amount] = matches || [formatted, "", formatted]

  return (
    <span 
      className={cn(
        "tabular-nums",
        colored && {
          "text-red-500": value < 0,
          "text-green-500": value > 0,
          "text-muted-foreground": value === 0,
        },
        className
      )}
      {...props}
    >
      <span className="text-[0.85em] opacity-75">{symbol}</span>
      {" "}
      <span>{amount}</span>
    </span>
  )
}