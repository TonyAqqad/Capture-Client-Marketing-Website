# Form Patterns

## Validation

Always use shared validation from `/lib/form-validation.ts`:

```typescript
import {
  validateName,
  validateEmail,
  validatePhone,
  validateService,
  sanitizeInput,
  hasValidationErrors,
} from '@/lib/form-validation';
```

### Available Validators

| Function | Required | Rules |
|----------|----------|-------|
| `validateName(value)` | Yes | Min 2 characters |
| `validateEmail(value)` | Yes | Valid email format |
| `validateEmailOptional(value)` | No | Valid format if provided |
| `validatePhone(value)` | Yes | Min 10 digits |
| `validateService(value)` | Yes | Non-empty selection |
| `validateChallenge(value)` | Yes | Non-empty selection |
| `validateRequired(value, fieldName)` | Yes | Non-empty, custom field name |

### Validation Pattern

```typescript
const [errors, setErrors] = useState<FormValidationErrors>({});
const [touched, setTouched] = useState<Record<string, boolean>>({});

const handleBlur = (field: string) => {
  setTouched({ ...touched, [field]: true });
  const error = validateField(field, formData[field]);
  setErrors({ ...errors, [field]: error });
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const newErrors = {
    name: validateName(formData.name),
    email: validateEmail(formData.email),
    phone: validatePhone(formData.phone),
    service: validateService(formData.service),
  };

  setErrors(newErrors);
  setTouched({ name: true, email: true, phone: true, service: true });

  if (hasValidationErrors(newErrors)) return;

  // Proceed with submission...
};
```

## Sanitization

Always sanitize user input before submission:

```typescript
import { sanitizeInput } from '@/lib/form-validation';

const payload = {
  name: sanitizeInput(formData.name),
  email: sanitizeInput(formData.email),
  message: sanitizeInput(formData.message, 1000), // Custom max length
};
```

## Required Form Analytics

Import from `/lib/analytics.ts`:

```typescript
import {
  trackFormStart,
  trackFormSubmission,
  trackPhoneClick,
} from '@/lib/analytics';
```

### Usage Pattern

```typescript
const [formStarted, setFormStarted] = useState(false);

// Track first interaction
const handleFormStart = () => {
  if (!formStarted) {
    trackFormStart(`lead_capture_${source}`);
    setFormStarted(true);
  }
};

// On first field focus/change
<input onFocus={handleFormStart} onChange={(e) => {
  handleFormStart();
  handleFieldChange('name', e.target.value);
}} />

// Track submission
trackFormSubmission(`lead_capture_${source}`, {
  service: formData.service,
  source: source,
});

// Track phone clicks
<a href="tel:865-346-6111" onClick={() => trackPhoneClick('865-346-6111', `form_${source}`)}>
```

## API Submission

All lead forms submit to `/api/submit-lead`:

```typescript
const payload = {
  name: formData.name,
  email: formData.email,
  phone: formData.phone,
  company: "",                    // Often empty, but required by GHL
  source: source,                 // e.g., "contact", "pricing", "demo"
  service: formData.service,      // OR challenge: formData.challenge
  message: formData.message,      // Optional
};

try {
  const response = await fetch('/api/submit-lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    // Log but don't block user
  }
} catch {
  // Graceful degradation - show success anyway
}

// Always show success (graceful degradation)
setSubmitted(true);
```

## Form Components

### Existing Form Components

| Component | Purpose | Multi-step |
|-----------|---------|------------|
| `LeadCaptureForm` | General contact form | No |
| `OptimizedLeadForm` | Progressive disclosure | Yes (2 steps) |
| `ContactForm` | Contact page specific | No |
| `PersonalizationForm` | Demo personalization | No |

### SMS Consent (A2P 10DLC Compliant)

Required for SMS marketing compliance:

```tsx
<label className="flex items-start gap-3">
  <input
    type="checkbox"
    checked={formData.smsConsent}
    onChange={(e) => setFormData({ ...formData, smsConsent: e.target.checked })}
  />
  <span className="text-sm text-slate-600">
    I agree to receive text messages from Capture Client...
    Reply STOP to unsubscribe.{" "}
    <Link href="/privacy-policy">Privacy Policy</Link> &{" "}
    <Link href="/terms-of-service">Terms</Link>
  </span>
</label>
```

## Success States

Show celebratory feedback:

```tsx
if (submitted) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
      <CheckCircle className="w-12 h-12 text-blue-600" />
      <h3>Message Sent!</h3>
      <p>We'll get back to you within <strong>2 hours</strong>.</p>
    </motion.div>
  );
}
```

## Error Display

Inline validation errors with animation:

```tsx
{errors.name && touched.name && (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex items-center gap-1.5 mt-2 text-sm text-red-600"
  >
    <AlertCircle className="w-4 h-4" />
    <span>{errors.name}</span>
  </motion.div>
)}
```
