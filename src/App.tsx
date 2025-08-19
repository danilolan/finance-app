import { BrowserRouter, Routes, Route } from "react-router-dom"
import { RootLayout } from "./components/layout/RootLayout"
import { HomePage } from "./pages/HomePage"
import { DashboardPage } from "./pages/DashboardPage"
import { TransactionsPage } from "./pages/TransactionsPage"
import { CategoriesPage } from "./pages/CategoriesPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App