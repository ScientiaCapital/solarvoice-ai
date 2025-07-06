/**
 * Customer API Types - SolarVoice AI Platform
 * Core contracts for customer management and data
 */

export interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address: CustomerAddress;
  preferences: CustomerPreferences;
  subscription?: CustomerSubscription;
  created_at: Date;
  updated_at: Date;
}

export interface CustomerAddress {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface CustomerPreferences {
  language: string;
  timezone: string;
  currency: string;
  voiceSettings: VoicePreferences;
  notifications: NotificationPreferences;
  privacy: PrivacyPreferences;
}

export interface VoicePreferences {
  voiceId?: string;
  speechRate: number; // 0.5 - 2.0
  volume: number; // 0.0 - 1.0
  preferredLanguage: string;
  enableVoiceResponse: boolean;
}

export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  push: boolean;
  voice: boolean;
  frequency: 'immediate' | 'daily' | 'weekly' | 'monthly';
}

export interface PrivacyPreferences {
  shareDataForImprovement: boolean;
  allowMarketing: boolean;
  voiceDataRetention: number; // days
  analyticsOptOut: boolean;
}

export interface CustomerSubscription {
  id: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  startDate: Date;
  endDate?: Date;
  autoRenew: boolean;
  paymentMethod: PaymentMethod;
  billing: BillingInfo;
}

export type SubscriptionPlan = 
  | 'free'
  | 'basic'
  | 'professional' 
  | 'enterprise'
  | 'custom';

export type SubscriptionStatus = 
  | 'active'
  | 'inactive'
  | 'cancelled'
  | 'suspended'
  | 'expired';

export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank' | 'digital_wallet';
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
}

export interface BillingInfo {
  amount: number;
  currency: string;
  interval: 'month' | 'year';
  nextBillingDate: Date;
  lastPaymentDate?: Date;
  lastPaymentAmount?: number;
}

export interface CustomerRepository {
  create(customerData: Omit<Customer, 'id' | 'created_at' | 'updated_at'>): Promise<Customer>;
  findById(id: string): Promise<Customer | null>;
  findByEmail(email: string): Promise<Customer | null>;
  update(id: string, updates: Partial<Customer>): Promise<Customer>;
  delete(id: string): Promise<boolean>;
  list(filters?: CustomerFilters): Promise<Customer[]>;
}

export interface CustomerFilters {
  status?: SubscriptionStatus;
  plan?: SubscriptionPlan;
  location?: {
    state?: string;
    zipCode?: string;
  };
  createdAfter?: Date;
  createdBefore?: Date;
}