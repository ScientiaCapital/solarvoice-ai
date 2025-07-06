/**
 * Puppeteer Stealth Mode Implementation
 * Principal Architect Implementation - Enterprise Grade
 * 
 * @description Advanced web scraping with stealth and adblocker capabilities
 * @author Principal Staff Architect
 * @version 1.0.0
 */

import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker';

// Configure Puppeteer with stealth and adblocker plugins
puppeteer.use(StealthPlugin());
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

/**
 * Enterprise-grade stealth scraping class
 * Bypasses bot detection and blocks ads for faster scraping
 */
class StealthScraper {
  constructor(options = {}) {
    this.options = {
      headless: true,
      timeout: 30000,
      screenshotPath: './screenshots',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      ...options
    };
    this.browser = null;
  }

  /**
   * Initialize stealth browser with advanced evasion
   * @returns {Promise<void>}
   */
  async initialize() {
    try {
      this.browser = await puppeteer.launch({
        headless: this.options.headless,
        defaultViewport: null,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--disable-gpu',
          '--disable-blink-features=AutomationControlled',
          '--disable-features=VizDisplayCompositor'
        ]
      });
      
      console.log('🥷 Stealth browser initialized with anti-detection');
    } catch (error) {
      console.error('❌ Failed to initialize stealth browser:', error);
      throw error;
    }
  }

  /**
   * Scrape website with maximum stealth
   * @param {string} url - Target URL
   * @param {Object} options - Scraping options
   * @returns {Promise<Object>} Scraping results
   */
  async stealthScrape(url, options = {}) {
    if (!this.browser) {
      await this.initialize();
    }

    const page = await this.browser.newPage();
    
    try {
      // Advanced stealth configurations
      await page.setViewport({ 
        width: 1920 + Math.floor(Math.random() * 100),
        height: 1080 + Math.floor(Math.random() * 100)
      });
      
      // Set realistic user agent
      await page.setUserAgent(this.options.userAgent);
      
      // Set language and platform
      await page.setExtraHTTPHeaders({
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
      });

      // Randomize timing to appear more human
      const randomDelay = () => Math.floor(Math.random() * 1000) + 500;
      
      console.log(`🌐 Stealth navigating to: ${url}`);
      
      // Navigate with realistic timing
      await page.goto(url, { 
        waitUntil: 'networkidle2', 
        timeout: this.options.timeout 
      });
      
      // Wait random amount to simulate human reading
      await page.waitForTimeout(randomDelay());

      // Extract comprehensive page data
      const pageData = await page.evaluate(() => {
        const getTextContent = (selector) => {
          const element = document.querySelector(selector);
          return element ? element.textContent.trim() : null;
        };

        const getAllText = (selector) => {
          return Array.from(document.querySelectorAll(selector))
            .map(el => el.textContent.trim())
            .filter(text => text.length > 0);
        };

        return {
          title: document.title,
          url: window.location.href,
          metaDescription: document.querySelector('meta[name="description"]')?.content || null,
          headings: {
            h1: getAllText('h1'),
            h2: getAllText('h2'),
            h3: getAllText('h3')
          },
          links: Array.from(document.querySelectorAll('a[href]')).map(a => ({
            text: a.textContent.trim(),
            href: a.href,
            isExternal: !a.href.startsWith(window.location.origin)
          })).slice(0, 50), // Limit to first 50 links
          images: Array.from(document.querySelectorAll('img[src]')).map(img => ({
            src: img.src,
            alt: img.alt || null,
            width: img.naturalWidth,
            height: img.naturalHeight
          })).slice(0, 20), // Limit to first 20 images
          bodyText: document.body.textContent.replace(/\s+/g, ' ').trim().substring(0, 2000),
          timestamp: new Date().toISOString(),
          loadTime: performance.now()
        };
      });

      // Take screenshot if requested
      let screenshotPath = null;
      if (options.screenshot !== false) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        screenshotPath = `${this.options.screenshotPath}/stealth-${timestamp}.png`;
        
        await page.screenshot({ 
          path: screenshotPath,
          fullPage: options.fullPage || false,
          quality: options.quality || 80
        });
        
        console.log(`📸 Stealth screenshot saved: ${screenshotPath}`);
      }

      // Simulate human-like interaction if requested
      if (options.humanLike) {
        await this.simulateHumanBehavior(page);
      }

      return {
        success: true,
        data: pageData,
        screenshotPath,
        stealthMode: true,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      console.error(`❌ Stealth scraping failed for ${url}:`, error);
      return {
        success: false,
        error: error.message,
        url,
        stealthMode: true,
        timestamp: new Date().toISOString()
      };
    } finally {
      await page.close();
    }
  }

  /**
   * Simulate human-like behavior on the page
   * @param {Page} page - Puppeteer page instance
   */
  async simulateHumanBehavior(page) {
    try {
      // Random mouse movements
      for (let i = 0; i < 3; i++) {
        await page.mouse.move(
          Math.floor(Math.random() * 1920),
          Math.floor(Math.random() * 1080),
          { steps: 10 }
        );
        await page.waitForTimeout(Math.floor(Math.random() * 1000) + 500);
      }
      
      // Random scroll
      await page.evaluate(() => {
        window.scrollBy(0, Math.floor(Math.random() * 500) + 200);
      });
      
      await page.waitForTimeout(Math.floor(Math.random() * 2000) + 1000);
      
      console.log('🤖 Human-like behavior simulation completed');
    } catch (error) {
      console.warn('⚠️ Human behavior simulation failed:', error.message);
    }
  }

  /**
   * Check if a website has bot detection
   * @param {string} url - URL to check
   * @returns {Promise<Object>} Detection results
   */
  async checkBotDetection(url) {
    if (!this.browser) {
      await this.initialize();
    }

    const page = await this.browser.newPage();
    
    try {
      await page.goto(url, { waitUntil: 'networkidle2' });
      
      const detectionResults = await page.evaluate(() => {
        const indicators = {
          captcha: document.querySelector('[data-sitekey], .g-recaptcha, .h-captcha') !== null,
          cloudflare: document.querySelector('.cf-browser-verification') !== null,
          accessDenied: document.body.textContent.toLowerCase().includes('access denied'),
          blocked: document.body.textContent.toLowerCase().includes('blocked'),
          suspiciousRedirect: window.location.href !== window.location.href
        };
        
        return {
          ...indicators,
          hasDetection: Object.values(indicators).some(Boolean),
          title: document.title,
          bodyLength: document.body.textContent.length
        };
      });
      
      console.log('🔍 Bot detection analysis:', detectionResults);
      return detectionResults;
      
    } finally {
      await page.close();
    }
  }

  /**
   * Close stealth browser
   * @returns {Promise<void>}
   */
  async close() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
      console.log('✅ Stealth browser closed');
    }
  }
}

/**
 * Quick stealth scraping function
 * @param {string} url - URL to scrape
 * @param {Object} options - Scraping options
 * @returns {Promise<Object>} Scraping results
 */
export async function stealthScrape(url, options = {}) {
  const scraper = new StealthScraper();
  
  try {
    const result = await scraper.stealthScrape(url, options);
    await scraper.close();
    return result;
  } catch (error) {
    await scraper.close();
    throw error;
  }
}

export default StealthScraper;