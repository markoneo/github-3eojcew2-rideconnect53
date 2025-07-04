import { BookingFormData } from '../types/booking';

/**
 * Opens a new window with the booking confirmation details
 * @param bookingData The booking data to display
 * @param orderNumber The generated order number
 * @returns Reference to the opened window
 */
export const openBookingConfirmationWindow = (
  bookingData: BookingFormData,
  orderNumber: string
): Window | null => {
  try {
    // First create the window
    const confirmationWindow = window.open(
      'about:blank',
      'BookingConfirmation',
      'width=600,height=700,resizable=yes,scrollbars=yes,status=yes'
    );
    
    if (!confirmationWindow) {
      alert('Please allow pop-ups to view your booking confirmation');
      return null;
    }
    
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
        default: return 'Not selected';
      }
    };

    // Get vehicle price
    const getVehiclePrice = () => {
      if (bookingData.priceEstimate) {
        return bookingData.priceEstimate.price;
      }
      return 0;
    };
    
    // Create HTML content for the new window
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>RideConnect - Booking Confirmation</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f5f7fa;
            color: #333;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
          }
          .booking-card {
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
            overflow: hidden;
            max-width: 600px;
            margin: 0 auto;
          }
          .header {
            background-color: #2563eb;
            color: white;
            padding: 20px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
          }
          .header p {
            margin: 8px 0 0;
            font-size: 14px;
            opacity: 0.9;
          }
          .order-number {
            background-color: #e0f2fe;
            color: #0369a1;
            padding: 8px 16px;
            border-radius: 4px;
            font-family: monospace;
            font-weight: bold;
            display: inline-block;
            margin-top: 12px;
          }
          .success-badge {
            display: inline-block;
            background-color: #d1fae5;
            color: #047857;
            font-size: 12px;
            font-weight: bold;
            padding: 4px 8px;
            border-radius: 50px;
            margin-top: 8px;
          }
          .content {
            padding: 20px;
          }
          .section {
            margin-bottom: 20px;
            padding-bottom: 20px;
            border-bottom: 1px solid #eaeaea;
          }
          .section:last-child {
            border-bottom: none;
            margin-bottom: 0;
          }
          .section h2 {
            margin-top: 0;
            margin-bottom: 16px;
            font-size: 18px;
            color: #111827;
          }
          .info-block {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            padding: 12px;
            margin-bottom: 12px;
          }
          .label {
            font-size: 14px;
            color: #6b7280;
            margin-bottom: 4px;
          }
          .value {
            font-weight: bold;
            color: #111827;
            margin-bottom: 12px;
          }
          .price-display {
            background-color: #ecfdf5;
            border: 1px solid #d1fae5;
            color: #047857;
            font-weight: bold;
            font-size: 24px;
            padding: 12px;
            border-radius: 6px;
            text-align: center;
            margin: 16px 0;
          }
          .grid {
            display: flex;
            flex-wrap: wrap;
            margin: -8px;
          }
          .grid > div {
            flex: 1 0 calc(50% - 16px);
            margin: 8px;
            min-width: 200px;
          }
          .btn {
            display: inline-block;
            background-color: #2563eb;
            color: white;
            padding: 10px 16px;
            border-radius: 4px;
            font-weight: bold;
            cursor: pointer;
            border: none;
            text-align: center;
            margin: 5px;
          }
          .btn:hover {
            background-color: #1d4ed8;
          }
          .btn.secondary {
            background-color: #4b5563;
          }
          .btn.secondary:hover {
            background-color: #374151;
          }
          ul {
            margin-top: 0;
            padding-left: 24px;
          }
          li {
            margin-bottom: 8px;
          }
          .footer {
            margin-top: 20px;
            text-align: center;
            color: #6b7280;
            font-size: 14px;
          }
          .footer p {
            margin: 4px 0;
          }
          .text-center {
            text-align: center;
          }
          @media print {
            body {
              background-color: white;
            }
            .booking-card {
              box-shadow: none;
              margin: 0;
              max-width: 100%;
            }
            .btn {
              display: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="booking-card">
          <div class="header">
            <h1>Booking Confirmed!</h1>
            <p>Thank you for your booking request! We will contact you shortly with an offer.</p>
            <div class="order-number">Order #: ${orderNumber}</div>
            <div>
              <span class="success-badge">Booking Status: Confirmed</span>
            </div>
          </div>
          
          <div class="content">
            <div class="section">
              <h2>Trip Details</h2>
              
              <div class="info-block">
                <div>
                  <div class="label">Pickup Location:</div>
                  <div class="value">${bookingData.pickupAddress}</div>
                </div>
                
                <div>
                  <div class="label">Dropoff Location:</div>
                  <div class="value">${bookingData.dropoffAddress}</div>
                </div>
                
                <div class="grid">
                  <div>
                    <div class="label">Date:</div>
                    <div class="value">${formatDate(bookingData.date)}</div>
                  </div>
                  
                  <div>
                    <div class="label">Time:</div>
                    <div class="value">${bookingData.time}</div>
                  </div>
                </div>
              </div>
              
              <div class="grid">
                <div class="info-block">
                  <div class="label">Vehicle Type:</div>
                  <div class="value">${getVehicleName(bookingData.vehicleType)}</div>
                </div>
                
                <div class="info-block">
                  <div class="label">Passengers:</div>
                  <div class="value">${bookingData.passengers}</div>
                </div>
              </div>
              
              <div class="price-display">
                Estimated Price: €${getVehiclePrice()}
              </div>
            </div>
            
            <div class="section">
              <h2>Contact Information</h2>
              
              <div class="info-block">
                <div class="grid">
                  <div>
                    <div class="label">Full Name:</div>
                    <div class="value">${bookingData.fullName}</div>
                  </div>
                  
                  <div>
                    <div class="label">Phone:</div>
                    <div class="value">${bookingData.phone}</div>
                  </div>
                </div>
                
                <div>
                  <div class="label">Email:</div>
                  <div class="value">${bookingData.email}</div>
                </div>
                
                ${bookingData.specialRequests ? `
                <div>
                  <div class="label">Special Requests:</div>
                  <div class="value">${bookingData.specialRequests}</div>
                </div>
                ` : ''}
              </div>
            </div>
            
            <div class="section">
              <h2>What Happens Next?</h2>
              
              <ul>
                <li>We've sent a confirmation email with your booking details</li>
                <li>Our team will contact you within 24 hours to confirm your reservation</li>
                <li>Your driver will meet you at the pickup location with a name board</li>
              </ul>
            </div>
            
            <div class="text-center">
              <button class="btn" onclick="window.print()">Print Confirmation</button>
              <button class="btn secondary" onclick="window.close()">Close Window</button>
            </div>
          </div>
          
          <div class="footer">
            <p>Thank you for choosing RideConnect for your travel needs.</p>
            <p>If you have any questions, please contact us at info.rideconnect@gmail.com</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    // Use document.write to set the content - this approach is more reliable
    confirmationWindow.document.open();
    confirmationWindow.document.write(htmlContent);
    confirmationWindow.document.close();
    
    // Add a focus to ensure the window is brought to the front
    confirmationWindow.focus();
    
    return confirmationWindow;
  } catch (error) {
    console.error('Error opening confirmation window:', error);
    alert('There was an error displaying the booking confirmation. Please check your booking confirmation email.');
    return null;
  }
};