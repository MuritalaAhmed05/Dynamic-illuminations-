'use client';

import React, { useState, useMemo, useEffect } from 'react';
import SolarRoiCalculator from '../../components/SolarRoiCalculator';
import { 
  FaTv, 
  FaFan, 
  FaLightbulb, 
  FaLaptop, 
  FaSnowflake, 
  FaWater, 
  FaPlug, 
  FaPlus, 
  FaMinus, 
  FaTrash, 
  FaWhatsapp, 
  FaBolt, 
  FaBatteryFull, 
  FaSolarPanel, 
  FaMicrochip,
  FaRedo,
  FaChevronDown,
  FaChevronUp,
  FaUtensils,
  FaGamepad,
  FaDesktop,
  FaInfoCircle,
  FaUserShield,
  FaCalculator,
  FaPiggyBank
} from 'react-icons/fa';
import { MdOutlineElectricalServices } from 'react-icons/md';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface PresetAppliance {
  id: string;
  name: string;
  defaultWattage: number;
  icon: React.ReactNode;
  category: 'Lighting' | 'Cooling' | 'Kitchen' | 'Entertainment' | 'Heavy Load';
}

interface SelectedAppliance {
  id: string;
  name: string;
  wattage: number;
  quantity: number;
  icon?: React.ReactNode;
}

const PRIMARY_PRESETS: PresetAppliance[] = [
  { id: 'fan-stand', name: 'Standing / Ceiling Fan', defaultWattage: 30, icon: <FaFan className="text-cyan-400 text-xl" />, category: 'Cooling' },
  { id: 'tv-55', name: 'Smart TV (32"-55")', defaultWattage: 80, icon: <FaTv className="text-blue-400 text-xl" />, category: 'Entertainment' },
  { id: 'bulb-10', name: '10W LED Light Bulb', defaultWattage: 10, icon: <FaLightbulb className="text-amber-400 text-xl" />, category: 'Lighting' },
  { id: 'laptop-work', name: 'Laptop / Computer', defaultWattage: 65, icon: <FaLaptop className="text-purple-400 text-xl" />, category: 'Entertainment' },
  { id: 'fridge-home', name: 'Refrigerator / Single Door', defaultWattage: 150, icon: <FaSnowflake className="text-sky-300 text-xl" />, category: 'Kitchen' },
  { id: 'freezer-chest', name: 'Deep Chest Freezer', defaultWattage: 200, icon: <FaSnowflake className="text-blue-300 text-xl" />, category: 'Kitchen' },
  { id: 'ac-15', name: 'Air Conditioner (1.5 HP)', defaultWattage: 1500, icon: <FaSnowflake className="text-indigo-400 text-xl" />, category: 'Cooling' },
  { id: 'pump-water', name: 'Water Borehole Pump (1 HP)', defaultWattage: 750, icon: <FaWater className="text-teal-400 text-xl" />, category: 'Heavy Load' },
];

