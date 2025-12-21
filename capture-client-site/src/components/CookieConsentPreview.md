# Cookie Consent Banner - Visual Reference

## Desktop View (1440px+)

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  [🍪]  We Value Your Privacy                    [ Accept All    ] │
│                                                  [ Reject All    ] │
│       We use cookies to enhance your browsing   [ ⚙️ Customize   ] │
│       experience, analyze site traffic, and                        │
│       personalize content. Learn more                              │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## Mobile View (375px)

```
┌─────────────────────────────────┐
│                                 │
│  We Value Your Privacy          │
│                                 │
│  We use cookies to enhance      │
│  your browsing experience...    │
│  Learn more                     │
│                                 │
│  [     Accept All     ]         │
│  [ Reject ] [Customize]         │
│                                 │
└─────────────────────────────────┘
```

## Customize Panel (Desktop)

```
┌─────────────────────────────────────────────────────────────────────┐
│  Customize Cookie Preferences                                    [×]│
│                                                                     │
│  ┌───────────────────────────────────────────────────┐             │
│  │ Essential                    [Always Active]      │             │
│  │ Required for the website to function properly.   │             │
│  └───────────────────────────────────────────────────┘             │
│                                                                     │
│  ┌───────────────────────────────────────────────────┐             │
│  │ Analytics                              [●────]    │ (Toggle)    │
│  │ Help us understand how visitors interact...      │             │
│  └───────────────────────────────────────────────────┘             │
│                                                                     │
│  ┌───────────────────────────────────────────────────┐             │
│  │ Marketing                              [────●]    │ (Toggle)    │
│  │ Used to track visitors across websites...        │             │
│  └───────────────────────────────────────────────────┘             │
│                                                                     │
│  [ Save Preferences ]  [ Cancel ]                                  │
└─────────────────────────────────────────────────────────────────────┘
```

## Color Scheme

- **Background**: Dark navy `#0F172A` with 95% opacity + backdrop blur
- **Border**: White 10% opacity (`border-white/10`)
- **Primary Button**: Blue gradient (`btn-blue`)
- **Secondary Button**: White/5 background (`btn-ghost`)
- **Links**: Cyan `#00C9FF` hover to blue `#2563eb`
- **Text**: White for headings, gray-300 for body

## Animations

1. **Initial Appearance**: Slides up from bottom with fade-in (0.4s)
2. **Button Hovers**: Scale 105% on btn-blue
3. **Toggle Switches**: Smooth color transition + scale on hover
4. **Exit**: Slides down with fade-out

## Z-Index Layers

```
9999  ← Cookie Consent Banner (highest)
1000  ← Header/Navigation
100   ← Modals
50    ← MobileCTABar
10    ← Content over backgrounds
1     ← Standard elements
```

## State Machine

```
[Page Load]
    ↓
[Wait 1s]
    ↓
[Check localStorage]
    ↓
[Has consent?] ──Yes──→ [Apply preferences & hide]
    ↓ No
[Show Banner]
    ↓
[User Choice]
    ├─→ Accept All    → [Save all true]    ──→ [Hide & update consent]
    ├─→ Reject All    → [Save all false]   ──→ [Hide & update consent]
    └─→ Customize     → [Show toggles]
                            ↓
                    [Save Preferences] ──→ [Hide & update consent]
```

## Integration Points

1. **GoogleAnalytics.tsx**: Sets default consent to 'denied'
2. **CookieConsent.tsx**: Updates consent on user choice
3. **layout.tsx**: Renders banner in LazyMotionProvider
4. **localStorage**: Persists user preferences

## LocalStorage Schema

```json
// cookie_consent
{
  "essential": true,
  "analytics": true,
  "marketing": false
}

// cookie_consent_timestamp
"2025-12-09T10:30:00.000Z"
```

## Responsive Breakpoints

- **Mobile**: < 640px (sm)
  - Buttons stack vertically
  - Full width layout
  - Larger touch targets

- **Tablet**: 640px - 1024px
  - Buttons start appearing horizontally
  - Medium padding

- **Desktop**: > 1024px
  - Full horizontal layout
  - Buttons on right side
  - Maximum content width
