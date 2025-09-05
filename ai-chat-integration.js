// AI Chat Integration with Real Calculators
// This file provides functions to integrate the chat with your actual calculators

class CalculatorIntegration {
    constructor() {
        this.calculators = {
            ppf: {
                name: 'PPF Calculator',
                url: '/ppf',
                calculate: this.calculatePPF.bind(this)
            },
            tint: {
                name: 'Tint Calculator',
                url: '/tint', 
                calculate: this.calculateTint.bind(this)
            },
            ceramic: {
                name: 'Ceramic Coating Calculator',
                url: '/ceramic',
                calculate: this.calculateCeramic.bind(this)
            },
            paintCorrection: {
                name: 'Paint Correction Calculator',
                url: '/paint-correction',
                calculate: this.calculatePaintCorrection.bind(this)
            }
        };
    }

    // PPF Calculator Integration
    calculatePPF(params) {
        const { vehicleType, serviceType, ppfType, customerType } = params;
        
        // PPF pricing data (from your actual calculator)
        const ppfData = {
            'full-front': { rolls: 1, labor: 8, cost: 800 },
            'track-pack': { rolls: 0.8, labor: 6, cost: 640 },
            'full-vehicle': { rolls: 3, labor: 20, cost: 2400 },
            'replacement-parts': { rolls: 0.3, labor: 2, cost: 240 }
        };
        
        const service = ppfData[serviceType] || ppfData['full-front'];
        const ppfCost = ppfType === 'stealth' ? 1100 : 800;
        
        const materialCost = service.rolls * ppfCost;
        const laborCost = service.labor * 85; // $85/hour
        const totalCost = materialCost + laborCost;
        
        // Apply margin and pricing
        const baselinePrice = totalCost / 0.7; // 30% margin
        const retailPrice = baselinePrice * 1.3; // 30% markup
        const dealerPrice = retailPrice * 0.85; // 15% dealer discount
        
        return {
            materialCost,
            laborCost,
            totalCost,
            retailPrice,
            dealerPrice,
            finalPrice: customerType === 'dealer' ? dealerPrice : retailPrice,
            laborHours: service.labor
        };
    }

    // Tint Calculator Integration
    calculateTint(params) {
        const { vehicleType, windows, filmType, customerType, tintRemoval } = params;
        
        // Tint pricing data (from your actual calculator)
        const vehicleData = {
            'car': { sqft: 35, labor: 4 },
            'coupe': { sqft: 30, labor: 3.5 },
            'truck': { sqft: 45, labor: 5 },
            'suv': { sqft: 40, labor: 4.5 },
            'van': { sqft: 50, labor: 6 }
        };
        
        const vehicle = vehicleData[vehicleType] || vehicleData['car'];
        const filmCost = 8; // $8/sqft
        const laborRate = 75; // $75/hour
        
        const materialCost = vehicle.sqft * filmCost;
        let laborCost = vehicle.labor * laborRate;
        
        // Add removal cost if needed
        if (tintRemoval) {
            const removalCost = vehicle.labor * 0.5 * 75; // 50% of install time
            laborCost += removalCost;
        }
        
        const totalCost = materialCost + laborCost;
        
        // Apply margin and pricing
        const baselinePrice = totalCost / 0.7;
        const retailPrice = baselinePrice * 1.3;
        const dealerPrice = retailPrice * 0.85;
        
        return {
            materialCost,
            laborCost,
            totalCost,
            retailPrice,
            dealerPrice,
            finalPrice: customerType === 'dealer' ? dealerPrice : retailPrice,
            laborHours: vehicle.labor + (tintRemoval ? vehicle.labor * 0.5 : 0)
        };
    }

    // Ceramic Coating Calculator Integration
    calculateCeramic(params) {
        const { vehicleType, coatingType, paintCondition, customerType } = params;
        
        // Ceramic pricing data (from your actual calculator)
        const coatingData = {
            '3-year': { bottleCost: 150, usage: 15, labor: 6 },
            '5-year': { bottleCost: 200, usage: 20, labor: 8 },
            '7-year': { bottleCost: 250, usage: 25, labor: 10 }
        };
        
        const vehicleData = {
            'car': { multiplier: 1.0 },
            'coupe': { multiplier: 0.8 },
            'truck': { multiplier: 1.3 },
            'suv': { multiplier: 1.2 },
            'van': { multiplier: 1.5 }
        };
        
        const coating = coatingData[coatingType] || coatingData['3-year'];
        const vehicle = vehicleData[vehicleType] || vehicleData['car'];
        
        const materialCost = (coating.bottleCost / coating.usage) * vehicle.multiplier;
        const laborCost = coating.labor * 85 * vehicle.multiplier;
        const totalCost = materialCost + laborCost;
        
        // Apply margin and pricing
        const baselinePrice = totalCost / 0.7;
        const retailPrice = baselinePrice * 1.3;
        const dealerPrice = retailPrice * 0.85;
        
        return {
            materialCost,
            laborCost,
            totalCost,
            retailPrice,
            dealerPrice,
            finalPrice: customerType === 'dealer' ? dealerPrice : retailPrice,
            laborHours: coating.labor * vehicle.multiplier
        };
    }

    // Paint Correction Calculator Integration
    calculatePaintCorrection(params) {
        const { vehicleType, paintCondition, customerType } = params;
        
        // Paint correction data (from your actual calculator)
        const correctionData = {
            'excellent': { stages: 0, hours: 0, compound: 0, polish: 0 },
            'good': { stages: 1, hours: 2, compound: 2, polish: 1 },
            'fair': { stages: 2, hours: 4, compound: 4, polish: 2 },
            'poor': { stages: 3, hours: 6, compound: 6, polish: 3 },
            'severe': { stages: 4, hours: 8, compound: 8, polish: 4 }
        };
        
        const vehicleMultipliers = {
            'car': 1.0,
            'coupe': 0.8,
            'truck': 1.3,
            'suv': 1.2,
            'van': 1.5
        };
        
        const correction = correctionData[paintCondition] || correctionData['good'];
        const multiplier = vehicleMultipliers[vehicleType] || 1.0;
        
        const correctionHours = correction.hours * multiplier;
        const prepHours = 1 * multiplier;
        const laborCost = (correctionHours * 85) + (prepHours * 45);
        const materialCost = (correction.compound * 2.5) + (correction.polish * 3.0);
        const totalCost = laborCost + materialCost;
        
        // Apply margin and pricing
        const baselinePrice = totalCost / 0.7;
        const retailPrice = baselinePrice * 1.3;
        const dealerPrice = retailPrice * 0.85;
        
        return {
            materialCost,
            laborCost,
            totalCost,
            retailPrice,
            dealerPrice,
            finalPrice: customerType === 'dealer' ? dealerPrice : retailPrice,
            laborHours: correctionHours + prepHours,
            stages: correction.stages
        };
    }

    // Main calculation method
    async calculate(service, params) {
        const calculator = this.calculators[service];
        if (!calculator) {
            throw new Error(`Unknown service: ${service}`);
        }
        
        return calculator.calculate(params);
    }
}

// Export for use in chat assistant
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CalculatorIntegration;
} else {
    window.CalculatorIntegration = CalculatorIntegration;
}