const EXTENDED_PRESETS: PresetAppliance[] = [
  // Lighting
  { id: 'bulb-5', name: '5W Soft LED Bulb', defaultWattage: 5, icon: <FaLightbulb className="text-amber-300 text-xl" />, category: 'Lighting' },
  { id: 'bulb-tube', name: '18W LED Tube Light', defaultWattage: 18, icon: <FaLightbulb className="text-amber-400 text-xl" />, category: 'Lighting' },
  { id: 'bulb-sec', name: '30W Security Wall Light', defaultWattage: 30, icon: <FaLightbulb className="text-amber-500 text-xl" />, category: 'Lighting' },
  { id: 'bulb-flood', name: '50W Solar/LED Floodlight', defaultWattage: 50, icon: <FaLightbulb className="text-yellow-400 text-xl" />, category: 'Lighting' },
  { id: 'chandelier', name: '100W Decorative Chandelier', defaultWattage: 100, icon: <FaLightbulb className="text-yellow-300 text-xl" />, category: 'Lighting' },

  // Cooling & Climate
  { id: 'fan-rec', name: 'Rechargeable Fan', defaultWattage: 45, icon: <FaFan className="text-cyan-300 text-xl" />, category: 'Cooling' },
  { id: 'ac-10', name: 'Air Conditioner (1.0 HP)', defaultWattage: 1000, icon: <FaSnowflake className="text-blue-400 text-xl" />, category: 'Cooling' },
  { id: 'ac-20', name: 'Air Conditioner (2.0 HP)', defaultWattage: 2000, icon: <FaSnowflake className="text-indigo-500 text-xl" />, category: 'Cooling' },

  // Kitchen Appliances
  { id: 'blender', name: 'Kitchen Blender / Grinder', defaultWattage: 350, icon: <FaUtensils className="text-rose-400 text-xl" />, category: 'Kitchen' },
  { id: 'microwave', name: 'Microwave Oven', defaultWattage: 1000, icon: <FaUtensils className="text-orange-400 text-xl" />, category: 'Kitchen' },
  { id: 'kettle', name: 'Electric Boiling Kettle', defaultWattage: 1500, icon: <FaUtensils className="text-red-400 text-xl" />, category: 'Kitchen' },
  { id: 'cooker', name: 'Electric Hotplate / Cooker', defaultWattage: 1500, icon: <FaUtensils className="text-amber-500 text-xl" />, category: 'Kitchen' },

  // Entertainment & Electronics
  { id: 'tv-85', name: 'Large TV (65"-85")', defaultWattage: 150, icon: <FaTv className="text-blue-500 text-xl" />, category: 'Entertainment' },
  { id: 'dstv', name: 'Satellite Decoder / DSTV', defaultWattage: 20, icon: <FaTv className="text-slate-400 text-xl" />, category: 'Entertainment' },
  { id: 'soundbar', name: 'Home Theater / Soundbar', defaultWattage: 100, icon: <FaPlug className="text-purple-400 text-xl" />, category: 'Entertainment' },
  { id: 'desktop', name: 'Desktop PC & Monitor', defaultWattage: 200, icon: <FaDesktop className="text-cyan-400 text-xl" />, category: 'Entertainment' },
  { id: 'ps5', name: 'Gaming Console (PS5 / Xbox)', defaultWattage: 180, icon: <FaGamepad className="text-indigo-400 text-xl" />, category: 'Entertainment' },

  // Heavy Load
  { id: 'washing', name: 'Washing Machine', defaultWattage: 500, icon: <FaWater className="text-blue-300 text-xl" />, category: 'Heavy Load' },
  { id: 'iron', name: 'Electric Pressing Iron', defaultWattage: 1200, icon: <FaPlug className="text-amber-500 text-xl" />, category: 'Heavy Load' },
];

