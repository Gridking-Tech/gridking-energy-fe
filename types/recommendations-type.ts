export interface RecommendedProduct {
  productId: string;
  name: string;
  slug: string;
  imageUrl?: string;
}

export interface BatteryAttribute {
  name: string;
  value: number;
  dataType: string;
  required: boolean;
  _id: string;
}

export interface Battery {
  productId: string;
  productName: string;
  capacityAttribute: BatteryAttribute;
  voltageAttribute: BatteryAttribute;
}

export interface BatteryConfiguration {
  battery: Battery;
  seriesCount: number;
  parallelStrings: number;
  totalBatteries: number;
  systemCapacityWh: number;
  configuration: string;
}

export interface RecommendedBattery {
  productId: string;
  productName: string;
  voltage: number;
  capacityAh: number;
  totalBatteries: number;
}

export interface RecommendedInverter {
  productId: string;
  productName: string;
  kva: number;
  voltage: number;
}

export interface BatteryDiagram {
  systemVoltage: number;
  requiredWattHours: number;
  recommendedConfig: BatteryConfiguration;
  minimumConfig: BatteryConfiguration;
}

export interface IProps {
  isOpen: boolean;
  onClose: () => void;
  energyUsage: {
    desiredBackupHours: number;
    requiredKVA: number;
    systemVoltage: number;
    batteryDiagram: BatteryDiagram;
    recommendedBattery: RecommendedBattery;
    recommendedInverter: RecommendedInverter;
    recommendedProducts?: RecommendedProduct[];
    error?: string;
    loading?: boolean;
  };
}
