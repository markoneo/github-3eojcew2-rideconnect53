import html2canvas from 'html2canvas';
import { BookingFormData } from '../types/booking';

/**
 * Creates a PDF-ready HTML string for the booking confirmation
 */
export const createBookingConfirmationPdf = (
  bookingData: BookingFormData, 
  orderNumber: string
): string => {
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

  // Get current date and time
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  // Create PDF-ready HTML
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Booking Confirmation #${orderNumber}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 1px solid #eee;
        }
        .logo {
          font-size: 28px;
          font-weight: bold;
          margin-bottom: 5px;
        }
        .blue-text {
          color: #2563eb;
        }
        .title {
          font-size: 24px;
          margin: 10px 0;
        }
        .order-number {
          background-color: #f0f4ff;
          color: #2563eb;
          padding: 8px 15px;
          border-radius: 4px;
          font-weight: bold;
          display: inline-block;
          margin-top: 10px;
        }
        .section {
          margin-bottom: 25px;
          padding-bottom: 20px;
          border-bottom: 1px solid #eee;
        }
        .section-title {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 15px;
          color: #111;
        }
        .info-row {
          margin-bottom: 10px;
        }
        .info-label {
          font-weight: bold;
          width: 140px;
          display: inline-block;
        }
        .price-box {
          background-color: #f0fdf4;
          border: 1px solid #bbf7d0;
          padding: 15px;
          text-align: center;
          margin-top: 20px;
          border-radius: 4px;
        }
        .price-label {
          font-size: 14px;
          color: #166534;
        }
        .price-value {
          font-size: 24px;
          font-weight: bold;
          color: #166534;
        }
        .footer {
          text-align: center;
          font-size: 12px;
          color: #666;
          margin-top: 30px;
        }
        .date-generated {
          font-style: italic;
          margin-top: 40px;
          font-size: 11px;
          color: #999;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">
            <span class="blue-text">Ri</span>de<span class="blue-text">Co</span>nn<span class="blue-text">ect</span>
          </div>
          <h1 class="title">Booking Confirmation</h1>
          <div class="order-number">Order #: ${orderNumber}</div>
        </div>
        
        <div class="section">
          <h2 class="section-title">Trip Details</h2>
          
          <div class="info-row">
            <span class="info-label">From:</span>
            <span>${bookingData.pickupAddress}</span>
          </div>
          
          <div class="info-row">
            <span class="info-label">To:</span>
            <span>${bookingData.dropoffAddress}</span>
          </div>
          
          <div class="info-row">
            <span class="info-label">Date:</span>
            <span>${formatDate(bookingData.date)}</span>
          </div>
          
          <div class="info-row">
            <span class="info-label">Time:</span>
            <span>${bookingData.time}</span>
          </div>
          
          <div class="info-row">
            <span class="info-label">Passengers:</span>
            <span>${bookingData.passengers}</span>
          </div>
          
          <div class="info-row">
            <span class="info-label">Vehicle:</span>
            <span>${getVehicleName(bookingData.vehicleType)}</span>
          </div>
          
          ${bookingData.specialRequests ? `
          <div class="info-row">
            <span class="info-label">Special Requests:</span>
            <span>${bookingData.specialRequests}</span>
          </div>
          ` : ''}
          
          <div class="price-box">
            <div class="price-label">Estimated Total Price</div>
            <div class="price-value">€${getVehiclePrice()}</div>
          </div>
        </div>
        
        <div class="section">
          <h2 class="section-title">Contact Details</h2>
          
          <div class="info-row">
            <span class="info-label">Name:</span>
            <span>${bookingData.fullName}</span>
          </div>
          
          <div class="info-row">
            <span class="info-label">Email:</span>
            <span>${bookingData.email}</span>
          </div>
          
          <div class="info-row">
            <span class="info-label">Phone:</span>
            <span>${bookingData.phone}</span>
          </div>
        </div>
        
        <div class="section">
          <h2 class="section-title">Booking Terms</h2>
          
          <ul>
            <li>A 20% deposit is required to secure your booking.</li>
            <li>The remaining balance can be paid to the driver in cash or by credit card.</li>
            <li>Cancellations made at least 24 hours before scheduled pickup are free of charge.</li>
            <li>Cancellations made less than 24 hours before scheduled pickup may incur a cancellation fee.</li>
            <li>60 minutes of free waiting time is included for airport pickups.</li>
            <li>All rates include taxes, tolls, and gratuity.</li>
          </ul>
        </div>
        
        <div class="footer">
          <p>Thank you for choosing RideConnect for your travel needs.</p>
          <p>If you have any questions, please contact us at info.rideconnect@gmail.com or +386 70 832 530.</p>
          <p>&copy; ${new Date().getFullYear()} RideConnect. All rights reserved.</p>
        </div>
        
        <div class="date-generated">
          Document generated on: ${currentDate}
        </div>
      </div>
    </body>
    </html>
  `;
};

/**
 * Generates a PDF attachment from booking confirmation HTML
 * This uses html2canvas to create a PNG image that can be attached to an email
 */
export const generateBookingConfirmationAttachment = async (
  bookingData: BookingFormData,
  orderNumber: string
): Promise<string> => {
  try {
    // Create a temporary container to render the PDF content
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = createBookingConfirmationPdf(bookingData, orderNumber);
    
    // Append to body but make it invisible
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '-9999px';
    document.body.appendChild(tempContainer);
    
    // Use html2canvas to create an image
    const canvas = await html2canvas(tempContainer, {
      scale: 2, // Higher quality
      logging: false,
      useCORS: true
    });
    
    // Convert to data URL (PNG format)
    const dataUrl = canvas.toDataURL('image/png');
    
    // Clean up
    document.body.removeChild(tempContainer);
    
    return dataUrl;
  } catch (error) {
    console.error('Error generating PDF attachment:', error);
    throw error;
  }
};