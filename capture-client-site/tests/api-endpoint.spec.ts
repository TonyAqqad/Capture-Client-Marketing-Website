import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

test.describe('API Endpoint Testing', () => {

  test('Verify /api/submit-lead endpoint exists and accepts POST', async ({ request }) => {
    console.log('\n========================================');
    console.log('API ENDPOINT VERIFICATION');
    console.log('========================================\n');

    // Try to POST to the API endpoint
    const response = await request.post(`${BASE_URL}/api/submit-lead`, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        name: 'Test User',
        email: 'test@example.com',
        phone: '555-123-4567',
        company: '',
      },
    });

    console.log(`API Response Status: ${response.status()}`);
    console.log(`API Response OK: ${response.ok()}`);

    const responseBody = await response.json();
    console.log('API Response Body:', JSON.stringify(responseBody, null, 2));

    // The endpoint should return 200 (success)
    expect(response.status()).toBe(200);
    expect(responseBody.success).toBe(true);

    console.log('\n✅ API endpoint is functional');
    console.log('========================================\n');
  });

  test('Verify API endpoint validation - missing email and phone', async ({ request }) => {
    console.log('\n========================================');
    console.log('API VALIDATION TEST - Missing Required Fields');
    console.log('========================================\n');

    // Try to POST without email or phone
    const response = await request.post(`${BASE_URL}/api/submit-lead`, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        name: 'Test User',
        email: '',
        phone: '',
        company: '',
      },
    });

    console.log(`API Response Status: ${response.status()}`);

    const responseBody = await response.json();
    console.log('API Response Body:', JSON.stringify(responseBody, null, 2));

    // Should return 400 for missing required fields
    expect(response.status()).toBe(400);
    expect(responseBody.error).toContain('Email or phone is required');

    console.log('\n✅ API validation is working correctly');
    console.log('========================================\n');
  });

  test('Verify API endpoint accepts phone-only submission', async ({ request }) => {
    console.log('\n========================================');
    console.log('API TEST - Phone Only Submission');
    console.log('========================================\n');

    // Try to POST with only phone (no email)
    const response = await request.post(`${BASE_URL}/api/submit-lead`, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        name: 'Test User',
        email: '',
        phone: '555-123-4567',
        company: '',
      },
    });

    console.log(`API Response Status: ${response.status()}`);

    const responseBody = await response.json();
    console.log('API Response Body:', JSON.stringify(responseBody, null, 2));

    // Should succeed with just phone
    expect(response.status()).toBe(200);
    expect(responseBody.success).toBe(true);

    console.log('\n✅ Phone-only submission works');
    console.log('========================================\n');
  });
});
