import './globals.css'

export const metadata = {
  title: 'Top Cerdanya — El directori de La Cerdanya',
  description: 'Directori de negocis locals, restaurants, allotjaments i activitats a La Cerdanya.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ca">
      <body>{children}</body>
    </html>
  )
}
