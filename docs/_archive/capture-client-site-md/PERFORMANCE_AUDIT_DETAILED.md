# PERFORMANCE AUDIT REPORT

## Overall Performance Score: 4/10

### 🚨 CRITICAL - Does not meet $3M quality standards

### Summary Statistics

- Pages Tested: 5
- Average Load Time: 3055ms
- Total Console Errors: 6
- Total Console Warnings: 6
- Total Failed Requests: 5
- Total Large Assets (>500KB): 0

## Page Load Analysis

### Homepage (/)

**Load Metrics:**
- Total Load Time: 3070ms
- First Contentful Paint: 808ms
- Transfer Size: 72 KB

**Network Requests:** 47
- Images: 3
- Fonts: 9
- Scripts: 29
- Stylesheets: 2
- XHR/Fetch: 3

**❌ Failed Requests:** 1
- https://www.google-analytics.com/g/collect?v=2&tid=G-L1W7YY173M&gtm=45je5c30v9236528652za200zd9236528652&_p=1764882304903&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=1224971221.1764882305&ul=en-us&sr=1920x1080&uaa=x86&uab=64&uafvl=HeadlessChrome%3B143.0.7499.4%7CChromium%3B143.0.7499.4%7CNot%2520A(Brand%3B24.0.0.0&uamb=0&uam=&uap=Windows&uapv=19.0.0&uaw=0&are=1&frm=0&pscdl=noapi&_s=1&tag_exp=103116026~103200004~104527907~104528501~104684208~104684211~105391252~115583767~115938466~115938469~116184927~116184929~116217636~116217638~116251935~116251937~116514482&dp=%2F&sid=1764882305&sct=1&seg=0&dl=http%3A%2F%2Flocalhost%2F&dt=Capture%20Client%20%7C%20AI%20Voice%20Agents%20%26%20Lead%20Generation%20for%20Small%20Business&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&ep.anonymize_ip=true&tfd=1929
  Error: net::ERR_ABORTED

**❌ Console Errors:** 2
- A tree hydrated but some attributes of the server rendered HTML didn't match the client properties. This won't be patched up. This can happen if a SSR-ed Client Component used:

- A server/client branch `if (typeof window !== 'undefined')`.
- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.
- Date formatting in a user's locale which doesn't match the server.
- External changing data without sending a snapshot of it along with the HTML.
- Invalid HTML tag nesting.

It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.

%s%s https://react.dev/link/hydration-mismatch 

  ...
    <HTTPAccessFallbackErrorBoundary pathname="/" notFound={<NotAllowedRootHTTPFallbackError>} forbidden={undefined} ...>
      <RedirectBoundary>
        <RedirectErrorBoundary router={{...}}>
          <Head>
          <__next_root_layout_boundary__>
            <SegmentViewNode type="layout" pagePath="/capture-c...">
              <SegmentTrieNode>
              <link>
              <script>
              <script>
              <script>
              <script>
              <RootLayout>
                <html lang="en" className="dark scrol...">
                  <head>
                  <body className="poppins_cf...">
                    <Script>
                    <GoogleAnalytics>
                    <WebVitals>
                    <ScrollDepthTracker>
                    <a>
                    <MegaMenu>
                    <main>
                    <Footer>
                      <footer className="bg-gradien...">
                        <div>
                        <div>
                        <div>
                        <div className="container ...">
                          <div className="py-12 sm:p...">
                            <div>
                            <div className="mt-12 sm:m...">
                              <div>
                              <div className="max-w-2xl">
                                <h3>
                                <p>
                                <form className="flex flex-...">
                                  <label>
                                  <input
                                    id="footer-email"
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 w-full min-h-[48px] px-4 py-3 bg-white/5 border border-white/10 ..."
-                                   style={{}}
                                  >
                                  ...
                            ...
                          ...
          ...

  at http://localhost:3001/_next/static/chunks/865d7_next_dist_6bdb0dc5._.js:3117
- A tree hydrated but some attributes of the server rendered HTML didn't match the client properties. This won't be patched up. This can happen if a SSR-ed Client Component used:

- A server/client branch `if (typeof window !== 'undefined')`.
- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.
- Date formatting in a user's locale which doesn't match the server.
- External changing data without sending a snapshot of it along with the HTML.
- Invalid HTML tag nesting.

It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.

