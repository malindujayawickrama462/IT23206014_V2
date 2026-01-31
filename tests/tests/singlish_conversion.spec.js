const { test, expect } = require('@playwright/test');

test.describe('Singlish to Sinhala Conversion Tests', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to the target application
    await page.goto('https://www.swifttranslator.com/');
  });

  /**
   * POSITIVE FUNCTIONAL TESTS (Pos_Fun)
   * Focus: Accuracy and correct real-time conversion
   */
  test('Pos_Fun_0001: Convert a short daily greeting phrase', async ({ page }) => {
    const input = 'oyaata kohomadha?';
    const expected = 'ඔයාට කොහොමද?';

    // Enter Singlish text [cite: 50]
    await page.fill('textarea', input); // Replace with actual site selector

    // Observe real-time output [cite: 51]
    const actualOutput = await page.textContent('textarea'); 
    
    // Accuracy validation [cite: 64]
    expect(actualOutput.trim()).toBe(expected);
  });

  test('Pos_Fun_0002: Simple sentence conversion - Home', async ({ page }) => {
    await page.fill('textarea', 'mama gedhara yanavaa.');
    const actualOutput = await page.textContent('textarea');
    expect(actualOutput).toContain('මම ගෙදර යනවා'); 
  });

  /**
   * NEGATIVE FUNCTIONAL TESTS (Neg_Fun)
   * Focus: Robustness and failure behavior for messy/unusual inputs
   */
  test('Neg_Fun_0001: Missing spaces (Joined words)', async ({ page }) => {
    // Testing robustness with joined words [cite: 268, 57]
    const input = 'mamagedharayanavaa'; 
    await page.fill('textarea', input);
    
    const actualOutput = await page.textContent('textarea');
    // Expectation: The system might fail to segment words correctly
    console.log(`Actual Output for joined words: ${actualOutput}`);
  });

  /**
   * UI TEST SCENARIO (Pos_UI)
   * Focus: Real-time update behavior
   */
  test('Pos_UI_0001: Sinhala output updates automatically in real-time', async ({ page }) => {
    const inputField = page.locator('textarea');
    const outputField = page.locator('textarea');

    // Type character by character to verify real-time update [cite: 78, 80]
    await inputField.type('man');
    let output = await outputField.textContent();
    expect(output).not.toBe('');

    await inputField.type(' gedhara');
    output = await outputField.textContent();
    expect(output).toContain('ගෙදර');
  });

  test('Pos_UI_0002: Clearing input should clear the output', async ({ page }) => {
    const inputField = page.locator('textarea');
    const outputField = page.locator('textarea');

    await inputField.fill('test input');
    await inputField.clear(); // 

    const output = await outputField.textContent();
    expect(output.trim()).toBe('');
  });

});