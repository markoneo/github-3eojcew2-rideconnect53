import { BookingFormData } from '../types/booking';
import { sendBookingEmail } from './emailService';

export const handleBookingSubmission = async (formData: BookingFormData): Promise<void> => {
  try {
    // Send email notification
    await sendBookingEmail(formData);
    
    // Track conversion
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-11499562386/DfgGCNq7q_wZEJLLtesq'
      });
    }
    
    // Save booking details to localStorage for reference
    saveBookingToLocalStorage(formData);
    
    console.log('Booking submitted:', formData);
    return Promise.resolve();
  } catch (error) {
    console.error('Error handling booking submission:', error);
    throw error;
  }
};

// Save booking to localStorage for reference
const saveBookingToLocalStorage = (formData: BookingFormData): void => {
  try {
    // Get existing bookings or initialize new array
    const existingBookings = localStorage.getItem('bookingHistory');
    const bookings = existingBookings ? JSON.parse(existingBookings) : [];
    
    // Add timestamp to the booking data
    const bookingWithTimestamp = {
      ...formData,
      submittedAt: new Date().toISOString(),
      status: 'pending' // Initial status
    };
    
    // Add to beginning of array (most recent first)
    bookings.unshift(bookingWithTimestamp);
    
    // Limit to last 10 bookings to avoid localStorage size issues
    if (bookings.length > 10) {
      bookings.length = 10;
    }
    
    // Save back to localStorage
    localStorage.setItem('bookingHistory', JSON.stringify(bookings));
  } catch (error) {
    console.error('Error saving booking to localStorage:', error);
    // Continue even if localStorage fails - this is just for reference
  }
};