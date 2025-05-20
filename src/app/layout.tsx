import './globals.css';

import { getSession } from '@/lib/auth/session';
import Fetcher from '@/components/common/Fetcher';
import GlobalContextProvider from '@/components/common/GlobalContextProvider';
import { SessionProvider } from '@/lib/auth/SessionProvider';
import Script from 'next/script';
import { Viewport } from 'next';

export const viewport: Viewport = {
  themeColor: '#DD338B',
  colorScheme: 'only light',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <html lang="fa">
      <head>
        {/* googletagmanager */}
        <Script
          id="gtag"
          strategy="beforeInteractive"
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-5R1W2JZSLB"
        />
        <Script id="gtag-init" strategy="beforeInteractive" type="text/javascript">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
             gtag('config', 'G-5R1W2JZSLB');
          `}
        </Script>
        <Script strategy="beforeInteractive" id="js-clarity" type="text/javascript">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "rjekilb2ft");`}
        </Script>
      </head>
      <body>
        {/* chat-gofteno */}
        <Script id="chat-gofteno" type="text/javascript">
          {`!function(){var i="ZTDV4p",a=window,d=document;function g(){var g=d.createElement("script"),s="https://www.goftino.com/widget/"+i,l=localStorage.getItem("goftino_"+i);g.async=!0,g.src=l?s+"?o="+l:s;d.getElementsByTagName("head")[0].appendChild(g);}"complete"===d.readyState?g():a.attachEvent?a.attachEvent("onload",g):a.addEventListener("load",g,!1);}()`}
        </Script>
        {/* yekta-net */}
        <Script id="yekta-net" type="text/javascript">
          {` !function (t, e, n) {
        t.yektanetAnalyticsObject = n, t[n] = t[n] || function () {
            t[n].q.push(arguments)
        }, t[n].q = t[n].q || [];
        var a = new Date, r = a.getFullYear().toString() + "0" + a.getMonth() + "0" + a.getDate() + "0" + a.getHours(),
            c = e.getElementsByTagName("script")[0], s = e.createElement("script");
        s.id = "ua-script-xFfi6KQ2"; s.dataset.analyticsobject = n;
        s.async = 1; s.type = "text/javascript";
        s.src = "https://cdn.yektanet.com/rg_woebegone/scripts_v3/xFfi6KQ2/rg.complete.js?v=" + r, c.parentNode.insertBefore(s, c)
         }(window, document, "yektanet");
          `}
        </Script>

        <SessionProvider session={session}>
          <Fetcher>
            <GlobalContextProvider>
              {/* <div className="text-red-500 relative z-[9999]">
                {JSON.stringify(`زمان باقی‌مانده: ${minutes} دقیقه و ${seconds} ثانیه`)}
              </div> */}

              {children}
            </GlobalContextProvider>
          </Fetcher>
        </SessionProvider>
      </body>
    </html>
  );
}
