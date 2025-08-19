import { Link } from "react-router-dom"
import { Button } from "@/components/atoms/button"

export function HomePage() {
  return (
    <main className="min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Home Page</h1>
      <div className="space-x-4">
        <Button asChild>
          <Link to="/transactions">Go to Transactions</Link>
        </Button>
      </div>
    </main>
  )
}
