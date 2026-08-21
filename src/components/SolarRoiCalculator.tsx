'use client';

import React, { useState, useMemo } from 'react';
import { 
  FaGasPump, 
  FaClock, 
  FaMoneyBillWave, 
  FaSolarPanel, 
  FaPiggyBank, 
  FaChartLine, 
  FaWhatsapp, 
  FaBolt, 
  FaBatteryFull,
  FaShieldAlt,
  FaLeaf
} from 'react-icons/fa';

interface GeneratorPreset {
  name: string;
  kva: number;
  consumptionLitersPerHour: number;
  recommendedSolarKva: string;
  recommendedPanels: string;
  recommendedBattery: string;
  estimatedSystemCostNaira: number;
}

const GENERATOR_PRESETS: GeneratorPreset[] = [
  {
    name: '3.5 kVA Small Generator (Ipasso/Tiger/Elepaq)',
    kva: 3.5,
    consumptionLitersPerHour: 1.0,
    recommendedSolarKva: '3.5 kVA Solar Inverter',
    recommendedPanels: '4x 550W Panels (2.2 kW)',
    recommendedBattery: '1x 24V 200Ah Lithium',
    estimatedSystemCostNaira: 2800000,
  },
  {
    name: '5 kVA Medium Generator (Elepaq/Firman/Lutian)',
    kva: 5.0,
    consumptionLitersPerHour: 1.4,
    recommendedSolarKva: '5 kVA Solar Inverter',
    recommendedPanels: '6x 550W Panels (3.3 kW)',
    recommendedBattery: '1x 48V 150Ah Lithium',
    estimatedSystemCostNaira: 4200000,
  },
  {
    name: '7.5 - 10 kVA Soundproof Generator (Mikano/Perkins)',
    kva: 10.0,
    consumptionLitersPerHour: 2.2,
    recommendedSolarKva: '10 kVA Hybrid Solar System',
    recommendedPanels: '12x 550W Panels (6.6 kW)',
    recommendedBattery: '15 kWh Lithium Storage',
    estimatedSystemCostNaira: 7500000,
  },
  {
    name: '15 kVA Soundproof Generator (Perkins/Cummins)',
    kva: 15.0,
    consumptionLitersPerHour: 3.2,
    recommendedSolarKva: '15 kVA Hybrid Solar System',
    recommendedPanels: '16x 550W Panels (8.8 kW)',
    recommendedBattery: '2x 48V 200Ah Lithium Storage',
    estimatedSystemCostNaira: 11200000,
  },
  {
    name: '20 - 25 kVA Commercial Diesel Generator',
    kva: 20.0,
    consumptionLitersPerHour: 4.5,
    recommendedSolarKva: '20 kVA Commercial Solar Plant',
    recommendedPanels: '24x 550W Panels (13.2 kW)',
    recommendedBattery: '30 kWh Industrial Lithium',
    estimatedSystemCostNaira: 15800000,
  },
  {
    name: '30 - 50 kVA Heavy Duty Industrial Generator',
    kva: 30.0,
    consumptionLitersPerHour: 6.5,
    recommendedSolarKva: '30 kVA Three-Phase Solar Plant',
    recommendedPanels: '36x 550W Panels (19.8 kW)',
    recommendedBattery: '45 kWh High-Voltage Lithium',
    estimatedSystemCostNaira: 24500000,
  },
];