export default function CalculatorClient() {
  const [activeCalculatorTab, setActiveCalculatorTab] = useState<'appliance' | 'roi'>('appliance');

  const [selectedItems, setSelectedItems] = useState<SelectedAppliance[]>([
    { id: 'fan-stand', name: 'Standing / Ceiling Fan', wattage: 30, quantity: 2, icon: <FaFan className="text-cyan-400 text-xl" /> },
    { id: 'tv-55', name: 'Smart TV (32"-55")', wattage: 80, quantity: 1, icon: <FaTv className="text-blue-400 text-xl" /> },
    { id: 'bulb-10', name: '10W LED Light Bulb', wattage: 10, quantity: 6, icon: <FaLightbulb className="text-amber-400 text-xl" /> },
  ]);

  const [backupHours, setBackupHours] = useState<number>(8);
  const [showAllAppliances, setShowAllAppliances] = useState<boolean>(false);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');

  // Custom Appliance Form
  const [customName, setCustomName] = useState<string>('');
  const [customWattage, setCustomWattage] = useState<string>('');

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const allAvailablePresets = useMemo(() => {
    return [...PRIMARY_PRESETS, ...EXTENDED_PRESETS];
  }, []);

  const displayedPresets = useMemo(() => {
    const list = showAllAppliances ? allAvailablePresets : PRIMARY_PRESETS;
    if (selectedCategoryFilter === 'All') return list;
    return list.filter((p) => p.category === selectedCategoryFilter);
  }, [allAvailablePresets, showAllAppliances, selectedCategoryFilter]);

  const handleAddPreset = (preset: PresetAppliance) => {
    const existing = selectedItems.find((item) => item.id === preset.id);
    if (existing) {
      setSelectedItems((prev) =>
        prev.map((item) => (item.id === preset.id ? { ...item, quantity: item.quantity + 1 } : item))
      );
    } else {
      setSelectedItems((prev) => [
        ...prev,
        {
          id: preset.id,
          name: preset.name,
          wattage: preset.defaultWattage,
          quantity: 1,
          icon: preset.icon,
        },
      ]);
    }
  };

  const handleQuantityChange = (id: string, delta: number) => {
    setSelectedItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as SelectedAppliance[]
    );
  };

  const handleWattageEdit = (id: string, newWattageVal: number) => {
    const safeWatt = Math.max(1, isNaN(newWattageVal) ? 1 : newWattageVal);
    setSelectedItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, wattage: safeWatt } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setSelectedItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddCustomAppliance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim() || !customWattage.trim()) return;

    const wattNum = parseInt(customWattage, 10);
    if (isNaN(wattNum) || wattNum <= 0) return;

    const newId = `custom-${Date.now()}`;
    setSelectedItems((prev) => [
      ...prev,
      {
        id: newId,
        name: customName.trim(),
        wattage: wattNum,
        quantity: 1,
        icon: <FaPlug className="text-amber-400 text-xl" />,
      },
    ]);

    setCustomName('');
    setCustomWattage('');
  };

  // Sizing Calculations
  const sizing = useMemo(() => {
    const totalWatts = selectedItems.reduce((acc, item) => acc + item.wattage * item.quantity, 0);
    const totalDailyKWh = (totalWatts * backupHours) / 1000;

    let inverterSizeKVA = 1.0;
    if (totalWatts > 8000) inverterSizeKVA = 15.0;
    else if (totalWatts > 5000) inverterSizeKVA = 10.0;
    else if (totalWatts > 3500) inverterSizeKVA = 7.5;
    else if (totalWatts > 2000) inverterSizeKVA = 5.0;
    else if (totalWatts > 1200) inverterSizeKVA = 3.5;
    else if (totalWatts > 600) inverterSizeKVA = 2.4;
    else if (totalWatts > 0) inverterSizeKVA = 1.5;

    const requiredBatteryKWh = totalDailyKWh / 0.85; // 85% efficiency factor
    const solarPanelsWattage = Math.ceil((totalDailyKWh * 1.3 / 5) * 1000); // 5 sun hours avg

    return {
      totalWatts,
      totalDailyKWh: totalDailyKWh.toFixed(1),
      inverterSizeKVA,
      requiredBatteryKWh: requiredBatteryKWh.toFixed(1),
      solarPanelsWattage,
      suggestedPanelsCount: Math.ceil(solarPanelsWattage / 550),
    };
  }, [selectedItems, backupHours]);

  const whatsappMessage = `Hello Dynamic Illuminations! I used your Solar Sizing Calculator for my total load of ${sizing.totalWatts}W (${backupHours} hrs backup). It calculated a ${sizing.inverterSizeKVA} kVA system requirement with ${sizing.suggestedPanelsCount}x 550W panels. Please contact me with an official quotation.`;
  const whatsappUrl = `https://wa.me/2348107533654?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient Lights */}
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        
        {/* Top Calculator Switcher Tabs */}
        <div className="flex justify-center" data-aos="fade-down">
          <div className="glass-dark p-1.5 rounded-2xl border border-slate-800 flex space-x-2 shadow-2xl">
            <button
              onClick={() => setActiveCalculatorTab('appliance')}
              className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-extrabold flex items-center space-x-2 transition-all ${
                activeCalculatorTab === 'appliance'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FaCalculator className="text-base" />
              <span>1. Appliance Load & Inverter Calculator</span>
            </button>

            <button
              onClick={() => setActiveCalculatorTab('roi')}
              className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-extrabold flex items-center space-x-2 transition-all ${
                activeCalculatorTab === 'roi'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FaPiggyBank className="text-base" />
              <span>2. Solar ROI & Diesel Fuel Savings</span>
            </button>
          </div>
        </div>

        {/* TAB 2: SOLAR ROI & DIESEL SAVINGS CALCULATOR */}
        {activeCalculatorTab === 'roi' && (
          <div data-aos="fade-up">
            <SolarRoiCalculator />
          </div>
        )}

        {/* TAB 1: APPLIANCE LOAD CALCULATOR */}
        {activeCalculatorTab === 'appliance' && (
          <div className="space-y-12">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto space-y-3" data-aos="fade-down">
              <div className="inline-flex items-center space-x-2 bg-slate-900 border border-slate-800 text-amber-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
                <FaBolt />
                <span>Customizable Energy Load Estimator</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                Solar & Inverter System Calculator
              </h1>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Add your household or office appliances below, edit wattages, and specify desired backup hours to calculate your exact system requirement!
              </p>
            </div>

            {/* ENGINEERING CONSULTATION NOTICE */}
            <div className="glass-dark p-6 sm:p-8 rounded-3xl border border-amber-500/30 shadow-2xl relative overflow-hidden bg-slate-900" data-aos="fade-up">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-5">
                <div className="w-14 h-14 bg-amber-500/20 text-amber-400 rounded-2xl border border-amber-500/40 flex items-center justify-center flex-shrink-0 shadow-md">
                  <FaUserShield className="text-2xl" />
                </div>

                <div className="space-y-1 flex-grow">
                  <h3 className="text-base sm:text-lg font-extrabold text-white flex items-center space-x-2">
                    <span>Engineering & Budget Notice</span>
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    This calculator provides an interactive technical estimate for your project planning. Final inverter sizing, battery configuration, and exact quotation are determined after a free engineering consultation with our team based on your exact budget.
                  </p>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-3 rounded-xl text-xs sm:text-sm shadow-md transition-all"
                >
                  Consult Engineer Now
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Preset Appliance Picker (7 cols) */}
              <div className="lg:col-span-7 space-y-6" data-aos="fade-right">
                <div className="glass-dark p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                      <MdOutlineElectricalServices className="text-amber-400 text-2xl" />
                      <span>Select Appliances to Add</span>
                    </h2>

                    <button
                      onClick={() => setShowAllAppliances(!showAllAppliances)}
                      className="text-xs font-bold text-cyan-400 hover:text-cyan-300 bg-slate-900 border border-slate-800 px-3.5 py-2 rounded-xl flex items-center space-x-1.5 transition-all self-start sm:self-auto"
                    >
                      <span>{showAllAppliances ? 'Show Basic Presets' : 'Show All 20+ Appliances & Lights'}</span>
                      {showAllAppliances ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                  </div>

                  {/* Category Filter Pills (When expanded) */}
                  {showAllAppliances && (
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/80">
                      {['All', 'Lighting', 'Cooling', 'Kitchen', 'Entertainment', 'Heavy Load'].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategoryFilter(cat)}
                          className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all ${
                            selectedCategoryFilter === cat
                              ? 'bg-amber-500 text-slate-950 shadow-md'
                              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Preset Appliance Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {displayedPresets.map((preset) => (
                      <button
                        key={preset.id}
                        onClick={() => handleAddPreset(preset)}
                        className="bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-amber-500/50 p-3.5 rounded-2xl flex flex-col items-center text-center space-y-2 group transition-all duration-200 transform hover:-translate-y-0.5"
                      >
                        <div className="p-2 bg-slate-950 rounded-xl border border-slate-800 group-hover:border-amber-500/40">
                          {preset.icon}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-200 group-hover:text-white line-clamp-1">
                            {preset.name}
                          </div>
                          <div className="text-[11px] font-semibold text-amber-400 mt-0.5">
                            {preset.defaultWattage}W
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Custom Appliance Form Adder */}
                  <div className="pt-4 border-t border-slate-800">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                      + Add Unlisted Custom Appliance
                    </h3>
                    <form onSubmit={handleAddCustomAppliance} className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <input
                        type="text"
                        placeholder="Appliance Name (e.g. CCTV Server)"
                        value={customName}
                        onChange={(e) => setCustomName(e.target.value)}
                        className="text-xs p-3 bg-slate-900 border border-slate-800 text-slate-200 rounded-xl focus:ring-1 focus:ring-amber-500 focus:outline-none"
                      />
                      <input
                        type="number"
                        placeholder="Wattage (W)"
                        value={customWattage}
                        onChange={(e) => setCustomWattage(e.target.value)}
                        className="text-xs p-3 bg-slate-900 border border-slate-800 text-slate-200 rounded-xl focus:ring-1 focus:ring-amber-500 focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs p-3 rounded-xl shadow-md transition-all flex items-center justify-center space-x-1"
                      >
                        <FaPlus />
                        <span>Add Appliance</span>
                      </button>
                    </form>
                  </div>
                </div>
              </div>

              {/* Right Column: Selected Items & System Sizing Output (5 cols) */}
              <div className="lg:col-span-5 space-y-6" data-aos="fade-left">
                {/* Selected Appliances Table with Editable Wattage */}
                <div className="glass-dark p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                    <h3 className="text-lg font-bold text-white">Your Selected Load ({selectedItems.length})</h3>
                    <button
                      onClick={() => setSelectedItems([])}
                      className="text-xs text-rose-400 hover:text-rose-300 flex items-center space-x-1 font-semibold"
                    >
                      <FaRedo className="text-[10px]" />
                      <span>Clear All</span>
                    </button>
                  </div>

                  {selectedItems.length === 0 ? (
                    <div className="text-center py-10 text-slate-500 text-xs italic border border-dashed border-slate-800 rounded-2xl">
                      No appliances selected. Click any appliance on the left to start calculation!
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-80 overflow-y-auto pr-1 scrollbar-hidden">
                      {selectedItems.map((item) => (
                        <div
                          key={item.id}
                          className="bg-slate-900/90 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between gap-2"
                        >
                          <div className="flex items-center space-x-3 min-w-0">
                            {item.icon}
                            <div className="truncate">
                              <div className="text-xs font-bold text-slate-200 truncate">{item.name}</div>
                              <div className="flex items-center space-x-1 mt-1">
                                <span className="text-[10px] text-slate-400">Wattage:</span>
                                <input
                                  type="number"
                                  min={1}
                                  value={item.wattage}
                                  onChange={(e) => handleWattageEdit(item.id, parseInt(e.target.value, 10))}
                                  className="w-16 text-[11px] font-extrabold text-amber-400 bg-slate-950 border border-slate-800 rounded-md px-1.5 py-0.5 text-center focus:outline-none focus:border-amber-500"
                                />
                                <span className="text-[10px] text-amber-400 font-bold">W</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 flex-shrink-0">
                            {/* Quantity Adjuster */}
                            <div className="flex items-center space-x-1 bg-slate-950 border border-slate-800 rounded-xl p-1">
                              <button
                                onClick={() => handleQuantityChange(item.id, -1)}
                                className="w-6 h-6 rounded-lg bg-slate-900 text-slate-300 hover:text-white flex items-center justify-center text-xs"
                              >
                                <FaMinus />
                              </button>
                              <span className="w-6 text-center text-xs font-extrabold text-white">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleQuantityChange(item.id, 1)}
                                className="w-6 h-6 rounded-lg bg-slate-900 text-slate-300 hover:text-white flex items-center justify-center text-xs"
                              >
                                <FaPlus />
                              </button>
                            </div>

                            {/* Delete Button */}
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-slate-500 hover:text-rose-400 p-1.5 transition-colors"
                            >
                              <FaTrash className="text-xs" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Desired Backup Hours Selector */}
                  <div className="pt-4 border-t border-slate-800 space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-slate-300">Desired Daily Backup Hours:</span>
                      <span className="text-amber-400 font-black bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
                        {backupHours} Hours
                      </span>
                    </div>
                    <input
                      type="range"
                      min={2}
                      max={24}
                      step={1}
                      value={backupHours}
                      onChange={(e) => setBackupHours(parseInt(e.target.value, 10))}
                    />
                  </div>
                </div>

                {/* Sizing Results Card */}
                <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-5 relative overflow-hidden">
                  <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center space-x-2">
                    <FaMicrochip className="text-amber-400" />
                    <span>Recommended System Sizing</span>
                  </h3>

                  <div className="space-y-3 text-xs">
                    {/* Item 1: Total Running Load */}
                    <div className="p-3.5 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30">
                          <FaBolt className="text-lg" />
                        </div>
                        <div>
                          <div className="text-slate-400 text-[10px] uppercase font-bold">Total Running Load</div>
                          <div className="text-slate-300 text-xs font-semibold">{backupHours} hours daily backup</div>
                        </div>
                      </div>
                      <div className="text-lg font-extrabold text-amber-400">{sizing.totalWatts} W</div>
                    </div>

                    {/* Item 2: Recommended Inverter Capacity */}
                    <div className="p-3.5 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2.5 bg-cyan-500/20 text-cyan-400 rounded-xl border border-cyan-500/30">
                          <FaMicrochip className="text-lg" />
                        </div>
                        <div>
                          <div className="text-slate-400 text-[10px] uppercase font-bold">Recommended Inverter</div>
                          <div className="text-slate-300 text-xs font-semibold">Pure Sine Wave Inverter</div>
                        </div>
                      </div>
                      <div className="text-lg font-extrabold text-cyan-400">{sizing.inverterSizeKVA} kVA</div>
                    </div>

                    {/* Item 3: Solar Panels Array */}
                    <div className="p-3.5 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2.5 bg-amber-400/20 text-amber-300 rounded-xl border border-amber-400/30">
                          <FaSolarPanel className="text-lg" />
                        </div>
                        <div>
                          <div className="text-slate-400 text-[10px] uppercase font-bold">Solar Array Needed</div>
                          <div className="text-slate-300 text-xs font-semibold">Daily Gen: {sizing.totalDailyKWh} kWh/day</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-extrabold text-white">{sizing.suggestedPanelsCount}x 550W Panels</div>
                        <div className="text-[10px] text-amber-300 font-semibold">({sizing.solarPanelsWattage}W Array)</div>
                      </div>
                    </div>

                    {/* Item 4: Lithium Battery Storage */}
                    <div className="p-3.5 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
                          <FaBatteryFull className="text-lg" />
                        </div>
                        <div>
                          <div className="text-slate-400 text-[10px] uppercase font-bold">Lithium Battery Storage</div>
                          <div className="text-slate-300 text-xs font-semibold">LiFePO4 Energy Bank</div>
                        </div>
                      </div>
                      <div className="text-lg font-extrabold text-emerald-400">~{sizing.requiredBatteryKWh} kWh</div>
                    </div>
                  </div>

                  {/* Engineering & Budget Notice Note */}
                  <div className="p-3.5 bg-slate-950/90 border border-amber-500/30 rounded-2xl text-[11px] text-slate-300 flex items-start space-x-2.5">
                    <FaUserShield className="text-amber-400 text-base flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-amber-400 font-bold block mb-0.5">Engineering & Budget Notice</strong>
                      <p className="leading-relaxed text-slate-400">
                        This calculation provides an interactive technical estimate. Final inverter sizing, battery configuration, and exact quotation are determined after a free engineering consultation based on your budget.
                      </p>
                    </div>
                  </div>

                  {/* 1-Click WhatsApp Quote */}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center space-x-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-4 px-6 rounded-xl shadow-md transition-all transform hover:-translate-y-0.5 text-sm"
                  >
                    <FaWhatsapp className="text-2xl" />
                    <span>Send Sizing Report on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
