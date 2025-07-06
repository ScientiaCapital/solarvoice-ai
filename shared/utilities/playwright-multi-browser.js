/**
 * Playwright Multi-Browser Implementation
 * Principal Architect Implementation - Enterprise Grade
 * 
 * @description Cross-browser automation with Chromium, Firefox, and WebKit
 * @author Principal Staff Architect
 * @version 1.0.0
 */

import { chromium, firefox, webkit } from 'playwright';

/**
 * Enterprise-grade multi-browser automation class
 * Supports Chromium, Firefox, and WebKit for comprehensive testing
 */
class MultiBrowserAutomation {
  constructor(options = {}) {
    this.options = {
      headless: true,
      timeout: 30000,
      screenshotPath: './screenshots',
      defaultBrowser: 'chromium',
      ...options
    };
    this.browsers = new Map();
  }

  /**
   * Initialize specific browser
   * @param {string} browserType - 'chromium', 'firefox', or 'webkit'
   * @returns {Promise<Browser>}
   */
  async launchBrowser(browserType = 'chromium') {
    try {
      let browser;
      
      const launchOptions = {
        headless: this.options.headless,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      };

      switch (browserType) {
        case 'chromium':
          browser = await chromium.launch(launchOptions);
          break;
        case 'firefox':
          browser = await firefox.launch(launchOptions);
          break;
        case 'webkit':
          browser = await webkit.launch(launchOptions);
          break;
        default:
          throw new Error(`Unsupported browser type: ${browserType}`);
      }

      this.browsers.set(browserType, browser);
      console.log(`✅ ${browserType} browser launched`);
      
      return browser;
    } catch (error) {
      console.error(`❌ Failed to launch ${browserType}:`, error);
      throw error;
    }
  }

