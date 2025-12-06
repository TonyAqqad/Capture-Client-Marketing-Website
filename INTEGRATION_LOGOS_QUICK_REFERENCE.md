# Integration Logos Quick Reference Guide

## SimpleIcons CDN Mapping

Quick lookup table for all 40 integrations and their SimpleIcons URLs.

---

## Payments (4)

| Name | SimpleIcons URL |
|------|----------------|
| Stripe | `https://cdn.simpleicons.org/stripe` |
| PayPal | `https://cdn.simpleicons.org/paypal` |
| Square | `https://cdn.simpleicons.org/square` |
| Authorize.Net | `https://cdn.simpleicons.org/authorizenet` |

---

## Communication (4)

| Name | SimpleIcons URL |
|------|----------------|
| Twilio | `https://cdn.simpleicons.org/twilio` |
| Plivo | `https://cdn.simpleicons.org/plivo` |
| SignalWire | `https://cdn.simpleicons.org/signalwire` |
| MessageBird | `https://cdn.simpleicons.org/messagebird` |

---

## Email Marketing (6)

| Name | SimpleIcons URL |
|------|----------------|
| Mailgun | `https://cdn.simpleicons.org/mailgun` |
| SendGrid | `https://cdn.simpleicons.org/sendgrid` |
| Mailchimp | `https://cdn.simpleicons.org/mailchimp` |
| ActiveCampaign | `https://cdn.simpleicons.org/activecampaign` |
| ConvertKit | `https://cdn.simpleicons.org/convertkit` |
| Constant Contact | `https://cdn.simpleicons.org/constantcontact` |

---

## Calendar & Scheduling (3)

| Name | SimpleIcons URL |
|------|----------------|
| Google Calendar | `https://cdn.simpleicons.org/googlecalendar` |
| Calendly | `https://cdn.simpleicons.org/calendly` |
| Outlook | `https://cdn.simpleicons.org/microsoftoutlook` |

---

## Video Conferencing (1)

| Name | SimpleIcons URL |
|------|----------------|
| Zoom | `https://cdn.simpleicons.org/zoom` |

---

## Social Media (4)

| Name | SimpleIcons URL |
|------|----------------|
| Facebook | `https://cdn.simpleicons.org/facebook` |
| Instagram | `https://cdn.simpleicons.org/instagram` |
| TikTok | `https://cdn.simpleicons.org/tiktok` |
| LinkedIn | `https://cdn.simpleicons.org/linkedin` |

---

## Advertising (2)

| Name | SimpleIcons URL |
|------|----------------|
| Google Ads | `https://cdn.simpleicons.org/googleads` |
| Facebook Ads | `https://cdn.simpleicons.org/meta` |

---

## Automation (2)

| Name | SimpleIcons URL |
|------|----------------|
| Zapier | `https://cdn.simpleicons.org/zapier` |
| Make | `https://cdn.simpleicons.org/make` |

---

## CRM (3)

| Name | SimpleIcons URL |
|------|----------------|
| Salesforce | `https://cdn.simpleicons.org/salesforce` |
| HubSpot | `https://cdn.simpleicons.org/hubspot` |
| Pipedrive | `https://cdn.simpleicons.org/pipedrive` |

---

## E-commerce (2)

| Name | SimpleIcons URL |
|------|----------------|
| Shopify | `https://cdn.simpleicons.org/shopify` |
| WooCommerce | `https://cdn.simpleicons.org/woocommerce` |

---

## Accounting (1)

| Name | SimpleIcons URL |
|------|----------------|
| QuickBooks | `https://cdn.simpleicons.org/quickbooks` |

---

## Forms (2)

| Name | SimpleIcons URL |
|------|----------------|
| Typeform | `https://cdn.simpleicons.org/typeform` |
| JotForm | `https://cdn.simpleicons.org/jotform` |

---

## Local SEO (2)

| Name | SimpleIcons URL |
|------|----------------|
| Google Business Profile | `https://cdn.simpleicons.org/googlemybusiness` |
| Yext | `https://cdn.simpleicons.org/yext` |

---

## Analytics (1)

| Name | SimpleIcons URL |
|------|----------------|
| Google Analytics | `https://cdn.simpleicons.org/googleanalytics` |

---

## Website Builders (2)

| Name | SimpleIcons URL |
|------|----------------|
| WordPress | `https://cdn.simpleicons.org/wordpress` |
| ClickFunnels | `https://cdn.simpleicons.org/clickfunnels` |

---

## How to Add New Integrations

1. Check if logo exists on SimpleIcons: https://simpleicons.org/
2. Use lowercase, no spaces: `HubSpot` → `hubspot`
3. Add to IntegrationsGrid.tsx:

```typescript
{
  id: "company-name",
  name: "Company Name",
  logo: "https://cdn.simpleicons.org/companyname",
  description: "Brief description",
  category: "Category",
  featured: false,
}
```

---

## Troubleshooting

### Logo Not Found on SimpleIcons?

**Option 1**: Use company's official logo URL
```typescript
logo: "https://www.company.com/press/logo.svg"
```

**Option 2**: Host locally in `/public/logos/`
```typescript
logo: "/logos/company-logo.svg"
```

**Option 3**: Fallback will auto-render
- First letter of company name
- Gradient background matching theme
- Maintains card layout

---

## Testing URLs

Test any SimpleIcons logo directly in browser:
```
https://cdn.simpleicons.org/stripe
https://cdn.simpleicons.org/hubspot
https://cdn.simpleicons.org/salesforce
```

Should return SVG image immediately.

---

## Color Customization

SimpleIcons CDN supports color parameter:
```
https://cdn.simpleicons.org/stripe/5469d4
https://cdn.simpleicons.org/hubspot/ff7a59
```

Format: `/brandname/hexcolor` (without `#`)
