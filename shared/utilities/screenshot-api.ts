/**
 * Screenshot API Endpoint - Enterprise Grade
 * Principal Architect Implementation for Next.js
 * 
 * @description Production-ready screenshot service with error handling and security
 * @author Principal Staff Architect
 * @version 1.0.0
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import puppeteer, { Browser, Page } from 'puppeteer';

interface ScreenshotRequest {
  url?: string;
  width?: number;
  height?: number;
  fullPage?: boolean;
  quality?: number;
  format?: 'png' | 'jpeg' | 'webp';
}

interface ScreenshotResponse {
  success: boolean;
  error?: string;
  data?: Buffer;
}

/**
 * Enterprise-grade screenshot API handler
 * Follows security best practices and error handling
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Buffer | ScreenshotResponse>
) {
  // Only allow POST requests for security
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed. Use POST.'
    });
  }

  let browser: Browser | null = null;
  let page: Page | null = null;

  try {
    // Extract and validate parameters
    const {
      url = 'https://example.com',
      width = 1920,
      height = 1080,
      fullPage = false,
      quality = 80,
      format = 'png'
    }: ScreenshotRequest = req.body;

    // Validate URL
    if (!isValidUrl(url)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid URL provided'
      });
    }

    // Validate dimensions
    if (width < 100 || width > 4000 || height < 100 || height > 4000) {
      return res.status(400).json({
        success: false,
        error: 'Invalid dimensions. Width and height must be between 100-4000px'
      });
    }

    console.log(`📸 Taking screenshot of: ${url}`);

    // Launch browser with enterprise configuration
    browser = await puppeteer.launch({
      headless: true, // Run without visible browser window
      defaultViewport: null, // Use full page viewport
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ] // Security and compatibility options
    });

    // Create new page with security settings
    page = await browser.newPage();
    
    // Set viewport
    await page.setViewport({ width, height });
    
    // Set user agent to avoid bot detection
    await page.setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    );

    // Block unnecessary resources for faster loading
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      const resourceType = request.resourceType();
      if (['font', 'media'].includes(resourceType)) {
        request.abort();
      } else {
        request.continue();
      }
    });

    // Navigate to URL with timeout
    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    // Wait a moment for dynamic content
    await page.waitForTimeout(1000);

    // Take screenshot with specified options
    const screenshotOptions: any = {
      type: format,
      fullPage,
      quality: format === 'jpeg' ? quality : undefined
    };

    const screenshot = await page.screenshot(screenshotOptions);

    // Set appropriate headers
    const contentType = format === 'png' ? 'image/png' : 
                       format === 'jpeg' ? 'image/jpeg' : 'image/webp';
    
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
    res.setHeader('X-Screenshot-Success', 'true');
    
    console.log(`✅ Screenshot generated successfully for: ${url}`);
    
    // Send screenshot buffer
    res.send(screenshot);

  } catch (error) {
    console.error('❌ Screenshot generation failed:', error);
    
    // Clean error response
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    res.status(500).json({
      success: false,
      error: `Screenshot generation failed: ${errorMessage}`
    });

  } finally {
    // Always cleanup resources
    try {
      if (page) await page.close();
      if (browser) await browser.close();
      console.log('🧹 Browser resources cleaned up');
    } catch (cleanupError) {
      console.error('⚠️ Cleanup error:', cleanupError);
    }
  }
}

/**
 * Validate URL format and security
 * @param url - URL to validate
 * @returns boolean indicating if URL is valid
 */
function isValidUrl(url: string): boolean {
  try {
    const urlObject = new URL(url);
    
    // Only allow HTTP and HTTPS protocols
    if (!['http:', 'https:'].includes(urlObject.protocol)) {
      return false;
    }
    
    // Block localhost and private IPs for security
    const hostname = urlObject.hostname.toLowerCase();
    if (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname.startsWith('192.168.') ||
      hostname.startsWith('10.') ||
      hostname.startsWith('172.')
    ) {
      return false;
    }
    
    return true;
  } catch {
    return false;
  }
}

/**
 * Configuration for API route
 */
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
    responseLimit: '10mb', // Allow larger screenshot responses
  },
};

// Export types for TypeScript usage
export type { ScreenshotRequest, ScreenshotResponse };