%s%s https://react.dev/link/hydration-mismatch 

  ...
    <div className="relative z-10">
      <PremiumFinalCTA>
        <section id="contact" ref={{current:null}} className="section re..." style={{...}}>
          <div>
          <div>
          <div>
          <div>
          <div>
          <div className="container-...">
            <div className="max-w-5xl ...">
              <motion.div>
              <div>
              <motion.div>
              <motion.div id="contact-form" initial={{opacity:0,y:30}} animate={{opacity:0,y:30}} ...>
                <div id="contact-form" className="relative p..." style={{opacity:0, ...}} ...>
                  <div className="glass-3d p...">
                    <motion.div>
                    <div>
                    <OptimizedLeadForm source="homepage-f...">
                      <div className="space-y-6">
                        <div>
                        <form onSubmit={function handleStepOne} className="space-y-5 ...">
                          <div className="space-y-5">
                            <div className="group">
                              <label>
                              <div className="relative">
                                <input
                                  id="name"
                                  type="text"
                                  placeholder="John Smith"
                                  value=""
                                  onChange={function onChange}
                                  required={true}
                                  autoComplete="name"
                                  className="w-full min-h-[52px] px-5 py-4 text-base bg-white/[0.03] backdrop-blur-xl ..."
-                                 style={{caret-color:"transparent"}}
                                >
                                ...
                            <div className="group">
                              <label>
                              <div className="relative">
                                <input
                                  id="phone"
                                  type="tel"
                                  inputMode="numeric"
                                  placeholder="(865) 555-1234"
                                  value=""
                                  onChange={function onChange}
                                  required={true}
                                  autoComplete="tel"
                                  pattern="[0-9\s\(\)\-\+]+"
                                  className="w-full min-h-[52px] px-5 py-4 text-base bg-white/[0.03] backdrop-blur-xl ..."
-                                 style={{caret-color:"transparent"}}
                                >
                                ...
                          ...
                    ...
              ...

  at http://localhost:3001/_next/static/chunks/865d7_next_dist_6bdb0dc5._.js:3117

**⚠️ Console Warnings:** 2
- Image with src "http://localhost:3001/logo-desktop.svg" has either width or height modified, but not
- Please ensure that the container has a non-static position, like 'relative', 'fixed', or 'absolute' 

---

### Services (/services)

**Load Metrics:**
- Total Load Time: 3001ms
- First Contentful Paint: 716ms
- Transfer Size: 39 KB

**Network Requests:** 43
- Images: 3
- Fonts: 9
- Scripts: 26
- Stylesheets: 2
- XHR/Fetch: 2

**❌ Failed Requests:** 1
- https://www.google-analytics.com/g/collect?v=2&tid=G-L1W7YY173M&gtm=45je5c30v9236528652za200zd9236528652&_p=1764882304903&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=1224971221.1764882305&ul=en-us&sr=1920x1080&uaa=x86&uab=64&uafvl=HeadlessChrome%3B143.0.7499.4%7CChromium%3B143.0.7499.4%7CNot%2520A(Brand%3B24.0.0.0&uamb=0&uam=&uap=Windows&uapv=19.0.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=2&tag_exp=103116026~103200004~104527907~104528501~104684208~104684211~105391252~115583767~115938466~115938469~116184927~116184929~116217636~116217638~116251935~116251937~116514482&dp=%2F&sid=1764882305&sct=1&seg=0&dl=http%3A%2F%2Flocalhost%2F&dt=Capture%20Client%20%7C%20AI%20Voice%20Agents%20%26%20Lead%20Generation%20for%20Small%20Business&en=user_engagement&ep.anonymize_ip=true&_et=2763&tfd=4699
  Error: net::ERR_ABORTED

**❌ Console Errors:** 1
- A tree hydrated but some attributes of the server rendered HTML didn't match the client properties. This won't be patched up. This can happen if a SSR-ed Client Component used:

- A server/client branch `if (typeof window !== 'undefined')`.
- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.
- Date formatting in a user's locale which doesn't match the server.
- External changing data without sending a snapshot of it along with the HTML.
- Invalid HTML tag nesting.

It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.

