# 🚀 SolarVoice AI Deployment Guide

## Prerequisites
1. Make sure you're logged into Vercel: `vercel login`
2. Select your team: `scientiacapital`

## Option 1: Automated Deployment (Recommended)
```bash
cd /Users/tmk/Documents/01_Active_Projects/Learning/solarvoice_ai/vercel-deployments
./deploy-all-sites.sh
```

## Option 2: Manual Deployment

### 1. Deploy SolarVoice.ai (Main Platform)
```bash
cd /Users/tmk/Documents/01_Active_Projects/Learning/solarvoice_ai/vercel-deployments/solarvoice
vercel --prod
```
- Project name: `solarvoice-main`
- Framework: Next.js (auto-detected)
- Build settings: Use defaults

### 2. Deploy NetZeroBot.com
```bash
cd ../netzerobot
vercel --prod
```
- Project name: `solarvoice-netzerobot`
- Framework: Next.js (auto-detected)
- Build settings: Use defaults

### 3. Deploy NetZeroCalculator.com
```bash
cd ../netzerocalculator
vercel --prod
```
- Project name: `solarvoice-calculator`
- Framework: Next.js (auto-detected)
- Build settings: Use defaults

### 4. Deploy NetZeroExpert.com
```bash
cd ../netzeroexpert
vercel --prod
```
- Project name: `solarvoice-expert`
- Framework: Next.js (auto-detected)
- Build settings: Use defaults

## Connecting Domains

After deployment, for each project:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on the project
3. Go to **Settings** → **Domains**
4. Click **Add Domain**
5. Enter the domain:
   - `solarvoice-main` → `solarvoice.ai`
   - `solarvoice-netzerobot` → `netzerobot.com`
   - `solarvoice-calculator` → `netzerocalculator.com`
   - `solarvoice-expert` → `netzeroexpert.com`
6. Follow the instructions (should auto-detect GoDaddy nameservers)

## Troubleshooting

### "Project already exists" error
If you get this error, the project might already exist. You can:
1. Delete the existing project in Vercel dashboard
2. Or link to existing: `vercel link`

### Domain not connecting
1. Check GoDaddy nameservers are set to:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`
2. Wait 5-30 minutes for DNS propagation
3. Check domain status in Vercel dashboard

### Build errors
1. Make sure all dependencies are installed: `npm install`
2. Test build locally: `npm run build`
3. Check Node version compatibility

## Verification

Once deployed, your sites will be available at:
- https://solarvoice.ai
- https://netzerobot.com
- https://netzerocalculator.com
- https://netzeroexpert.com

## Next Steps

1. Set up environment variables if needed
2. Configure analytics (Google Analytics, etc.)
3. Set up monitoring
4. Test all cross-domain links
5. Submit sitemaps to search engines