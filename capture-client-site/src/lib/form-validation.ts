/**
 * Shared Form Validation Utilities
 *
 * All form validation should use these functions for consistency.
 * See .claude/rules/61-form-patterns.md for usage guidelines.
 */

// ============================================================================
// REGEX PATTERNS
// ============================================================================

/** Standard email validation - matches user@domain.tld format */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** US phone number - accepts various formats, requires 10 digits */
export const PHONE_REGEX = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

// ============================================================================
// VALIDATION FUNCTIONS
// Return error message string if invalid, null if valid
// ============================================================================

/**
 * Validate name field
 * - Required
 * - Minimum 2 characters
 */
export function validateName(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return "Please enter your name";
  if (trimmed.length < 2) return "Name must be at least 2 characters";
  return null;
}

/**
 * Validate email field
 * - Required
 * - Must match email format
 */
export function validateEmail(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return "Please enter your email";
  if (!EMAIL_REGEX.test(trimmed)) return "Please enter a valid email address";
  return null;
}

/**
 * Validate email field (optional)
 * - Not required
 * - If provided, must match email format
 */
export function validateEmailOptional(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null; // Empty is valid for optional
  if (!EMAIL_REGEX.test(trimmed)) return "Please enter a valid email address";
  return null;
}

/**
 * Validate phone field
 * - Required
 * - Must have at least 10 digits
 */
export function validatePhone(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return "Please enter your phone number";
  const digitsOnly = trimmed.replace(/\D/g, "");
  if (digitsOnly.length < 10) return "Please enter a valid phone number";
  return null;
}

/**
 * Validate required dropdown/select field
 * - Required
 * - Must have a value selected
 */
export function validateRequired(value: string, fieldName: string): string | null {
  if (!value || !value.trim()) return `Please select a ${fieldName}`;
  return null;
}

/**
 * Validate service dropdown (convenience wrapper)
 */
export function validateService(value: string): string | null {
  return validateRequired(value, "service");
}

/**
 * Validate challenge dropdown (convenience wrapper)
 */
export function validateChallenge(value: string): string | null {
  return validateRequired(value, "challenge");
}

// ============================================================================
// SANITIZATION FUNCTIONS
// ============================================================================

/**
 * Sanitize user input
 * - Removes null bytes
 * - Limits length to prevent abuse
 * - Trims whitespace
 */
export function sanitizeInput(value: string, maxLength: number = 500): string {
  return value
    .replace(/\0/g, "") // Remove null bytes
    .trim()
    .slice(0, maxLength);
}

/**
 * Format phone number for display as (XXX) XXX-XXXX
 * Re-exported from utils.ts for convenience
 */
export { formatPhoneNumber } from "./utils";

// ============================================================================
// VALIDATION ERROR INTERFACE
// ============================================================================

export interface FormValidationErrors {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  challenge?: string;
  message?: string;
  [key: string]: string | undefined;
}

// ============================================================================
// BATCH VALIDATION
// ============================================================================

export type ValidationRule = (value: string) => string | null;

export interface FieldValidation {
  value: string;
  validate: ValidationRule;
}

/**
 * Validate multiple fields at once
 * Returns object with field names as keys and error messages as values
 */
export function validateFields(fields: Record<string, FieldValidation>): FormValidationErrors {
  const errors: FormValidationErrors = {};

  for (const [fieldName, { value, validate }] of Object.entries(fields)) {
    const error = validate(value);
    if (error) {
      errors[fieldName] = error;
    }
  }

  return errors;
}

/**
 * Check if validation errors object has any errors
 */
export function hasValidationErrors(errors: FormValidationErrors): boolean {
  return Object.values(errors).some((error) => error !== undefined && error !== null);
}