%s%s https://react.dev/link/hydration-mismatch 

  ...
    <HTTPAccessFallbackErrorBoundary pathname="/services" notFound={<NotAllowedRootHTTPFallbackError>} ...>
      <RedirectBoundary>
        <RedirectErrorBoundary router={{...}}>
          <Head>
          <__next_root_layout_boundary__>
            <SegmentViewNode type="layout" pagePath="/capture-c...">
              <SegmentTrieNode>
              <link>
              <script>
              <script>
              <script>
              <script>
              <RootLayout>
                <html lang="en" className="dark scrol...">
                  <head>
                  <body className="poppins_cf...">
                    <Script>
                    <GoogleAnalytics>
                    <WebVitals>
                    <ScrollDepthTracker>
                    <a>
                    <MegaMenu>
                    <main>
                    <Footer>
                      <footer className="bg-gradien...">
                        <div>
                        <div>
                        <div>
                        <div className="container ...">
                          <div className="py-12 sm:p...">
                            <div>
                            <div className="mt-12 sm:m...">
                              <div>
                              <div className="max-w-2xl">
                                <h3>
                                <p>
                                <form className="flex flex-...">
                                  <label>
                                  <input
                                    id="footer-email"
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 w-full min-h-[48px] px-4 py-3 bg-white/5 border border-white/10 ..."
-                                   style={{caret-color:"transparent"}}
                                  >
                                  ...
                            ...
                          ...
          ...

  at http://localhost:3001/_next/static/chunks/865d7_next_dist_6bdb0dc5._.js:3117

**⚠️ Console Warnings:** 1
- Image with src "http://localhost:3001/logo-desktop.svg" has either width or height modified, but not

---

### Demo (/demo)

**Load Metrics:**
- Total Load Time: 2794ms
- First Contentful Paint: 572ms
- Transfer Size: 24 KB

**Network Requests:** 43
- Images: 3
- Fonts: 9
- Scripts: 26
- Stylesheets: 2
- XHR/Fetch: 2

**❌ Failed Requests:** 1
- https://www.google-analytics.com/g/collect?v=2&tid=G-L1W7YY173M&gtm=45je5c30v9236528652za200zd9236528652&_p=1764882308160&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=1224971221.1764882305&ul=en-us&sr=1920x1080&uaa=x86&uab=64&uafvl=HeadlessChrome%3B143.0.7499.4%7CChromium%3B143.0.7499.4%7CNot%2520A(Brand%3B24.0.0.0&uamb=0&uam=&uap=Windows&uapv=19.0.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&tag_exp=103116026~103200004~104527907~104528500~104684208~104684211~105391252~115583767~115938466~115938469~116184927~116184929~116217636~116217638~116251935~116251937~116474638&dp=%2Fservices&sid=1764882305&sct=1&seg=1&dl=http%3A%2F%2Flocalhost%2Fservices&dt=Marketing%20Services%20for%20Small%20Business%20%7C%20Voice%20AI%2C%20Ads%20%26%20Lead%20Gen%20%7C%20Capture%20Client%20%7C%20Capture%20Client&_s=1&tfd=3925
  Error: net::ERR_ABORTED

**❌ Console Errors:** 1
- A tree hydrated but some attributes of the server rendered HTML didn't match the client properties. This won't be patched up. This can happen if a SSR-ed Client Component used:

- A server/client branch `if (typeof window !== 'undefined')`.
- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.
- Date formatting in a user's locale which doesn't match the server.
- External changing data without sending a snapshot of it along with the HTML.
- Invalid HTML tag nesting.

It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.

%s%s https://react.dev/link/hydration-mismatch 

  ...
    <HTTPAccessFallbackErrorBoundary pathname="/demo" notFound={<NotAllowedRootHTTPFallbackError>} forbidden={undefined} ...>
      <RedirectBoundary>
        <RedirectErrorBoundary router={{...}}>
          <Head>
          <__next_root_layout_boundary__>
            <SegmentViewNode type="layout" pagePath="/capture-c...">
              <SegmentTrieNode>
              <link>
              <script>
              <script>
              <script>
              <script>
              <RootLayout>
                <html lang="en" className="dark scrol...">
                  <head>
                  <body className="poppins_cf...">
                    <Script>
                    <GoogleAnalytics>
                    <WebVitals>
                    <ScrollDepthTracker>
                    <a>
                    <MegaMenu>
                    <main>
                    <Footer>
                      <footer className="bg-gradien...">
                        <div>
                        <div>
                        <div>
                        <div className="container ...">
                          <div className="py-12 sm:p...">
                            <div>
                            <div className="mt-12 sm:m...">
                              <div>
                              <div className="max-w-2xl">
                                <h3>
                                <p>
                                <form className="flex flex-...">
                                  <label>
                                  <input
                                    id="footer-email"
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 w-full min-h-[48px] px-4 py-3 bg-white/5 border border-white/10 ..."
-                                   style={{caret-color:"transparent"}}
                                  >
                                  ...
                            ...
                          ...
          ...

  at http://localhost:3001/_next/static/chunks/865d7_next_dist_6bdb0dc5._.js:3117

