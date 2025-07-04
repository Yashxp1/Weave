import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Instrument_Sans } from 'next/font/google';
import LayoutShell from '@/components/LayoutShell';

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
      <body className={InstrumentSansfont.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LayoutShell>{children}</LayoutShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
