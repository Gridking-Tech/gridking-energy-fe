export interface RecommendedProduct {
  productId: string;
  name: string;
  slug: string;
  imageUrl?: string;
}

export interface IProps {
  isOpen: boolean;
  onClose: () => void;
  energyUsage: {
    totalConsumption: string;
    recommendedInverterRating: string;
    recommendedBatteryCapacity: string;
    recommendedBatteryCount: string;
    recommendedProducts?: RecommendedProduct[];
    backupTime?: string;
    systemVoltage?: string;
    error?: string;
    loading?: boolean;
  };
}
