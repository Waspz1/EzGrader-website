import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export const metadata = {
  title: "EzGrader - Easy Grade Calculator",
  description: "Quickly calculate grades, GPA, and percentages with EzGrader.",
  metadataBase: new URL("https://www.ezgrader.org"),
  openGraph: {
    title: "EzGrader - Easy Grade Calculator",
    description:
      "Quickly calculate grades, GPA, and percentages with EzGrader.",
    url: "https://www.ezgrader.org",
    siteName: "EzGrader",
    images: [
      {
        url: "https://ucarecdn.com/fb688248-1554-439a-bbf7-6b4167f73ef6/-/format/auto/",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EzGrader - Easy Grade Calculator",
    description: "Quickly calculate grades and GPA instantly.",
    images: [
      "https://ucarecdn.com/fb688248-1554-439a-bbf7-6b4167f73ef6/-/format/auto/",
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#4F46E5" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Ezgrade" />
        <link
          rel="apple-touch-icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>📊</text></svg>"
        />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
