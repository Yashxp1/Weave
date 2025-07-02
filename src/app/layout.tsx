import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Instrument_Sans } from 'next/font/google';

const InstrumentSansfont = Instrument_Sans({
  subsets: ['latin'],
  weight: '400',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${InstrumentSansfont.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
