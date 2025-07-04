export interface PriceEstimate {
  price: number;
  distance: number;
  duration: number;
  isCustomQuote: boolean;
}

export interface StepOneData {
  pickupAddress: string;
  dropoffAddress: string;
  date: string;
  time: string;
  passengers: number;
  priceEstimate?: PriceEstimate;
}

export interface StepTwoData {
  fullName: string;
  phone: string;
  email: string;
  specialRequests: string;
  vehicleType: 'standard' | 'executive' | 'van' | 'minibus' | '';
}

export interface BookingFormData extends StepOneData, StepTwoData {
  orderNumber?: string;
  submittedAt?: string;
  status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}