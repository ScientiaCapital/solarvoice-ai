/**
 * Puppeteer Example Usage - Simple Web Scraping
 * Principal Architect Implementation
 * 
 * @description Basic example showing Puppeteer web scraping capabilities
 * @author Principal Staff Architect
 */

import puppeteer from 'puppeteer';

/**
 * Simple website scraping example
 * Enhanced with Principal Architect browser configuration
 */
async function scrapeWebsite() {
  let browser;
  
  try {
    // Launch a new browser instance with enhanced configuration
    browser = await puppeteer.launch({
      headless: true, // Run without visible browser window
      defaultViewport: null, // Use full page viewport
      args: ['--no-sandbox', '--disable-setuid-sandbox'] // Security and compatibility options
    });
    
    // Create a new page
    const page = await browser.newPage();
    
    // Set viewport for consistent results
    await page.setViewport({ width: 1920, height: 1080 });
    
    // Set user agent to avoid bot detection
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36');
    
    console.log('🌐 Navigating to example.com...');
    
    // Navigate to a website
    await page.goto('https://example.com', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    
    // Extract page title and content
    const pageData = await page.evaluate(() => ({
      title: document.title,
      url: window.location.href,
      mainHeading: document.querySelector('h1')?.textContent,
      description: document.querySelector('p')?.textContent,
      timestamp: new Date().toISOString()
    }));
    
    console.log('📄 Page Data:', pageData);
    
    // Take a screenshot
    const screenshotPath = `example-${Date.now()}.png`;
    await page.screenshot({ 
      path: screenshotPath,
      fullPage: true
    });
    
    console.log(`📸 Screenshot saved: ${screenshotPath}`);
    
    return {
      success: true,
      data: pageData,
      screenshotPath
    };
    
  } catch (error) {
    console.error('❌ Scraping failed:', error);
    return {
      success: false,
      error: error.message
    };
  } finally {
    // Always close the browser
    if (browser) {
      await browser.close();
      console.log('✅ Browser closed');
    }
  }
}

/**
 * Advanced scraping example with multiple operations
 */
async function advancedScrapeExample() {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Enable request interception for performance
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      // Block images and stylesheets for faster loading
      if (req.resourceType() === 'image' || req.resourceType() === 'stylesheet') {
        req.abort();
      } else {
        req.continue();
      }
    });
    
    // Navigate and wait for content
    await page.goto('https://example.com');
    await page.waitForSelector('h1');
    
    // Extract structured data
    const structuredData = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a')).map(a => ({
        text: a.textContent.trim(),
        href: a.href
      }));
      
      const headings = Array.from(document.querySelectorAll('h1, h2, h3')).map(h => ({
        level: h.tagName,
        text: h.textContent.trim()
      }));
      
      return {
        links,
        headings,
        bodyText: document.body.textContent.trim().substring(0, 500)
      };
    });
    
    console.log('🔍 Advanced scraping results:', structuredData);
    
    return structuredData;
    
  } finally {
    await browser.close();
  }
}

// Export for use in other modules
export { scrapeWebsite, advancedScrapeExample };

// Example execution (uncomment to run)
/*
async function runExamples() {
  console.log('=== Running Puppeteer Examples ===');
  
  // Basic scraping
  const basicResult = await scrapeWebsite();
  console.log('Basic scraping result:', basicResult);
  
  // Advanced scraping
  const advancedResult = await advancedScrapeExample();
  console.log('Advanced scraping result:', advancedResult);
}

// Uncomment to run examples
// runExamples().catch(console.error);
*/

export default scrapeWebsite;