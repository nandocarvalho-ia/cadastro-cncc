import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";

const ConferenciaCarbonoForm = lazy(() => import("./pages/ConferenciaCarbonoForm"));
const ConferenciaCarbonoSucesso = lazy(() => import("./pages/ConferenciaCarbonoSucesso"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-muted-foreground">Carregando...</div>}>
          <Routes>
            <Route path="/" element={<Navigate to="/conferencia-carbono" replace />} />
            <Route path="/conferencia-carbono" element={<ConferenciaCarbonoForm />} />
            <Route path="/conferencia-carbono/sucesso" element={<ConferenciaCarbonoSucesso />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
