/**
 * Email templates for the application
 * These templates use HTML to format the email content
 */

/**
 * Generates a booking confirmation email to be sent to the customer
 */
export const generateBookingConfirmationEmail = (booking: {
  orderNumber: string;
  fullName: string;
  email: string;
  phone: string;
  pickupAddress: string;
  dropoffAddress: string;
  date: string;
  time: string;
  passengers: number;
  vehicleType: string;
  price: number;
  specialRequests?: string;
  purchaseDate?: string;
}): string => {
  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      const [year, month, day] = dateString.split('-');
      return `${day}.${month}.${year}`;
    } catch (e) {
      return dateString;
    }
  };

  // Get vehicle name based on type
  const getVehicleName = (type: string) => {
    switch (type) {
      case 'standard': return 'Standard Car';
      case 'executive': return 'Executive Car';
      case 'van': return 'Van';
      case 'minibus': return 'Minibus';
      default: return type || 'Not selected';
    }
  };

  // Current date for purchase date if not provided
  const purchaseDate = booking.purchaseDate || new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Booking Confirmation - RideConnect</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        /* Reset styles */
        body, html {
          margin: 0;
          padding: 0;
          font-family: 'Inter', Arial, sans-serif;
          line-height: 1.6;
          color: #333333;
          background-color: #f5f7fb;
        }
        
        * {
          box-sizing: border-box;
        }
        
        /* Container styles */
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        
        /* Header styles */
        .email-header {
          background-color: #2563eb;
          color: white;
          padding: 24px;
          text-align: center;
        }
        
        .logo {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 8px;
        }
        
        .logo-blue {
          color: #dbeafe;
        }
        
        .header-title {
          margin: 0;
          font-size: 24px;
          font-weight: 700;
        }
        
        .header-subtitle {
          margin: 8px 0 0;
          font-size: 16px;
          opacity: 0.9;
        }
        
        /* Content styles */
        .email-content {
          padding: 24px;
        }
        
        .confirmation-message {
          text-align: center;
          margin-bottom: 24px;
        }
        
        .confirmation-message h2 {
          margin: 0;
          color: #111827;
          font-size: 18px;
          font-weight: 600;
        }
        
        .confirmation-message p {
          margin: 8px 0 0;
          color: #4b5563;
        }
        
        .order-details {
          background-color: #f9fafb;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 24px;
          border: 1px solid #e5e7eb;
        }
        
        .order-number {
          font-family: monospace;
          font-weight: 700;
          font-size: 16px;
          color: #2563eb;
          background-color: #dbeafe;
          padding: 4px 8px;
          border-radius: 4px;
          display: inline-block;
        }
        
        .purchase-date {
          color: #6b7280;
          font-size: 14px;
          margin-top: 8px;
        }
        
        .section {
          margin-bottom: 24px;
          padding-bottom: 24px;
          border-bottom: 1px solid #e5e7eb;
        }
        
        .section:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }
        
        .section h3 {
          color: #111827;
          font-size: 18px;
          font-weight: 600;
          margin: 0 0 16px 0;
        }
        
        .info-row {
          display: flex;
          flex-wrap: wrap;
          margin-bottom: 12px;
        }
        
        .info-label {
          width: 140px;
          color: #6b7280;
          font-size: 14px;
          font-weight: 500;
          flex-shrink: 0;
        }
        
        .info-value {
          flex: 1;
          color: #111827;
          font-weight: 500;
        }
        
        .price-box {
          background-color: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-radius: 8px;
          padding: 16px;
          margin-top: 16px;
          text-align: center;
        }
        
        .price-label {
          font-size: 14px;
          color: #047857;
          font-weight: 500;
          margin-bottom: 4px;
        }
        
        .price-value {
          font-size: 24px;
          color: #047857;
          font-weight: 700;
        }
        
        .terms {
          font-size: 13px;
          color: #6b7280;
          margin-bottom: 16px;
        }
        
        .next-steps {
          background-color: #eff6ff;
          border: 1px solid #bfdbfe;
          border-radius: 8px;
          padding: 16px;
          margin-top: 16px;
        }
        
        .next-steps h4 {
          color: #1e40af;
          margin: 0 0 12px 0;
          font-size: 16px;
          font-weight: 600;
        }
        
        .next-steps ul {
          margin: 0;
          padding-left: 16px;
        }
        
        .next-steps li {
          margin-bottom: 8px;
          color: #1e3a8a;
        }
        
        .next-steps li:last-child {
          margin-bottom: 0;
        }
        
        .modification-info {
          font-size: 14px;
          color: #4b5563;
          margin-top: 16px;
        }
        
        .button {
          display: inline-block;
          background-color: #2563eb;
          color: white;
          text-decoration: none;
          padding: 12px 24px;
          border-radius: 6px;
          font-weight: 600;
          margin-top: 16px;
          text-align: center;
        }
        
        /* Footer styles */
        .email-footer {
          background-color: #f9fafb;
          border-top: 1px solid #e5e7eb;
          padding: 24px;
          text-align: center;
          font-size: 14px;
          color: #6b7280;
        }
        
        .customer-service {
          margin-bottom: 16px;
        }
        
        .contact-info {
          margin-bottom: 16px;
        }
        
        .contact-info a {
          color: #2563eb;
          text-decoration: none;
          font-weight: 500;
        }
        
        .social-links {
          margin-bottom: 16px;
        }
        
        .social-links a {
          display: inline-block;
          margin: 0 8px;
          color: #2563eb;
          text-decoration: none;
        }
        
        .copyright {
          font-size: 13px;
          color: #9ca3af;
        }
        
        /* Responsive styles */
        @media only screen and (max-width: 600px) {
          .email-container {
            width: 100%;
            border-radius: 0;
          }
          
          .email-content {
            padding: 16px;
          }
          
          .info-row {
            flex-direction: column;
          }
          
          .info-label {
            width: 100%;
            margin-bottom: 4px;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <!-- Header -->
        <div class="email-header">
          <div class="logo">
            <span class="logo-blue">Ri</span>de<span class="logo-blue">Co</span>nn<span class="logo-blue">ect</span>
          </div>
          <h1 class="header-title">Booking Confirmation</h1>
          <p class="header-subtitle">Your private transfer has been confirmed</p>
        </div>
        
        <!-- Content -->
        <div class="email-content">
          <!-- Confirmation Message -->
          <div class="confirmation-message">
            <h2>Thank you for your booking, ${booking.fullName}!</h2>
            <p>We're excited to provide you with a comfortable and reliable transfer service.</p>
          </div>
          
          <!-- Order Details -->
          <div class="order-details">
            <div class="order-number">Order #: ${booking.orderNumber}</div>
            <div class="purchase-date">Booking Date: ${purchaseDate}</div>
          </div>
          
          <!-- Trip Details -->
          <div class="section">
            <h3>Trip Details</h3>
            
            <div class="info-row">
              <div class="info-label">From:</div>
              <div class="info-value">${booking.pickupAddress}</div>
            </div>
            
            <div class="info-row">
              <div class="info-label">To:</div>
              <div class="info-value">${booking.dropoffAddress}</div>
            </div>
            
            <div class="info-row">
              <div class="info-label">Date:</div>
              <div class="info-value">${formatDate(booking.date)}</div>
            </div>
            
            <div class="info-row">
              <div class="info-label">Time:</div>
              <div class="info-value">${booking.time}</div>
            </div>
            
            <div class="info-row">
              <div class="info-label">Passengers:</div>
              <div class="info-value">${booking.passengers}</div>
            </div>
            
            <div class="info-row">
              <div class="info-label">Vehicle:</div>
              <div class="info-value">${getVehicleName(booking.vehicleType)}</div>
            </div>
            
            ${booking.specialRequests ? `
            <div class="info-row">
              <div class="info-label">Special Requests:</div>
              <div class="info-value">${booking.specialRequests}</div>
            </div>
            ` : ''}
            
            <div class="price-box">
              <div class="price-label">Estimated Total Price</div>
              <div class="price-value">€${booking.price}</div>
            </div>
          </div>
          
          <!-- Contact Details -->
          <div class="section">
            <h3>Contact Details</h3>
            
            <div class="info-row">
              <div class="info-label">Name:</div>
              <div class="info-value">${booking.fullName}</div>
            </div>
            
            <div class="info-row">
              <div class="info-label">Email:</div>
              <div class="info-value">${booking.email}</div>
            </div>
            
            <div class="info-row">
              <div class="info-label">Phone:</div>
              <div class="info-value">${booking.phone}</div>
            </div>
          </div>
          
          <!-- Next Steps -->
          <div class="section">
            <h3>What Happens Next?</h3>
            
            <div class="next-steps">
              <h4>Your booking is confirmed!</h4>
              <ul>
                <li>Our driver will contact you 24 hours before your scheduled pickup to confirm all details</li>
                <li>Your driver will meet you at the pickup location with a name board</li>
                <li>We monitor flight arrivals - no worries if your flight is delayed</li>
                <li>60 minutes of free waiting time is included for airport pickups</li>
              </ul>
            </div>
            
            <div class="modification-info">
              <p><strong>Need to modify or cancel your booking?</strong> Please contact our customer service team at least 24 hours before your scheduled pickup. Cancellations made less than 24 hours before the scheduled pickup may incur a cancellation fee.</p>
            </div>
            
            <div style="text-align: center;">
              <a href="https://www.rideconnect.net/contact" class="button">Contact Customer Support</a>
            </div>
          </div>
          
          <!-- Terms and Conditions -->
          <div class="terms">
            <p><strong>Booking Terms and Conditions:</strong> A 20% deposit is required to secure your booking. The remaining balance can be paid to the driver in cash or by credit card. Rates include all taxes, tolls, and gratuity. For full terms and conditions, please visit our website.</p>
          </div>
        </div>
        
        <!-- Footer -->
        <div class="email-footer">
          <div class="customer-service">
            <p><strong>Customer Service</strong><br>We're here to help if you have any questions.</p>
          </div>
          
          <div class="contact-info">
            <p>Email: <a href="mailto:info.rideconnect@gmail.com">info.rideconnect@gmail.com</a><br>
            Phone: +386 70 832 530<br>
            Hours: 24/7</p>
          </div>
          
          <div class="social-links">
            <a href="https://www.facebook.com/rideconnect.2024" target="_blank">Facebook</a> |
            <a href="https://www.instagram.com/rideconnect__/" target="_blank">Instagram</a>
          </div>
          
          <div class="copyright">
            <p>&copy; ${new Date().getFullYear()} RideConnect. All rights reserved.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

/**
 * Generates a simple text version of the booking confirmation for email clients that don't support HTML
 */
export const generatePlainTextConfirmation = (booking: {
  orderNumber: string;
  fullName: string;
  email: string;
  phone: string;
  pickupAddress: string;
  dropoffAddress: string;
  date: string;
  time: string;
  passengers: number;
  vehicleType: string;
  price: number;
  specialRequests?: string;
}): string => {
  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      const [year, month, day] = dateString.split('-');
      return `${day}.${month}.${year}`;
    } catch (e) {
      return dateString;
    }
  };

  // Get vehicle name based on type
  const getVehicleName = (type: string) => {
    switch (type) {
      case 'standard': return 'Standard Car';
      case 'executive': return 'Executive Car';
      case 'van': return 'Van';
      case 'minibus': return 'Minibus';
      default: return type || 'Not selected';
    }
  };

  return `
RIDECONNECT - BOOKING CONFIRMATION
Order #: ${booking.orderNumber}
======================================

Hello ${booking.fullName},

Thank you for booking with RideConnect! Your booking has been confirmed.

TRIP DETAILS:
-------------
From: ${booking.pickupAddress}
To: ${booking.dropoffAddress}
Date: ${formatDate(booking.date)}
Time: ${booking.time}
Passengers: ${booking.passengers}
Vehicle: ${getVehicleName(booking.vehicleType)}
${booking.specialRequests ? `Special Requests: ${booking.specialRequests}` : ''}

Estimated Total Price: €${booking.price}

CONTACT DETAILS:
---------------
Name: ${booking.fullName}
Email: ${booking.email}
Phone: ${booking.phone}

WHAT HAPPENS NEXT?
-----------------
1. Our driver will contact you 24 hours before your scheduled pickup
2. Your driver will meet you at the pickup location with a name board
3. We monitor flight arrivals - no worries if your flight is delayed
4. 60 minutes of free waiting time is included for airport pickups

MODIFICATION OR CANCELLATION:
----------------------------
Need to modify or cancel? Please contact our customer service team at least 24 hours before your scheduled pickup.

CONTACT US:
----------
Email: info.rideconnect@gmail.com
Phone: +386 70 832 530
Hours: 24/7

Thank you for choosing RideConnect for your travel needs!
© ${new Date().getFullYear()} RideConnect. All rights reserved.
`;
};