import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export function TransactionsPage() {
  return (
    <main className="min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Transactions Page</h1>
      <div className="space-x-4">
        <Button asChild variant="outline">
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
    </main>
  )
}
