import './globals.css'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <meta name="viewport" content= "width=device-width, user-scalable=no"></meta>
      </head>
      <body>{children}</body>
    </html>
  )
}
