import axios from 'axios';

// Configuration
const TELEGRAM_BOT_TOKEN = '6860681919:AAE1lggXrkQEIWAdSzVm2AAyO0f8kbx8uoc'; // Your Telegram bot token
const TELEGRAM_CHAT_ID = '446583957'; // Your chat ID
const IPAPI_URL = 'https://ipapi.co/json/';
const SEND_TO_TELEGRAM = true; // Set to false to disable Telegram notifications

// Types
interface VisitorInfo {
  ip: string;
  city?: string;
  region?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  userAgent?: string;
  language?: string;
  referrer?: string;
  page?: string;
  timestamp: string;
}

/**
 * Track visitor information and send notification to Telegram
 */
export const trackVisitor = async (): Promise<void> => {
  try {
    // Enable tracking in all environments for testing
    // Remove this condition once you've confirmed it works
    // if (process.env.NODE_ENV !== 'production') {
    //   console.log('Visitor tracking disabled in development mode');
    //   return;
    // }

    // Get visitor's IP and location data
    const locationData = await axios.get(IPAPI_URL);

    // Basic visitor information
    const visitorInfo: VisitorInfo = {
      ip: locationData.data.ip,
      city: locationData.data.city,
      region: locationData.data.region,
      country: locationData.data.country_name,
      latitude: locationData.data.latitude,
      longitude: locationData.data.longitude,
      userAgent: navigator.userAgent,
      language: navigator.language,
      referrer: document.referrer || 'Direct',
      page: window.location.href,
      timestamp: new Date().toISOString()
    };

    // Send to Telegram
    if (SEND_TO_TELEGRAM) {
      await sendTelegramNotification(visitorInfo);
    }

    // Store in localStorage for debugging (optional)
    storeVisitorData(visitorInfo);

    console.log('Visitor tracked successfully');
  } catch (error) {
    console.error('Error tracking visitor:', error);
  }
};

/**
 * Send notification to Telegram
 */
const sendTelegramNotification = async (visitorInfo: VisitorInfo): Promise<void> => {
  try {
    // Format message for Telegram
    const message = `
🔍 New Website Visitor!

📍 Location: ${visitorInfo.city || 'Unknown'}, ${visitorInfo.region || ''}, ${visitorInfo.country || 'Unknown'}
🌐 IP: ${visitorInfo.ip}
📱 Device: ${formatUserAgent(visitorInfo.userAgent || '')}
🔗 Page: ${visitorInfo.page}
↩️ Referrer: ${visitorInfo.referrer}
🕒 Time: ${new Date(visitorInfo.timestamp).toLocaleString()}
`;

    // Send to Telegram
    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      await axios.post(telegramUrl, {
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      });
    }
  } catch (error) {
    console.error('Error sending Telegram notification:', error);
  }
};

/**
 * Format user agent string to extract device information
 */
const formatUserAgent = (userAgent: string): string => {
  if (!userAgent) return 'Unknown';
  
  // Extract device information from user agent
  const isMobile = /Mobile|Android|iPhone|iPad|iPod|Windows Phone/i.test(userAgent);
  const isTablet = /Tablet|iPad/i.test(userAgent);
  
  let deviceType = 'Desktop';
  if (isTablet) deviceType = 'Tablet';
  else if (isMobile) deviceType = 'Mobile';
  
  // Extract browser information
  let browser = 'Unknown';
  if (userAgent.includes('Chrome')) browser = 'Chrome';
  else if (userAgent.includes('Firefox')) browser = 'Firefox';
  else if (userAgent.includes('Safari')) browser = 'Safari';
  else if (userAgent.includes('Edge')) browser = 'Edge';
  else if (userAgent.includes('MSIE') || userAgent.includes('Trident/')) browser = 'Internet Explorer';
  
  return `${deviceType}, ${browser}`;
};

/**
 * Store visitor data in localStorage for debugging
 */
const storeVisitorData = (visitorInfo: VisitorInfo): void => {
  try {
    // Get existing data
    const existingData = localStorage.getItem('visitorData');
    const visitors = existingData ? JSON.parse(existingData) : [];
    
    // Add new visitor and limit to last 50
    visitors.unshift(visitorInfo);
    if (visitors.length > 50) visitors.length = 50;
    
    // Save back to localStorage
    localStorage.setItem('visitorData', JSON.stringify(visitors));
  } catch (error) {
    console.error('Error storing visitor data:', error);
  }
};