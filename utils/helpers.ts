import * as fs from 'fs';
import * as path from 'path';
import { Page } from '@playwright/test';

/**
 * HELPER UTILITIES - Centralized utility functions for test automation
 * 
 * Simplified utilities for:
 * - Test data management
 * - Page stability checks
 * 
 * Note: reCAPTCHA handled via API mocking in mockInterceptor.ts
 */

// ============================================================================
// DATA MANAGEMENT
// ============================================================================

/**
 * Retrieves test data from testData.json
 */
export function getTestData(key: string) {
  const dataPath = path.resolve(__dirname, 'testData.json');
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  return data[key];
}

// ============================================================================
// PAGE STABILITY
// ============================================================================

/**
 * Waits for page to reach stable state (no network activity)
 */
export async function waitForPageStable(page: Page, timeout: number = 5000): Promise<void> {
  try {
    await page.waitForLoadState('networkidle', { timeout }).catch(() => {});
  } catch (error) {
    console.log('⚠ Page load timeout, proceeding anyway');
  }
}