**⚠️ Console Warnings:** 1
- Image with src "http://localhost:3001/logo-desktop.svg" has either width or height modified, but not

---

### Location: Knoxville (/locations/voice-ai-knoxville-tn)

**Load Metrics:**
- Total Load Time: 2927ms
- First Contentful Paint: 476ms
- Transfer Size: 67 KB

**Network Requests:** 44
- Images: 4
- Fonts: 9
- Scripts: 26
- Stylesheets: 2
- XHR/Fetch: 2

**❌ Failed Requests:** 1
- https://www.google-analytics.com/g/collect?v=2&tid=G-L1W7YY173M&gtm=45je5c30v9236528652za200zd9236528652&_p=1764882311594&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=1224971221.1764882305&ul=en-us&sr=1920x1080&uaa=x86&uab=64&uafvl=HeadlessChrome%3B143.0.7499.4%7CChromium%3B143.0.7499.4%7CNot%2520A(Brand%3B24.0.0.0&uamb=0&uam=&uap=Windows&uapv=19.0.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&tag_exp=103116026~103200004~104527906~104528501~104684208~104684211~105391252~115583767~115616985~115938465~115938469~116184927~116184929~116217636~116217638~116251935~116251937~116427528~116474637&dp=%2Fdemo&sid=1764882305&sct=1&seg=1&dl=http%3A%2F%2Flocalhost%2Fdemo&dt=Interactive%20AI%20Voice%20Demo%20%7C%20Capture%20Client&_s=1&tfd=3482
  Error: net::ERR_ABORTED

**❌ Console Errors:** 1
- A tree hydrated but some attributes of the server rendered HTML didn't match the client properties. This won't be patched up. This can happen if a SSR-ed Client Component used:

- A server/client branch `if (typeof window !== 'undefined')`.
- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.
- Date formatting in a user's locale which doesn't match the server.
- External changing data without sending a snapshot of it along with the HTML.
- Invalid HTML tag nesting.

It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.

%s%s https://react.dev/link/hydration-mismatch 

  ...
    <RedirectErrorBoundary router={{...}}>
      <InnerLayoutRouter url="/locations..." tree={[...]} params={{slug:"voic..."}} cacheNode={{lazyData:null, ...}} ...>
        <SegmentViewNode type="page" pagePath="/capture-c...">
          <SegmentTrieNode>
          <LocationPage>
            <div className="min-h-scre...">
              <Script>
              <Script>
              <Script>
              <Script>
              <Script>
              <Script>
              <Script>
              <MobileCTABar>
              <div>
              <div>
              <div>
              <section>
              <section>
              <section>
              <PremiumLocationTestimonials>
              <PremiumLocationFAQ>
              <section>
              <section>
              <section className="py-12 sm:p...">
                <div className="container ...">
                  <div className="bg-slate-9...">
                    <div>
                    <OptimizedLeadForm source="voice-ai-k...">
                      <div className="space-y-6">
                        <div>
                        <form onSubmit={function handleStepOne} className="space-y-5 ...">
                          <div className="space-y-5">
                            <div className="group">
                              <label>
                              <div className="relative">
                                <input
                                  id="name"
                                  type="text"
                                  placeholder="John Smith"
                                  value=""
                                  onChange={function onChange}
                                  required={true}
                                  autoComplete="name"
                                  className="w-full min-h-[52px] px-5 py-4 text-base bg-white/[0.03] backdrop-blur-xl ..."
-                                 style={{}}
                                >
                                ...
                            <div className="group">
                              <label>
                              <div className="relative">
                                <input
                                  id="phone"
                                  type="tel"
                                  inputMode="numeric"
                                  placeholder="(865) 555-1234"
                                  value=""
                                  onChange={function onChange}
                                  required={true}
                                  autoComplete="tel"
                                  pattern="[0-9\s\(\)\-\+]+"
                                  className="w-full min-h-[52px] px-5 py-4 text-base bg-white/[0.03] backdrop-blur-xl ..."
-                                 style={{}}
                                >
                                ...
                          ...
                    ...
              ...
        ...
      ...

  at http://localhost:3001/_next/static/chunks/865d7_next_dist_6bdb0dc5._.js:3117

**⚠️ Console Warnings:** 1
- Image with src "http://localhost:3001/logo-desktop.svg" has either width or height modified, but not

---

### Pricing (/pricing)

**Load Metrics:**
- Total Load Time: 3484ms
- First Contentful Paint: 1036ms
- Transfer Size: 28 KB

