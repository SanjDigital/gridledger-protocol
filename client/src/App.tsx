import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { InstitutionalModeProvider } from "./contexts/InstitutionalModeContext";
import { InstitutionalModeToggle } from "./components/InstitutionalModeToggle";
import Home from "./pages/Home";
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

/**
 * GridLedger Protocol GL-1
 * Design: Institutional dark theme with green verification accent
 * - Dark background (#0A0A0A) for authority
 * - Green accent (#22c55e) for verified states
 * - Monospace typography for technical credibility
 * - Scroll-snap sections for controlled narrative flow
 */
function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
      >
        <InstitutionalModeProvider>
          <TooltipProvider>
            <InstitutionalModeToggle />
            <div className="pt-20">
              <Toaster />
              <Router />
            </div>
          </TooltipProvider>
        </InstitutionalModeProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