  /**
   * Scrape website across multiple browsers
   * @param {string} url - Target URL
   * @param {Object} options - Scraping options
   * @returns {Promise<Object>} Cross-browser results
   */
  async crossBrowserScrape(url, options = {}) {
    const browsers = options.browsers || ['chromium', 'firefox', 'webkit'];
    const results = {};

    for (const browserType of browsers) {
      try {
        console.log(`🌐 Scraping ${url} with ${browserType}...`);
        
        const browser = await this.launchBrowser(browserType);
        const context = await browser.newContext({
          viewport: { width: 1920, height: 1080 },
          userAgent: this.getUserAgent(browserType)
        });
        
        const page = await context.newPage();
        
        // Navigate to URL
        await page.goto(url, { 
          waitUntil: 'networkidle',
          timeout: this.options.timeout 
        });

        // Extract data
        const pageData = await page.evaluate(() => ({
          title: document.title,
          url: window.location.href,
          userAgent: navigator.userAgent,
          viewport: {
            width: window.innerWidth,
            height: window.innerHeight
          },
          headings: Array.from(document.querySelectorAll('h1, h2, h3')).map(h => ({
            tag: h.tagName,
            text: h.textContent.trim()
          })).slice(0, 10),
          links: Array.from(document.querySelectorAll('a[href]')).length,
          images: Array.from(document.querySelectorAll('img[src]')).length,
          scripts: Array.from(document.querySelectorAll('script[src]')).length,
          stylesheets: Array.from(document.querySelectorAll('link[rel="stylesheet"]')).length,
          bodyText: document.body.textContent.replace(/\s+/g, ' ').trim().substring(0, 500),
          timestamp: new Date().toISOString()
        }));

        // Take screenshot if requested
        let screenshotPath = null;
        if (options.screenshot !== false) {
          const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
          screenshotPath = `${this.options.screenshotPath}/${browserType}-${timestamp}.png`;
          
          await page.screenshot({ 
            path: screenshotPath,
            fullPage: options.fullPage || false
          });
        }

        results[browserType] = {
          success: true,
          browser: browserType,
          data: pageData,
          screenshotPath,
          timestamp: new Date().toISOString()
        };

        await context.close();
        console.log(`✅ ${browserType} scraping completed`);

      } catch (error) {
        console.error(`❌ ${browserType} scraping failed:`, error);
        results[browserType] = {
          success: false,
          browser: browserType,
          error: error.message,
          timestamp: new Date().toISOString()
        };
      }
    }

    return {
      url,
      results,
      summary: this.generateSummary(results),
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Performance comparison across browsers
   * @param {string} url - Target URL
   * @returns {Promise<Object>} Performance metrics
   */
  async performanceComparison(url) {
    const browsers = ['chromium', 'firefox', 'webkit'];
    const performances = {};

    for (const browserType of browsers) {
      try {
        const browser = await this.launchBrowser(browserType);
        const context = await browser.newContext();
        const page = await context.newPage();

        const startTime = Date.now();
        
        await page.goto(url, { waitUntil: 'networkidle' });
        
        const loadTime = Date.now() - startTime;

        // Get performance metrics
        const metrics = await page.evaluate(() => {
          const navigation = performance.getEntriesByType('navigation')[0];
          return {
            domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
            loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
            firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
            firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0
          };
        });

        performances[browserType] = {
          browser: browserType,
          totalLoadTime: loadTime,
          metrics,
          timestamp: new Date().toISOString()
        };

        await context.close();
        console.log(`📊 ${browserType} performance measured`);

      } catch (error) {
        console.error(`❌ ${browserType} performance test failed:`, error);
        performances[browserType] = {
          browser: browserType,
          error: error.message
        };
      }
    }

    return {
      url,
      performances,
      fastest: this.findFastest(performances),
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Test browser compatibility
   * @param {string} url - Target URL
   * @returns {Promise<Object>} Compatibility results
   */
  async compatibilityTest(url) {
    const browsers = ['chromium', 'firefox', 'webkit'];
    const compatibility = {};

    for (const browserType of browsers) {
      try {
        const browser = await this.launchBrowser(browserType);
        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto(url, { waitUntil: 'networkidle' });

        // Test various browser features
        const features = await page.evaluate(() => {
          const testFeatures = {
            localStorage: typeof Storage !== 'undefined',
            sessionStorage: typeof sessionStorage !== 'undefined',
            webGL: !!document.createElement('canvas').getContext('webgl'),
            webRTC: !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia),
            geolocation: !!navigator.geolocation,
            websockets: typeof WebSocket !== 'undefined',
            webWorkers: typeof Worker !== 'undefined',
            indexedDB: typeof indexedDB !== 'undefined',
            flexbox: CSS.supports('display', 'flex'),
            grid: CSS.supports('display', 'grid'),
            customElements: typeof customElements !== 'undefined'
          };

          return testFeatures;
        });

        // Check for JavaScript errors
        const errors = [];
        page.on('pageerror', (error) => {
          errors.push(error.message);
        });

        await page.waitForTimeout(2000); // Wait for potential errors

        compatibility[browserType] = {
          browser: browserType,
          features,
          errors,
          compatible: errors.length === 0,
          timestamp: new Date().toISOString()
        };

        await context.close();
        console.log(`🔧 ${browserType} compatibility tested`);

      } catch (error) {
        console.error(`❌ ${browserType} compatibility test failed:`, error);
        compatibility[browserType] = {
          browser: browserType,
          error: error.message,
          compatible: false
        };
      }
    }

    return {
      url,
      compatibility,
      overallCompatibility: this.calculateOverallCompatibility(compatibility),
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Get appropriate user agent for browser
   * @param {string} browserType - Browser type
   * @returns {string} User agent string
   */
  getUserAgent(browserType) {
    const userAgents = {
      chromium: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      firefox: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/115.0',
      webkit: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15'
    };
    
    return userAgents[browserType] || userAgents.chromium;
  }

  /**
   * Generate summary of cross-browser results
   * @param {Object} results - Cross-browser results
   * @returns {Object} Summary
   */
  generateSummary(results) {
    const successful = Object.values(results).filter(r => r.success).length;
    const total = Object.keys(results).length;
    
    return {
      successRate: `${successful}/${total}`,
      successPercentage: Math.round((successful / total) * 100),
      failedBrowsers: Object.entries(results)
        .filter(([_, result]) => !result.success)
        .map(([browser, _]) => browser)
    };
  }

  /**
   * Find fastest browser from performance results
   * @param {Object} performances - Performance results
   * @returns {string} Fastest browser
   */
  findFastest(performances) {
    let fastest = null;
    let fastestTime = Infinity;
    
    for (const [browser, perf] of Object.entries(performances)) {
      if (perf.totalLoadTime && perf.totalLoadTime < fastestTime) {
        fastestTime = perf.totalLoadTime;
        fastest = browser;
      }
    }
    
    return fastest;
  }

  /**
   * Calculate overall compatibility score
   * @param {Object} compatibility - Compatibility results
   * @returns {Object} Overall compatibility
   */
  calculateOverallCompatibility(compatibility) {
    const compatible = Object.values(compatibility).filter(c => c.compatible).length;
    const total = Object.keys(compatibility).length;
    
    return {
      score: Math.round((compatible / total) * 100),
      compatible: compatible === total,
      summary: `${compatible}/${total} browsers fully compatible`
    };
  }

  /**
   * Close all browsers
   * @returns {Promise<void>}
   */
  async closeAll() {
    for (const [browserType, browser] of this.browsers) {
      try {
        await browser.close();
        console.log(`✅ ${browserType} browser closed`);
      } catch (error) {
        console.error(`❌ Error closing ${browserType}:`, error);
      }
    }
    
    this.browsers.clear();
    console.log('🧹 All browsers closed');
  }
}

/**
 * Quick cross-browser scraping function
 * @param {string} url - URL to scrape
 * @param {Object} options - Options
 * @returns {Promise<Object>} Results
 */
export async function crossBrowserScrape(url, options = {}) {
  const automation = new MultiBrowserAutomation();
  
  try {
    const result = await automation.crossBrowserScrape(url, options);
    await automation.closeAll();
    return result;
  } catch (error) {
    await automation.closeAll();
    throw error;
  }
}

export default MultiBrowserAutomation;