**Network Requests:** 44
- Images: 3
- Fonts: 9
- Scripts: 27
- Stylesheets: 2
- XHR/Fetch: 2

**❌ Failed Requests:** 1
- https://www.google-analytics.com/g/collect?v=2&tid=G-L1W7YY173M&gtm=45je5c30v9236528652za200zd9236528652&_p=1764882314800&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=1224971221.1764882305&ul=en-us&sr=1920x1080&uaa=x86&uab=64&uafvl=HeadlessChrome%3B143.0.7499.4%7CChromium%3B143.0.7499.4%7CNot%2520A(Brand%3B24.0.0.0&uamb=0&uam=&uap=Windows&uapv=19.0.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&tag_exp=103116026~103200004~104527907~104528501~104684208~104684211~105391253~115583767~115616986~115938466~115938468~116184927~116184929~116217636~116217638~116251935~116251937&dp=%2Flocations%2Fvoice-ai-knoxville-tn&sid=1764882305&sct=1&seg=1&dl=http%3A%2F%2Flocalhost%2Flocations%2Fvoice-ai-knoxville-tn&dt=Voice%20AI%20Agency%20in%20Knoxville%2C%20TN%20%7C%20Capture%20Client%20%7C%20Capture%20Client&_s=1&tfd=4479
  Error: net::ERR_ABORTED

**❌ Console Errors:** 1
- A tree hydrated but some attributes of the server rendered HTML didn't match the client properties. This won't be patched up. This can happen if a SSR-ed Client Component used:

- A server/client branch `if (typeof window !== 'undefined')`.
- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.
- Date formatting in a user's locale which doesn't match the server.
- External changing data without sending a snapshot of it along with the HTML.
- Invalid HTML tag nesting.

It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.

%s%s https://react.dev/link/hydration-mismatch 

  ...
    <HTTPAccessFallbackErrorBoundary pathname="/pricing" notFound={<NotAllowedRootHTTPFallbackError>} ...>
      <RedirectBoundary>
        <RedirectErrorBoundary router={{...}}>
          <Head>
          <__next_root_layout_boundary__>
            <SegmentViewNode type="layout" pagePath="/capture-c...">
              <SegmentTrieNode>
              <link>
              <script>
              <script>
              <script>
              <script>
              <RootLayout>
                <html lang="en" className="dark scrol...">
                  <head>
                  <body className="poppins_cf...">
                    <Script>
                    <GoogleAnalytics>
                    <WebVitals>
                    <ScrollDepthTracker>
                    <a>
                    <MegaMenu>
                    <main>
                    <Footer>
                      <footer className="bg-gradien...">
                        <div>
                        <div>
                        <div>
                        <div className="container ...">
                          <div className="py-12 sm:p...">
                            <div>
                            <div className="mt-12 sm:m...">
                              <div>
                              <div className="max-w-2xl">
                                <h3>
                                <p>
                                <form className="flex flex-...">
                                  <label>
                                  <input
                                    id="footer-email"
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 w-full min-h-[48px] px-4 py-3 bg-white/5 border border-white/10 ..."
-                                   style={{caret-color:"transparent"}}
                                  >
                                  ...
                            ...
                          ...
          ...

  at http://localhost:3001/_next/static/chunks/865d7_next_dist_6bdb0dc5._.js:3117

**⚠️ Console Warnings:** 1
- Image with src "http://localhost:3001/logo-desktop.svg" has either width or height modified, but not

---

## Recommendations

### Critical (Blocking $3M Quality)
1. Fix all console errors immediately - these indicate broken functionality
2. Investigate and resolve JavaScript errors that may impact user experience

### High Priority
1. Fix failed network requests (404s, failed assets)
2. Ensure all images and resources load correctly

### Performance Optimization
1. Reduce page load time - target <2s for premium experience
2. Implement code splitting and lazy loading
3. Optimize critical rendering path

## Screenshots

### Homepage
- Loading state: `perf-homepage-loading.png`
- Loaded state: `perf-homepage-loaded.png`

### Services
- Loading state: `perf-services-loading.png`
- Loaded state: `perf-services-loaded.png`

### Demo
- Loading state: `perf-demo-loading.png`
- Loaded state: `perf-demo-loaded.png`

### Location: Knoxville
- Loading state: `perf-location--knoxville-loading.png`
- Loaded state: `perf-location--knoxville-loaded.png`

### Pricing
- Loading state: `perf-pricing-loading.png`
- Loaded state: `perf-pricing-loaded.png`