export default function SolarRoiCalculator() {
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number>(2); // Default 10kVA
  const [dailyHours, setDailyHours] = useState<number>(10); // Default 10 hrs/day
  const [dieselPricePerLiter, setDieselPricePerLiter] = useState<number>(1350); // Default ₦1,350/L

  const activePreset = GENERATOR_PRESETS[selectedPresetIndex];

  // Financial Calculations
  const metrics = useMemo(() => {
    const hourlyFuelLiters = activePreset.consumptionLitersPerHour;
    const dailyLiters = hourlyFuelLiters * dailyHours;
    const monthlyLiters = dailyLiters * 30;
    const monthlyFuelCost = monthlyLiters * dieselPricePerLiter;
    const annualFuelCost = monthlyFuelCost * 12;

    // Accounting for 10% annual fuel inflation
    let cumulativeDieselSpending5Yrs = 0;
    let currentAnnual = annualFuelCost;
    for (let yr = 1; yr <= 5; yr++) {
      cumulativeDieselSpending5Yrs += currentAnnual;
      currentAnnual *= 1.1; // 10% annual inflation
    }

    let cumulativeDieselSpending10Yrs = 0;
    currentAnnual = annualFuelCost;
    for (let yr = 1; yr <= 10; yr++) {
      cumulativeDieselSpending10Yrs += currentAnnual;
      currentAnnual *= 1.1;
    }

    const estimatedSystemCost = activePreset.estimatedSystemCostNaira;
    const paybackMonths = Math.max(4, Math.round((estimatedSystemCost / monthlyFuelCost) * 10) / 10);
    const paybackYears = (paybackMonths / 12).toFixed(1);

    const netSavings5Yrs = cumulativeDieselSpending5Yrs - estimatedSystemCost;
    const netSavings10Yrs = cumulativeDieselSpending10Yrs - estimatedSystemCost;

    // Environmental Impact: ~2.68 kg CO2 per liter of diesel
    const annualCo2Tons = (annualFuelCost / dieselPricePerLiter * 2.68 / 1000).toFixed(1);

    return {
      monthlyFuelCost,
      annualFuelCost,
      cumulativeDieselSpending5Yrs,
      cumulativeDieselSpending10Yrs,
      estimatedSystemCost,
      paybackMonths,
      paybackYears,
      netSavings5Yrs,
      netSavings10Yrs,
      annualCo2Tons,
    };
  }, [activePreset, dailyHours, dieselPricePerLiter]);

  const formatNaira = (val: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(val);
  };

  const whatsappMsg = `Hello Dynamic Illuminations! I used your Solar ROI Diesel Savings Calculator for my ${activePreset.kva} kVA generator (${dailyHours} hrs/day run time). My monthly diesel cost is ${formatNaira(metrics.monthlyFuelCost)}. I would like a quote for the recommended ${activePreset.recommendedSolarKva} to save money!`;
  const whatsappUrl = `https://wa.me/2348107533654?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <div className="space-y-10">
      {/* Introduction Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 bg-slate-900 border border-slate-800 text-amber-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-glow-gold">
          <FaPiggyBank />
          <span>Generator Fuel vs. Solar Financial Audit</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          How Fast Does Solar Pay For Itself?
        </h2>
        <p className="text-slate-400 text-sm leading-relaxed">
          Compare your current monthly generator diesel expenses against a clean solar power system. Calculate your exact payback period and 10-year net savings in Naira!
        </p>
      </div>

      {/* Input Controls & Configurator Box */}
      <div className="glass-dark p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input 1: Generator Size Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-2">
              <FaGasPump />
              <span>1. Generator Size / Capacity</span>
            </label>
            <select
              value={selectedPresetIndex}
              onChange={(e) => setSelectedPresetIndex(Number(e.target.value))}
              className="w-full p-3.5 bg-slate-900 border border-slate-800 text-slate-100 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-none"
            >
              {GENERATOR_PRESETS.map((preset, idx) => (
                <option key={idx} value={idx}>
                  {preset.name}
                </option>
              ))}
            </select>
            <span className="text-[11px] text-slate-400 block pt-1">
              Estimated fuel burn: <strong>{activePreset.consumptionLitersPerHour} Liters/hour</strong>
            </span>
          </div>

          {/* Input 2: Daily Running Hours Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center space-x-2">
                <FaClock />
                <span>2. Daily Run Time</span>
              </label>
              <span className="text-sm font-extrabold text-white bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
                {dailyHours} Hours / Day
              </span>
            </div>
            <input
              type="range"
              min={2}
              max={24}
              step={1}
              value={dailyHours}
              onChange={(e) => setDailyHours(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-semibold">
              <span>2 hrs (Evening only)</span>
              <span>12 hrs (Overnight/Day)</span>
              <span>24 hrs (Continuous)</span>
            </div>
          </div>

          {/* Input 3: Diesel Price per Liter */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-2">
              <FaMoneyBillWave />
              <span>3. Diesel Price (₦ / Liter)</span>
            </label>
            <div className="relative">
              <input
                type="number"
                min={500}
                max={3000}
                step={50}
                value={dieselPricePerLiter}
                onChange={(e) => setDieselPricePerLiter(Number(e.target.value))}
                className="w-full p-3.5 pl-10 bg-slate-900 border border-slate-800 text-slate-100 rounded-xl text-xs font-bold focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-sm">₦</span>
            </div>
            <span className="text-[11px] text-slate-400 block pt-1">Current avg Nigerian market price</span>
          </div>
        </div>
      </div>

      {/* Main Results Display Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Metric Card 1: Monthly Diesel Spending */}
        <div className="bg-gradient-to-br from-slate-900 via-rose-950/40 to-slate-950 p-6 rounded-3xl border border-rose-500/30 shadow-xl space-y-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/10 rounded-full filter blur-xl pointer-events-none" />
          <div className="text-rose-400 text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5">
            <FaGasPump />
            <span>Monthly Generator Burn</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">
            {formatNaira(metrics.monthlyFuelCost)}
          </div>
          <p className="text-[11px] text-slate-400 pt-1">
            Annual: <strong>{formatNaira(metrics.annualFuelCost)}</strong> in generator fuel alone.
          </p>
        </div>

        {/* Metric Card 2: Recommended Solar Solution */}
        <div className="bg-gradient-to-br from-slate-900 via-cyan-950/40 to-slate-950 p-6 rounded-3xl border border-cyan-500/30 shadow-xl space-y-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full filter blur-xl pointer-events-none" />
          <div className="text-cyan-400 text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5">
            <FaSolarPanel />
            <span>Recommended Solar System</span>
          </div>
          <div className="text-lg font-extrabold text-white">
            {activePreset.recommendedSolarKva}
          </div>
          <div className="text-[11px] text-slate-300 space-y-0.5 pt-1">
            <div>• {activePreset.recommendedPanels}</div>
            <div>• {activePreset.recommendedBattery}</div>
          </div>
        </div>

        {/* Metric Card 3: Payback Horizon */}
        <div className="bg-gradient-to-br from-slate-900 via-amber-950/40 to-slate-950 p-6 rounded-3xl border border-amber-500/30 shadow-xl space-y-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full filter blur-xl pointer-events-none" />
          <div className="text-amber-400 text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5">
            <FaClock />
            <span>Solar Payback Period</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">
            {metrics.paybackMonths} Months
          </div>
          <p className="text-[11px] text-slate-400 pt-1">
            After ~{metrics.paybackYears} years, <strong>100% of your electricity is FREE!</strong>
          </p>
        </div>

        {/* Metric Card 4: 10-Year Net Savings */}
        <div className="bg-gradient-to-br from-slate-900 via-emerald-950/50 to-slate-950 p-6 rounded-3xl border border-emerald-500/40 shadow-xl space-y-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full filter blur-xl pointer-events-none" />
          <div className="text-emerald-400 text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5">
            <FaPiggyBank />
            <span>10-Year Net Profits</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
            {formatNaira(metrics.netSavings10Yrs)}
          </div>
          <p className="text-[11px] text-slate-300 pt-1">
            5-Year Net Profit: <strong>{formatNaira(metrics.netSavings5Yrs)}</strong>
          </p>
        </div>
      </div>

      {/* Comparison Analysis Table & Breakdown */}
      <div className="glass-dark p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6">
        <h3 className="text-lg font-bold text-white flex items-center space-x-2">
          <FaChartLine className="text-amber-400" />
          <span>Financial Comparison: Generator vs. Solar Over Time</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-300">
            <thead className="bg-slate-900 text-slate-400 text-[11px] uppercase font-bold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Timeline</th>
                <th className="py-3 px-4 text-rose-400">Diesel Generator Total Spent</th>
                <th className="py-3 px-4 text-cyan-400">Solar Power System Cost</th>
                <th className="py-3 px-4 text-emerald-400">Net Profit Kept in Your Bank</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              <tr>
                <td className="py-3.5 px-4 font-bold text-white">Year 1</td>
                <td className="py-3.5 px-4 font-semibold text-rose-300">{formatNaira(metrics.annualFuelCost)}</td>
                <td className="py-3.5 px-4 font-semibold text-cyan-300">{formatNaira(metrics.estimatedSystemCost)} (Initial Investment)</td>
                <td className="py-3.5 px-4 font-bold text-slate-400">Payback in progress ({metrics.paybackMonths} mos)</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-white">Year 3</td>
                <td className="py-3.5 px-4 font-semibold text-rose-300">{formatNaira(metrics.annualFuelCost * 3.3)}</td>
                <td className="py-3.5 px-4 font-semibold text-cyan-300">₦0 (Zero fuel cost)</td>
                <td className="py-3.5 px-4 font-bold text-emerald-400">+{formatNaira(metrics.annualFuelCost * 3.3 - metrics.estimatedSystemCost)} Saved</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-white">Year 5</td>
                <td className="py-3.5 px-4 font-semibold text-rose-300">{formatNaira(metrics.cumulativeDieselSpending5Yrs)}</td>
                <td className="py-3.5 px-4 font-semibold text-cyan-300">₦0 (Zero fuel cost)</td>
                <td className="py-3.5 px-4 font-bold text-emerald-400">+{formatNaira(metrics.netSavings5Yrs)} Net Profit</td>
              </tr>
              <tr className="bg-emerald-950/20">
                <td className="py-4 px-4 font-black text-emerald-400">Year 10</td>
                <td className="py-4 px-4 font-black text-rose-400">{formatNaira(metrics.cumulativeDieselSpending10Yrs)}</td>
                <td className="py-4 px-4 font-black text-cyan-400">₦0 (Zero fuel cost)</td>
                <td className="py-4 px-4 font-black text-emerald-400 text-sm">+{formatNaira(metrics.netSavings10Yrs)} Net Profit</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Environmental Badge */}
        <div className="pt-2 flex items-center space-x-2 text-xs text-slate-400">
          <FaLeaf className="text-emerald-400 text-sm" />
          <span>
            Environmental Bonus: Switching to solar prevents <strong>{metrics.annualCo2Tons} Tons of CO₂ emissions</strong> per year.
          </span>
        </div>
      </div>

      {/* WhatsApp Quote Banner CTA */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-amber-950/60 p-8 rounded-3xl border border-amber-500/40 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div className="space-y-1">
          <h3 className="text-xl font-extrabold text-white">
            Ready to Stop Burning Generator Fuel Money?
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm">
            Send your custom calculation directly to our senior solar engineers for a free site audit.
          </p>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 inline-flex items-center space-x-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black px-6 py-4 rounded-xl shadow-glow-gold transition-all transform hover:-translate-y-0.5 text-sm"
        >
          <FaWhatsapp className="text-2xl" />
          <span>Send ROI Audit to Engineer on WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
