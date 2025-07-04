import emailjs from '@emailjs/browser';
import { BookingFormData } from '../types/booking';
import { PartnerFormData } from '../types/partner';
import { ContactFormData } from '../types/contact';
import { calculatePrice } from './pricingService';

// EmailJS configuration
const EMAIL_SERVICE_ID = 'service_3r106zo';
const EMAIL_TEMPLATES = {
  BOOKING: 'template_fioe9zi',
  PARTNER: 'template_ohldd0v',
  CONTACT: 'template_fioe9zi',
  TRANSFER: 'template_fioe9zi'
};
const EMAIL_PUBLIC_KEY = 'Unuj1E45FQnI66OOZ';
const ADMIN_EMAIL = 'info.rideconnect@gmail.com';

// Initialize EmailJS
emailjs.init(EMAIL_PUBLIC_KEY);

// Add function for transfer bookings - admin notification only
export const sendTransferBookingEmail = async (formData: {
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  specialRequirements: string;
  pickup: string;
  dropoff: string;
  vehicleType: string;
  price: number;
}): Promise<void> => {
  try {
    // Generate a unique order number for reference
    const orderNumber = generateOrderNumber();
    
    // Admin notification only
    const adminTemplateParams = {
      to_name: 'Admin',
      to_email: ADMIN_EMAIL,
      reply_email: formData.email,
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      pickup_address: formData.pickup,
      dropoff_address: formData.dropoff,
      date: formData.date,
      time: formData.time, // Ensuring time is included
      special_requests: formData.specialRequirements || 'No special requests',
      vehicle_type: formData.vehicleType,
      total_price: `€${formData.price}`,
      subject: `New Transfer Booking - ${formData.vehicleType} - €${formData.price} - ${formData.date} ${formData.time}`,
      reply_to: formData.email,
      order_number: orderNumber
    };

    const adminResponse = await emailjs.send(
      EMAIL_SERVICE_ID,
      EMAIL_TEMPLATES.TRANSFER,
      adminTemplateParams
    );

    if (adminResponse.status !== 200) {
      throw new Error('Failed to send transfer booking email to admin');
    }
    
    console.log('Admin notification sent for transfer booking');
  } catch (error) {
    console.error('Error sending transfer booking email:', error);
    throw error;
  }
};

export const sendBookingEmail = async (formData: BookingFormData): Promise<void> => {
  try {
    // Get vehicle name based on type
    const getVehicleName = (type: string) => {
      switch (type) {
        case 'standard': return 'Standard Car';
        case 'executive': return 'Executive Car';
        case 'van': return 'Van';
        case 'minibus': return 'Minibus';
        default: return 'Not selected';
      }
    };

    // Calculate price based on selected vehicle type
    const price = await calculatePrice(
      formData.pickupAddress,
      formData.dropoffAddress,
      formData.passengers,
      formData.vehicleType
    );

    // Get vehicle features
    const getVehicleFeatures = (type: string) => {
      const features = [
        'Meet & Greet',
        'Flight monitoring',
        '60 minutes free waiting time',
        'Professional driver'
      ];
      
      if (type === 'executive') {
        features.push('Complimentary bottle of water');
      }
      
      return features.join(', ');
    };

    // Format price for email
    const formatPrice = (price: any) => {
      if (!price) return 'Not calculated';
      if (price.isCustomQuote) return 'Custom quote required';
      return `€${price.price}`;
    };

    // Format distance for email
    const formatDistance = (price: any) => {
      if (!price) return 'Not calculated';
      return `${Math.round(price.distance)} km`;
    };

    // Format duration for email
    const formatDuration = (price: any) => {
      if (!price) return 'Not calculated';
      return `${Math.round(price.duration / 60)} minutes`;
    };

    // Generate order number for reference
    const orderNumber = generateOrderNumber();

    // Admin notification template parameters
    const adminTemplateParams = {
      to_name: 'Admin',
      to_email: ADMIN_EMAIL,
      from_name: formData.fullName,
      from_email: formData.email,
      reply_to: formData.email,
      phone: formData.phone,
      pickup_address: formData.pickupAddress,
      dropoff_address: formData.dropoffAddress,
      date: formData.date,
      time: formData.time, // Ensuring time is explicitly included
      passengers: formData.passengers,
      special_requests: formData.specialRequests || 'No special requests',
      // Vehicle information
      vehicle_type: getVehicleName(formData.vehicleType),
      vehicle_features: getVehicleFeatures(formData.vehicleType),
      // Price information
      total_price: formatPrice(price),
      distance: formatDistance(price),
      duration: formatDuration(price),
      // Email subject including time information
      subject: `New Booking Request - ${getVehicleName(formData.vehicleType)} - ${formatPrice(price)} - ${formData.date} ${formData.time}`,
      order_number: orderNumber
    };

    const adminResponse = await emailjs.send(
      EMAIL_SERVICE_ID,
      EMAIL_TEMPLATES.BOOKING,
      adminTemplateParams
    );

    if (adminResponse.status !== 200) {
      throw new Error('Failed to send booking email to admin');
    }

    console.log('Admin notification sent for booking');
  } catch (error) {
    console.error('Error sending booking email:', error);
    throw error;
  }
};

export const sendPartnerApplicationEmail = async (formData: PartnerFormData): Promise<void> => {
  try {
    const templateParams = {
      to_name: 'Admin',
      to_email: ADMIN_EMAIL,
      from_name: `${formData.firstName} ${formData.lastName}`,
      from_email: formData.email,
      reply_to: formData.email,
      phone: formData.phone,
      company_name: formData.companyName,
      city: formData.city,
      company_address: formData.companyAddress,
      subject: `New Partner Application from ${formData.companyName}`
    };

    const response = await emailjs.send(
      EMAIL_SERVICE_ID,
      EMAIL_TEMPLATES.PARTNER,
      templateParams
    );

    if (response.status !== 200) {
      throw new Error('Failed to send partner application email');
    }
  } catch (error) {
    console.error('Error sending partner application:', error);
    throw error;
  }
};

export const sendContactEmail = async (formData: ContactFormData): Promise<void> => {
  try {
    const templateParams = {
      to_name: 'Admin',
      to_email: ADMIN_EMAIL,
      from_name: formData.name,
      from_email: formData.email,
      reply_to: formData.email,
      phone: formData.phone,
      message: formData.message,
      subject: `New Contact Message from ${formData.name}`,
      contact_type: 'Website Contact Form',
      timestamp: new Date().toLocaleString()
    };

    const response = await emailjs.send(
      EMAIL_SERVICE_ID,
      EMAIL_TEMPLATES.CONTACT,
      templateParams
    );

    if (response.status !== 200) {
      throw new Error('Failed to send contact email');
    }
  } catch (error) {
    console.error('Error sending contact email:', error);
    throw error;
  }
};

/**
 * Generate a unique order number
 * Format: RC-YYMMDD-XXXX (where XXXX is a random number)
 */
const generateOrderNumber = (): string => {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  
  return `RC-${year}${month}${day}-${random}`;
};