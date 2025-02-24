import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            // Check if dark mode was previously enabled
            if (localStorage.getItem('darkMode') === 'true') {
              document.documentElement.classList.add('dark');
            }
          `
        }} />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}