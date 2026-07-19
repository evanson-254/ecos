import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useFetchers,
  useNavigation,
} from "react-router"

import type { Route } from "./+types/root"
import "@workspace/ui/globals.css"
import TopBarProgress from "react-topbar-progress-indicator"

TopBarProgress.config({
  barColors: {
    0: "#1447e6",
    "0.5": "#1447e6",
    1: "#1447e6",
  },
})

export function Layout({ children }: { children: React.ReactNode }) {
  const navigation = useNavigation();
  const fetchers = useFetchers();

  const isFetcherLoading = fetchers.some(
    (fetcher) => fetcher.state !== "idle"
  )
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
          {(navigation.state !== "idle" || isFetcherLoading) && <TopBarProgress />}
        
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!"
  let details = "An unexpected error occurred."
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error"
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}
