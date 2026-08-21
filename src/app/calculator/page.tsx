import type { Metadata } from 'next';
import CalculatorClient from './CalculatorClient';

export const metadata: Metadata = {
  title: 'Solar & Inverter Load Calculator | Dynamic Illuminations',
  description: 'Calculate your home or business power load, inverter kVA requirements, battery capacity, and solar panel array size instantly.',
  keywords: ['Solar Calculator', 'Inverter Sizing', 'Battery Capacity Calculator', 'Solar Panels Nigeria', 'Dynamic Illuminations Load Estimator'],
};

export default function CalculatorPage() {
  return <CalculatorClient />;
}
