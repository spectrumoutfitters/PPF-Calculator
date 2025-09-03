# Spectrum Outfitters PPF Pricing Calculator

A professional web-based pricing calculator for Paint Protection Film (PPF) services, built with React and Tailwind CSS.

## Features

- **Vehicle Type Selection**: Auto-estimates materials and labor for different vehicle types
- **PPF Type Options**: Gloss ($800/roll) and Stealth ($1,100/roll)
- **Labor Calculation**: Support for both contracted and hourly labor rates
- **Pricing Tiers**: 
  - Baseline (30% minimum margin)
  - Retail (30% above baseline)
  - Dealer (15% discount off retail)
- **Tax & Deposit**: Configurable tax rates and deposit percentages
- **Quote Generation**: Copy professional quotes to clipboard
- **Responsive Design**: Works on desktop and mobile devices

## Business Rules

- **30% Minimum Margin**: Prices automatically adjust to maintain profitability
- **Rounding**: Configurable rounding up to protect margins
- **Daily Overhead**: Fixed $300/day overhead cost
- **Material Costs**: 
  - Gloss PPF: $800 per roll
  - Stealth PPF: $1,100 per roll

## Deployment Options

### Option 1: GitHub Pages (Free)
1. Push to GitHub repository
2. Enable GitHub Pages in repository settings
3. Your calculator will be available at: `https://username.github.io/repository-name`

### Option 2: Netlify (Free Tier)
1. Drag and drop the `index.html` file to [Netlify](https://netlify.com)
2. Get instant HTTPS and custom domain support
3. Automatic deployments from Git

### Option 3: Vercel (Free Tier)
1. Connect your GitHub repository to [Vercel](https://vercel.com)
2. Automatic deployments on every push
3. Global CDN and analytics

### Option 4: Traditional Web Hosting
1. Upload `index.html` to any web hosting service
2. Works with shared hosting, VPS, or dedicated servers
3. No build process required

## File Structure

```
PPF Calculator/
├── index.html          # Main application file
├── Calculator.html     # Original file (can be removed)
├── README.md          # This file
└── .git/              # Git repository
```

## Customization

### Update Company Information
Edit the title, meta tags, and company name in `index.html`

### Modify Pricing Rules
Update the constants at the top of the script:
```javascript
const BASELINE_MARGIN = 0.30;   // 30% margin floor
const RETAIL_MARKUP   = 0.30;   // +30% above baseline
const DEALER_DISCOUNT = 0.15;   // -15% off retail
const DAILY_OVERHEAD  = 300;    // $/day fixed overhead
```

### Change Material Costs
Update the material cost calculation:
```javascript
const materialCostPerRoll = ppfType === 'stealth' ? 1100 : 800;
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance

- **Bundle Size**: ~580KB (including React, Tailwind CSS)
- **Load Time**: <2 seconds on 3G connection
- **No Build Process**: Direct HTML deployment
- **CDN Resources**: React and Tailwind loaded from CDN

## Security

- No server-side code
- No database connections
- All calculations performed client-side
- No sensitive data transmitted

## Support

For technical support or customization requests, contact your development team.

## License

This calculator is proprietary software for Spectrum Outfitters.
