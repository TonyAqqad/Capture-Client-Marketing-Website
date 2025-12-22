/**
 * JSON-LD Schema Injection Component
 *
 * This component safely injects JSON-LD structured data into the page head.
 * JSON-LD is Google's preferred format for structured data (2025).
 *
 * Usage:
 * <JsonLd schema={generateOrganizationSchema()} />
 * <JsonLd schema={generateLocalBusinessSchema(locationData)} />
 *
 * Multiple schemas can be added to a single page for comprehensive SEO.
 *
 * References:
 * - Google prefers JSON-LD: https://developers.google.com/search/docs/appearance/structured-data
 * - Next.js metadata best practices: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
 */

import Script from 'next/script';

interface JsonLdProps {
  schema: Record<string, unknown> | Array<Record<string, unknown>>;
  idPrefix?: string;
}

export default function JsonLd({ schema, idPrefix }: JsonLdProps) {
  // Handle both single schema objects and arrays of schemas
  const schemaArray = Array.isArray(schema) ? schema : [schema];

  // Generate unique prefix from schema content hash if not provided
  const prefix = idPrefix ?? JSON.stringify(schema).slice(0, 8);

  return (
    <>
      {schemaArray.map((schemaItem, index) => (
        <Script
          key={`${prefix}-jsonld-${index}`}
          id={`${prefix}-jsonld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaItem, null, 0),
          }}
          strategy="beforeInteractive"
        />
      ))}
    </>
  );
}

/**
 * Alternative: Inline JSON-LD for immediate rendering
 * Use this for critical above-the-fold content
 */
export function InlineJsonLd({ schema, idPrefix }: JsonLdProps) {
  const schemaArray = Array.isArray(schema) ? schema : [schema];

  // Generate unique prefix from schema content hash if not provided
  const prefix = idPrefix ?? JSON.stringify(schema).slice(0, 8);

  return (
    <>
      {schemaArray.map((schemaItem, index) => (
        <script
          key={`${prefix}-jsonld-inline-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaItem, null, 0),
          }}
        />
      ))}
    </>
  );
}
