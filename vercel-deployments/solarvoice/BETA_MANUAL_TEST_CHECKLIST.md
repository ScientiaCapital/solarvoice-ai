# Beta Launch Manual Test Checklist

**Date**: ___________  
**Tester**: ___________  
**Environment**: [ ] Local [ ] Staging [ ] Production  
**Browser**: ___________  
**Device**: [ ] Desktop [ ] Mobile [ ] Tablet

## 🎯 CRITICAL PATH TESTS

### 1. Voice Recognition & TTS
- [ ] Click orange microphone button
- [ ] Browser asks for microphone permission
- [ ] Grant permission successfully
- [ ] Say "Deploy commercial manager"
- [ ] Voice transcript appears on screen
- [ ] ElevenLabs TTS responds with Adam's voice
- [ ] Agent card shows "Deploying..." state
- [ ] Success notification appears

**Issues Found**: _________________________________

### 2. Agent Marketplace
- [ ] Homepage loads without errors
- [ ] All 5 agent cards visible:
  - [ ] Commercial Project Manager ($299)
  - [ ] Customer Success Specialist ($199)
  - [ ] Performance Analytics Specialist ($249)
  - [ ] Sales & Lead Generation ($349)
  - [ ] Utility Integration Coordinator ($279)
- [ ] Popular badges on correct agents
- [ ] Gradient backgrounds render correctly
- [ ] Deploy buttons are clickable

**Issues Found**: _________________________________

### 3. Authentication Flow
- [ ] Click "Sign In" button
- [ ] Registration form appears
- [ ] Fill in test credentials:
  - Email: beta.tester@solarvoice.ai
  - Password: TestBeta2024!
- [ ] Submit registration
- [ ] Receive confirmation
- [ ] Can log out
- [ ] Can log back in
- [ ] JWT token stored in cookies

**Issues Found**: _________________________________

### 4. Payment Integration (Stripe)
- [ ] Click pricing in navigation
- [ ] 3 tiers display correctly:
  - [ ] Starter ($99/month)
  - [ ] Professional ($299/month)
  - [ ] Enterprise ($999/month)
- [ ] Click "Subscribe" on Professional
- [ ] Stripe checkout loads
- [ ] Use test card: 4242 4242 4242 4242
- [ ] Payment processes successfully
- [ ] Webhook received (check logs)
- [ ] Subscription active in database

**Issues Found**: _________________________________

### 5. Database Operations (Neon)
- [ ] Voice commands logged to database
- [ ] User sessions persisted
- [ ] Agent deployments recorded
- [ ] No connection timeout errors
- [ ] Query response < 100ms

**Issues Found**: _________________________________

## 🌐 BROWSER COMPATIBILITY

### Chrome (Desktop)
- [ ] Voice recognition works
- [ ] TTS audio plays
- [ ] No console errors
- [ ] UI renders correctly

### Safari (Desktop)
- [ ] Voice recognition works
- [ ] TTS audio plays
- [ ] No console errors
- [ ] UI renders correctly

### Safari (iOS)
- [ ] Voice permission handling
- [ ] TTS fallback works
- [ ] Touch interactions smooth
- [ ] No viewport issues

### Firefox
- [ ] Voice recognition works
- [ ] TTS audio plays
- [ ] No console errors
- [ ] UI renders correctly

## 🔄 ERROR RECOVERY

### Voice Failures
- [ ] Disable microphone in browser
- [ ] Click mic button
- [ ] Error message appears
- [ ] Text input fallback available
- [ ] Can still deploy agents

### Network Issues
- [ ] Enable airplane mode
- [ ] Try to deploy agent
- [ ] Offline message appears
- [ ] Re-enable network
- [ ] Operation retries automatically

### API Errors
- [ ] Trigger 500 error (if possible)
- [ ] User sees friendly error
- [ ] Can retry operation
- [ ] Error logged to Vercel

## 📱 MOBILE SPECIFIC

### Responsive Design
- [ ] Hero section visible
- [ ] Cards stack properly
- [ ] Navigation hamburger works
- [ ] Buttons are tappable
- [ ] Text is readable

### Mobile Voice
- [ ] Mic button accessible
- [ ] Permission flow works
- [ ] Voice commands process
- [ ] TTS audio plays

## 🚀 PERFORMANCE

### Load Times
- [ ] Initial page load < 3s
- [ ] Agent cards load < 1s
- [ ] Voice response < 2s
- [ ] TTS playback < 1s

### Memory Usage
- [ ] No memory leaks after 10 voice commands
- [ ] Audio contexts properly closed
- [ ] No increasing DOM nodes

## ✅ ACCEPTANCE CRITERIA

**MUST PASS (Blockers)**:
- [ ] Voice command → Agent deployment works
- [ ] No critical JavaScript errors
- [ ] Database connections stable
- [ ] Payment flow completes

**SHOULD PASS (Important)**:
- [ ] Works on Chrome & Safari
- [ ] Mobile responsive
- [ ] Error messages helpful
- [ ] Performance acceptable

**NICE TO HAVE**:
- [ ] Works on all browsers
- [ ] Animations smooth
- [ ] Accessibility features
- [ ] Perfect Lighthouse score

## 📝 NOTES

**General Observations**:
_________________________________
_________________________________
_________________________________

**Recommended Fixes Before Beta**:
1. _________________________________
2. _________________________________
3. _________________________________

**Can Launch With These Issues**:
1. _________________________________
2. _________________________________
3. _________________________________

## SIGN-OFF

- [ ] **READY FOR ALPHA** (5 internal users)
- [ ] **READY FOR BETA** (25 external users)
- [ ] **NOT READY** (critical issues found)

**Tester Signature**: ___________
**Date/Time**: ___________

---

## Quick Test Commands

```bash
# Check build
npm run build

# Check TypeScript
npm run type-check

# Check for console errors
# Open DevTools → Console → Should be empty

# Check network tab
# Open DevTools → Network → No failed requests

# Check Vercel logs
vercel logs --follow

# Check database
# Neon dashboard → Query: SELECT COUNT(*) FROM voice_interactions;
```