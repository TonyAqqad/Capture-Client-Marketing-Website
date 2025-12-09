/**
 * ObfuscatedEmail Component
 *
 * Purpose: Prevents spam bots from harvesting email addresses while keeping
 * them readable and clickable for humans.
 *
 * Strategy: CSS direction trick (unicode-bidi: bidi-override + direction: rtl)
 * - Email parts are reversed in data attributes
 * - CSS reverses them back visually for humans
 * - Spam bots see gibberish in the DOM
 * - Screen readers read the aria-label
 * - Click-to-copy functionality included
 */

"use client";

import { useState } from 'react';
import { Mail } from 'lucide-react';

interface ObfuscatedEmailProps {
  /** Email address to obfuscate (e.g., "team@captureclient.com") */
  email: string;
  /** Additional CSS classes */
  className?: string;
  /** Whether to render as a mailto link (default: true) */
  asLink?: boolean;
  /** Show icon before email */
  showIcon?: boolean;
  /** Callback for click tracking */
  onClick?: () => void;
  /** Custom children to render instead of default email display */
  children?: React.ReactNode;
}

/**
 * Reverses a string for CSS obfuscation
 * Example: "team" -> "maet"
 */
function reverseString(str: string): string {
  return str.split('').reverse().join('');
}

/**
 * Splits email into parts for obfuscation
 * Example: "team@captureclient.com" -> { user: "team", domain: "captureclient.com" }
 */
function parseEmail(email: string): { user: string; domain: string } {
  const [user, domain] = email.split('@');
  return { user, domain };
}

export default function ObfuscatedEmail({
  email,
  className = '',
  asLink = true,
  showIcon = false,
  onClick,
  children,
}: ObfuscatedEmailProps) {
  const [copied, setCopied] = useState(false);
  const { user, domain } = parseEmail(email);

  // Reverse the parts for obfuscation
  const reversedUser = reverseString(user);
  const reversedDomain = reverseString(domain);

  const handleClick = (e: React.MouseEvent) => {
    if (!asLink) {
      e.preventDefault();
      // Copy to clipboard
      navigator.clipboard.writeText(email).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
    onClick?.();
  };

  if (asLink) {
    return (
      <>
        <a
          href={`mailto:${email}`}
          className={className}
          onClick={handleClick}
          aria-label={`Email ${email}`}
        >
          {children ? (
            children
          ) : (
            <>
              {/* Subtle gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#4A69E2]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {showIcon && (
                <Mail className="text-[#4A69E2] group-hover:text-[#00C9FF] w-5 h-5 transition-colors duration-300 relative z-10" aria-hidden="true" />
              )}
              <span className="text-[#94A3B8] group-hover:text-[#00C9FF] font-body text-base sm:text-sm transition-colors duration-300 break-all relative z-10">
                <span
                  className="email-obfuscated inline-block"
                  data-user={reversedUser}
                  data-domain={reversedDomain}
                  aria-hidden="true"
                />
                {/* Screen reader accessible text */}
                <span className="sr-only">{email}</span>
              </span>
              {copied && (
                <span className="ml-2 text-xs text-green-500 animate-fade-in">
                  Copied!
                </span>
              )}
            </>
          )}
        </a>
        <style jsx>{`
          .email-obfuscated {
            unicode-bidi: bidi-override;
            direction: rtl;
          }
          .email-obfuscated::before {
            content: attr(data-domain);
          }
          .email-obfuscated::after {
            content: "@" attr(data-user);
          }
        `}</style>
      </>
    );
  }

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={handleClick}
        aria-label={`Click to copy email: ${email}`}
        title="Click to copy"
      >
        {showIcon && (
          <Mail className="text-current mr-2 inline-block align-middle w-4 h-4" aria-hidden="true" />
        )}
        <span
          className="email-obfuscated inline-block"
          data-user={reversedUser}
          data-domain={reversedDomain}
          aria-hidden="true"
        />
        {/* Screen reader accessible text */}
        <span className="sr-only">{email}</span>
        {copied && (
          <span className="ml-2 text-xs text-green-500 animate-fade-in">
            Copied!
          </span>
        )}
      </button>
      <style jsx>{`
        .email-obfuscated {
          unicode-bidi: bidi-override;
          direction: rtl;
        }
        .email-obfuscated::before {
          content: attr(data-domain);
        }
        .email-obfuscated::after {
          content: "@" attr(data-user);
        }
      `}</style>
    </>
  );
}

/**
 * Utility: Simple text email obfuscation (no link)
 * Use this in places where you just want to display email text
 */
export function ObfuscatedEmailText({
  email,
  className = '',
}: {
  email: string;
  className?: string;
}) {
  const { user, domain } = parseEmail(email);
  const reversedUser = reverseString(user);
  const reversedDomain = reverseString(domain);

  return (
    <>
      <span className={className}>
        <span
          className="email-obfuscated inline-block"
          data-user={reversedUser}
          data-domain={reversedDomain}
          aria-hidden="true"
        />
        <span className="sr-only">{email}</span>
      </span>
      <style jsx>{`
        .email-obfuscated {
          unicode-bidi: bidi-override;
          direction: rtl;
        }
        .email-obfuscated::before {
          content: attr(data-domain);
        }
        .email-obfuscated::after {
          content: "@" attr(data-user);
        }
      `}</style>
    </>
  );
}
