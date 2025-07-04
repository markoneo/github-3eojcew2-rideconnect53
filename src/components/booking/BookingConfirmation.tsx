import React, { useRef, useState, useEffect } from 'react';
import { Home, Mail, Phone, User, MessageSquare, CheckCircle, MapPin, Calendar, Clock, Users, Car, DollarSign, FileText, Check, Share2, Download, Copy, Smartphone, X, Printer, Loader2, RefreshCw } from 'lucide-react';
import Button from '../ui/Button';
import { BookingFormData } from '../../types/booking';
import html2canvas from 'html2canvas';

interface BookingConfirmationProps {
  bookingData: BookingFormData;
  orderNumber: string;
  onClose: () => void;
  onReturnHome: () => void;
}

// Processing stages for the booking
type ProcessingStage = 
  | 'initializing' 
  | 'processing' 
  | 'verifying' 
  | 'confirming'
  | 'completed';

export default function BookingConfirmation({ 
  bookingData, 
  orderNumber, 
  onClose, 
  onReturnHome 
}: BookingConfirmationProps) {
  const confirmationRef = useRef<HTMLDivElement>(null);
  const [isSharing, setIsSharing] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [shareMethod, setShareMethod] = useState<'copy' | 'image' | 'api' | null>(null);
  
  // Status tracking states
  const [processingStage, setProcessingStage] = useState<ProcessingStage>('initializing');
  const [processingComplete, setProcessingComplete] = useState(false);
  
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

  // Simulate booking processing
  useEffect(() => {
    // Don't run if already completed
    if (processingComplete) return;
    
    setProcessingStage('initializing');
    
    const processingSequence = async () => {
      // Process each stage with realistic timing
      await new Promise(resolve => setTimeout(resolve, 1500));
      setProcessingStage('processing');
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      setProcessingStage('verifying');
      
      await new Promise(resolve => setTimeout(resolve, 1800));
      setProcessingStage('confirming');
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      setProcessingStage('completed');
      setProcessingComplete(true);
    };
    
    processingSequence();
  }, [processingComplete]);

  // Copy booking details to clipboard
  const copyToClipboard = () => {
    setIsSharing(true);
    setShareMethod('copy');
    
    const bookingDetails = `
RideConnect Booking Confirmation
Order #: ${orderNumber}
----------------------------
Pickup: ${bookingData.pickupAddress}
Dropoff: ${bookingData.dropoffAddress}
Date: ${formatDate(bookingData.date)}
Time: ${bookingData.time}
Passengers: ${bookingData.passengers}
Vehicle: ${getVehicleName(bookingData.vehicleType)}
Estimated Price: €${getVehiclePrice()}
----------------------------
Name: ${bookingData.fullName}
Email: ${bookingData.email}
Phone: ${bookingData.phone}
${bookingData.specialRequests ? `Special Requests: ${bookingData.specialRequests}` : ''}
    `;
    
    navigator.clipboard.writeText(bookingDetails).then(() => {
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 3000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      alert('Could not copy to clipboard. Please try another share method.');
    }).finally(() => {
      setTimeout(() => setIsSharing(false), 1000);
    });
  };

  // Download confirmation as image
  const downloadAsImage = async () => {
    if (!confirmationRef.current) return;
    
    try {
      setIsSharing(true);
      setShareMethod('image');
      setShareSuccess(false);
      
      // Remove any prior styling that might interfere
      const originalStyle = confirmationRef.current.style.cssText;
      confirmationRef.current.style.cssText = "background-color: white; padding: 20px; border-radius: 12px;";
      
      // Wait a bit for any styles to apply
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const canvas = await html2canvas(confirmationRef.current, {
        scale: 2, // Higher quality
        backgroundColor: '#FFFFFF',
        logging: false,
        allowTaint: true,
        useCORS: true,
        onclone: (documentClone, element) => {
          // Make sure the clone has proper styling
          element.style.maxHeight = 'none';
          element.style.overflow = 'visible';
        }
      });
      
      // Restore original styling
      confirmationRef.current.style.cssText = originalStyle;
      
      // Convert canvas to blob
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((b) => resolve(b!), 'image/png', 1.0);
      });

      // For mobile devices, use FileSaver-like approach
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `RideConnect-Booking-${orderNumber}.png`;
      link.href = url;
      
      // Handle mobile devices
      if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        // On iOS Safari, direct download doesn't work, so open in new tab
        const newWindow = window.open(url, '_blank');
        
        if (!newWindow) {
          alert('Please allow popups to save your booking confirmation.');
        } else {
          // Add instructions for manual saving
          setTimeout(() => {
            alert('Your booking confirmation is ready. Press and hold on the image, then select "Save Image".');
          }, 1000);
        }
      } else {
        // Desktop - direct download works fine
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      
      URL.revokeObjectURL(url);
      setShareSuccess(true);
      
      // Reset success state after a few seconds
      setTimeout(() => setShareSuccess(false), 3000);
      
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Could not save as image. Please try again or take a screenshot instead.');
    } finally {
      setTimeout(() => setIsSharing(false), 1000);
    }
  };

  // Handle printing
  const handlePrint = () => {
    window.print();
  };

  // Handle Return Home button click
  const handleReturnHome = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent event bubbling
    onReturnHome(); // Call the provided callback
  };

  // Handle Close button click
  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent event bubbling
    onClose(); // Call the provided callback
  };

  // Share via mobile share API if available
  const shareViaAPI = () => {
    if (navigator.share) {
      setIsSharing(true);
      setShareMethod('api');
      
      const bookingDetails = `
RideConnect Booking Confirmation
Order #: ${orderNumber}
----------------------------
Pickup: ${bookingData.pickupAddress}
Dropoff: ${bookingData.dropoffAddress}
Date: ${formatDate(bookingData.date)}
Time: ${bookingData.time}
Passengers: ${bookingData.passengers}
Vehicle: ${getVehicleName(bookingData.vehicleType)}
Estimated Price: €${getVehiclePrice()}
      `;
      
      navigator.share({
        title: 'RideConnect Booking Confirmation',
        text: bookingDetails,
      }).then(() => {
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 3000);
      }).catch((error) => {
        console.error('Error sharing:', error);
        // Try fallback methods
        if (error.name === 'AbortError') {
          // User cancelled sharing, no need for fallback
          return;
        }
        // Try downloading instead
        downloadAsImage();
      })
      .finally(() => {
        setTimeout(() => setIsSharing(false), 1000);
      });
    } else {
      // Show share options if Web Share API is not available
      setShareOptionsVisible(true);
    }
  };

  // Share options UI state
  const [shareOptionsVisible, setShareOptionsVisible] = useState(false);

  // Render a processing indicator when the booking is still being processed
  const renderProcessingIndicator = () => {
    const getStatusMessage = () => {
      switch (processingStage) {
        case 'initializing':
          return 'Initializing your booking...';
        case 'processing':
          return 'Processing your reservation...';
        case 'verifying':
          return 'Verifying booking details...';
        case 'confirming':
          return 'Confirming your reservation...';
        case 'completed':
          return 'Booking confirmed!';
        default:
          return 'Processing...';
      }
    };

    // Only show processing indicator before completion
    if (processingComplete) return null;

    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-white/80 backdrop-blur-sm">
        <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full mx-auto text-center border border-blue-100">
          <div className="relative mb-6">
            {/* Circular progress indicator */}
            <div className="w-24 h-24 mx-auto relative">
              <div className="absolute inset-0 rounded-full border-4 border-blue-100"></div>
              <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
              
              {/* Success checkmark (shown when completed) */}
              {processingStage === 'completed' && (
                <div className="absolute inset-0 flex items-center justify-center scale-0 animate-scale-in">
                  <CheckCircle className="w-12 h-12 text-green-500" />
                </div>
              )}
              
              {/* Processing indicator (shown when not completed) */}
              {processingStage !== 'completed' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  {processingStage === 'initializing' && <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />}
                  {processingStage === 'processing' && <RefreshCw className="w-12 h-12 text-blue-500 animate-spin" />}
                  {processingStage === 'verifying' && <Users className="w-12 h-12 text-blue-500 animate-pulse" />}
                  {processingStage === 'confirming' && <DollarSign className="w-12 h-12 text-blue-500 animate-pulse" />}
                </div>
              )}
            </div>
            
            {/* Progress steps */}
            <div className="flex justify-between items-center mt-8 px-4">
              {['initializing', 'processing', 'verifying', 'confirming', 'completed'].map((stage, index) => (
                <div key={stage} className="flex flex-col items-center">
                  <div className={`relative z-10 w-4 h-4 rounded-full transition-colors duration-300 
                                  ${processingStage === stage ? 'bg-blue-500 scale-125' : 
                                    (index <= ['initializing', 'processing', 'verifying', 'confirming', 'completed'].indexOf(processingStage)) 
                                      ? 'bg-blue-500' : 'bg-gray-200'}`}>
                  </div>
                  {index < 4 && (
                    <div className={`absolute h-0.5 w-[calc(25%-1rem)] translate-x-6 
                                     ${index < ['initializing', 'processing', 'verifying', 'confirming', 'completed'].indexOf(processingStage) 
                                       ? 'bg-blue-500' : 'bg-gray-200'}`}>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2">{getStatusMessage()}</h3>
          <p className="text-gray-600">
            {processingStage === 'completed' 
              ? 'Your booking has been successfully confirmed! You can now view your booking details below.'
              : 'Please wait while we process your booking request. This will only take a moment.'}
          </p>
          
          {processingStage === 'completed' && (
            <button 
              onClick={() => setProcessingComplete(true)}
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              View Booking Details
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-75">
      <div className="max-w-4xl mx-auto my-8 bg-white rounded-lg shadow-xl">
        {/* Show processing indicator */}
        {renderProcessingIndicator()}

        {/* Top actions bar - hidden when printing */}
        <div className="sticky top-0 flex items-center justify-between bg-gray-100 p-3 print:hidden z-50">
          <div className="flex items-center gap-2">
            <button 
              onClick={handleClose}
              className="flex items-center gap-1 text-gray-600 hover:text-gray-800 transition-colors px-3 py-1.5 rounded-md hover:bg-gray-200"
            >
              <X size={18} />
              <span>Close</span>
            </button>
            
            <button 
              onClick={downloadAsImage}
              className="flex items-center gap-1 text-gray-600 hover:text-gray-800 transition-colors px-3 py-1.5 rounded-md hover:bg-gray-200"
            >
              <Download size={18} />
              <span>Save</span>
            </button>
          </div>
          
        </div>
      
        {/* Content Area */}
        <div ref={confirmationRef} className="p-6 md:p-12">
          {/* Header with Logo and Title */}
          <div className="flex flex-col items-center justify-center border-b border-gray-200 pb-8 mb-8">
            <div className="text-3xl font-bold text-blue-600 mb-2">RideConnect</div>
            <h1 className="text-4xl font-bold text-center text-gray-900">Booking Confirmation</h1>
            
            <div className="mt-4 text-center">
              <div className="bg-blue-50 text-blue-800 font-mono px-5 py-2 rounded-lg border border-blue-200 inline-block">
                <div className="flex items-center justify-center">
                  <FileText size={18} className="mr-2" />
                  <span className="font-bold text-lg">Order #: {orderNumber}</span>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="inline-flex items-center bg-green-50 px-4 py-1.5 rounded-full text-green-700 text-sm font-medium">
                <span className="flex-shrink-0 h-2.5 w-2.5 rounded-full bg-green-600 mr-2"></span>
                Booking Status: Confirmed
              </div>
            </div>
            
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-center">
              Thank you for your booking request! We will contact you shortly with an offer.
            </p>
            
            <div className="mt-4">
            </div>
          </div>
          
          {/* Main content - Two column layout for details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Left column - Trip Details */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Trip Details</h2>
              
              <div className="space-y-5">
                <div className="flex items-start border-b border-gray-100 pb-4">
                  <MapPin size={22} className="text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-base text-gray-500 font-medium">From</p>
                    <p className="font-semibold text-lg text-gray-900">{bookingData.pickupAddress}</p>
                  </div>
                </div>
                
                <div className="flex items-start border-b border-gray-100 pb-4">
                  <MapPin size={22} className="text-red-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-base text-gray-500 font-medium">To</p>
                    <p className="font-semibold text-lg text-gray-900">{bookingData.dropoffAddress}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 border-b border-gray-100 pb-4">
                  <div className="flex items-start">
                    <Calendar size={22} className="text-blue-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-base text-gray-500 font-medium">Date</p>
                      <p className="font-semibold text-lg text-gray-900">{formatDate(bookingData.date)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock size={22} className="text-blue-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-base text-gray-500 font-medium">Time</p>
                      <p className="font-semibold text-lg text-gray-900">{bookingData.time}</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <Users size={22} className="text-blue-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-base text-gray-500 font-medium">Passengers</p>
                      <p className="font-semibold text-lg text-gray-900">{bookingData.passengers}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Car size={22} className="text-blue-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-base text-gray-500 font-medium">Vehicle</p>
                      <p className="font-semibold text-lg text-gray-900">{getVehicleName(bookingData.vehicleType)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right column - Contact Details */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Contact Details</h2>
              
              <div className="space-y-5">
                <div className="flex items-start border-b border-gray-100 pb-4">
                  <User size={22} className="text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-base text-gray-500 font-medium">Name</p>
                    <p className="font-semibold text-lg text-gray-900">{bookingData.fullName}</p>
                  </div>
                </div>
                
                <div className="flex items-start border-b border-gray-100 pb-4">
                  <Mail size={22} className="text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-base text-gray-500 font-medium">Email</p>
                    <p className="font-semibold text-lg text-gray-900 break-all">{bookingData.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start border-b border-gray-100 pb-4">
                  <Phone size={22} className="text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-base text-gray-500 font-medium">Phone</p>
                    <p className="font-semibold text-lg text-gray-900">{bookingData.phone}</p>
                  </div>
                </div>
                
                {bookingData.specialRequests && (
                  <div className="flex items-start">
                    <MessageSquare size={22} className="text-blue-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-base text-gray-500 font-medium">Special Requests</p>
                      <p className="font-medium text-base text-gray-900">{bookingData.specialRequests}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Price Information */}
          <div className="bg-green-50 rounded-lg p-6 border border-green-100 mb-8">
            <div className="flex items-center">
              <DollarSign size={32} className="text-green-600 mr-4 flex-shrink-0" />
              <div>
                <p className="text-lg text-green-800 font-medium">Estimated Price</p>
                <p className="font-bold text-green-700 text-3xl">€{getVehiclePrice()}</p>
              </div>
            </div>
          </div>
          
          {/* What happens next section */}
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-100 mb-8">
            <div className="flex items-start">
              <div className="mr-3 bg-blue-100 rounded-full p-2">
                <Check className="text-blue-600 h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold text-blue-900 text-xl mb-3">What happens next?</h4>
                <ul className="space-y-3 text-blue-800 text-base">
                  <li className="flex items-start">
                    <Check size={16} className="text-blue-600 mr-2 mt-1 flex-shrink-0" />
                    We've sent a confirmation email with your booking details
                  </li>
                  <li className="flex items-start">
                    <Check size={16} className="text-blue-600 mr-2 mt-1 flex-shrink-0" />
                    Our team will contact you within 24 hours to confirm your reservation
                  </li>
                  <li className="flex items-start">
                    <Check size={16} className="text-blue-600 mr-2 mt-1 flex-shrink-0" />
                    Your driver will meet you at the pickup location with a name board
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Footer with contact information */}
          <div className="text-center text-gray-500 text-sm mt-12 pt-8 border-t border-gray-200">
            <p className="mb-1">Thank you for choosing RideConnect for your travel needs.</p>
            <p className="mb-1">If you have any questions, please contact us:</p>
            <p className="font-medium">info.rideconnect@gmail.com | +38670832530</p>
          </div>
          
          {/* Actions - only visible in screen view, not when printing */}
          <div className="mt-8 flex justify-center gap-4 print:hidden">
            <button 
              onClick={handleClose}
              className="flex items-center justify-center gap-2 py-3 px-6 border border-gray-300 rounded-md bg-white text-gray-800 font-semibold hover:bg-gray-50 transition-colors"
            >
              <X size={20} /> Close
            </button>

            <button 
              onClick={handleReturnHome}
              className="flex items-center justify-center gap-2 py-3 px-6 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition-colors"
            >
              <Home size={20} /> Return Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}