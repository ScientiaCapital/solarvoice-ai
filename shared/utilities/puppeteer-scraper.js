/**
 * Puppeteer Web Scraping Utility
 * Principal Architect Implementation - Enterprise Grade
 * 
 * @description Advanced web scraping with screenshot capabilities
 * @author Principal Staff Architect
 * @version 1.0.0
 */

import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs/promises';

/**
 * Enterprise-grade web scraping class
 * Follows Knuth precision, Dijkstra structure, Torvalds pragmatism
 */
class PuppeteerScraper {
  constructor(options = {}) {
    this.options = {
      headless: true,
      timeout: 30000,
      screenshotPath: './screenshots',
      ...options
    };
    this.browser = null;
  }

  /**
   * Initialize browser instance
   * @returns {Promise<void>}
   */
  async initialize() {
    try {
      this.browser = await puppeteer.launch({
        headless: true, // Run without visible browser window
        defaultViewport: null, // Use full page viewport
        args: ['--no-sandbox', '--disable-setuid-sandbox'] // Security and compatibility options
      });
      
      // Ensure screenshot directory exists
      await fs.mkdir(this.options.screenshotPath, { recursive: true });
      
      console.log('✅ Puppeteer browser initialized');
    } catch (error) {
      console.error('❌ Failed to initialize browser:', error);
      throw error;
    }
  }

  /**
   * Scrape website with screenshot capability
   * @param {string} url - Target URL to scrape
   * @param {Object} options - Scraping options
   * @returns {Promise<Object>} Scraping results
   */
  async scrapeWebsite(url, options = {}) {
    if (!this.browser) {
      await this.initialize();
    }

    const page = await this.browser.newPage();
    
    try {
      // Set viewport for consistent screenshots
      await page.setViewport({ width: 1920, height: 1080 });
      
      // Set user agent to avoid bot detection
      await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36');
      
      console.log(`🌐 Navigating to: ${url}`);
      await page.goto(url, { 
        waitUntil: 'networkidle2', 
        timeout: this.options.timeout 
      });

      // Extract page metadata
      const pageInfo = await page.evaluate(() => ({
        title: document.title,
        url: window.location.href,
        timestamp: new Date().toISOString()
      }));

      // Take screenshot if requested
      let screenshotPath = null;
      if (options.screenshot !== false) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        screenshotPath = path.join(this.options.screenshotPath, `${timestamp}.png`);
        
        await page.screenshot({ 
          path: screenshotPath,
          fullPage: options.fullPage || false
        });
        
        console.log(`📸 Screenshot saved: ${screenshotPath}`);
      }

      // Extract content if selector provided
      let extractedContent = null;
      if (options.selector) {
        extractedContent = await page.evaluate((sel) => {
          const element = document.querySelector(sel);
          return element ? element.textContent.trim() : null;
        }, options.selector);
      }

      // Extract all text content
      const textContent = await page.evaluate(() => {
        return document.body.textContent.trim();
      });

      return {
        success: true,
        pageInfo,
        screenshotPath,
        extractedContent,
        textContent: options.includeText ? textContent : null,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      console.error(`❌ Scraping failed for ${url}:`, error);
      return {
        success: false,
        error: error.message,
        url,
        timestamp: new Date().toISOString()
      };
    } finally {
      await page.close();
    }
  }

  /**
   * Batch scrape multiple URLs
   * @param {Array<string>} urls - Array of URLs to scrape
   * @param {Object} options - Scraping options
   * @returns {Promise<Array>} Array of scraping results
   */
  async batchScrape(urls, options = {}) {
    const results = [];
    
    for (const url of urls) {
      const result = await this.scrapeWebsite(url, options);
      results.push(result);
      
      // Rate limiting to be respectful
      if (options.delay) {
        await new Promise(resolve => setTimeout(resolve, options.delay));
      }
    }
    
    return results;
  }

  /**
   * Close browser instance
   * @returns {Promise<void>}
   */
  async close() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
      console.log('✅ Puppeteer browser closed');
    }
  }
}

/**
 * Simple scraping function for quick usage
 * @param {string} url - URL to scrape
 * @param {Object} options - Scraping options
 * @returns {Promise<Object>} Scraping results
 */
export async function scrapeWebsite(url, options = {}) {
  const scraper = new PuppeteerScraper();
  
  try {
    const result = await scraper.scrapeWebsite(url, options);
    await scraper.close();
    return result;
  } catch (error) {
    await scraper.close();
    throw error;
  }
}

// Example usage (commented out for production)
/*
async function exampleUsage() {
  // Simple scraping
  const result = await scrapeWebsite('https://example.com', {
    screenshot: true,
    fullPage: true,
    includeText: true
  });
  
  console.log('Scraping result:', result);
  
  // Advanced scraping with custom scraper
  const scraper = new PuppeteerScraper({
    screenshotPath: './custom-screenshots',
    timeout: 60000
  });
  
  await scraper.initialize();
  
  const batchResults = await scraper.batchScrape([
    'https://example.com',
    'https://github.com',
    'https://stackoverflow.com'
  ], {
    screenshot: true,
    delay: 2000,
    selector: 'h1'
  });
  
  console.log('Batch results:', batchResults);
  await scraper.close();
}
*/

export default PuppeteerScraper;