import React from 'react';
import { MapPin, RotateCcw, Route, Clock, Loader2 } from 'lucide-react';
import Button from '../ui/Button';
import { calculateDistance } from '../../services/distanceService';

interface LocationSummaryProps {
  pickupAddress: string;
  dropoffAddress: string;
  onReset: () => void;
}

export default function LocationSummary({
  pickupAddress,
  dropoffAddress,
  onReset,
}: LocationSummaryProps) {
  const [distanceInfo, setDistanceInfo] = React.useState<{
    distance: number;
    duration: number;
    loading: boolean;
    error: boolean;
  }>({
    distance: 0,
    duration: 0,
    loading: false,
    error: false
  });

  // Calculate distance when addresses change
  React.useEffect(() => {
    const getDistanceInfo = async () => {
      if (!pickupAddress || !dropoffAddress) {
        setDistanceInfo(prev => ({ ...prev, distance: 0, duration: 0, loading: false, error: false }));
        return;
      }

      setDistanceInfo(prev => ({ ...prev, loading: true, error: false }));

      try {
        const result = await calculateDistance(pickupAddress, dropoffAddress);
        setDistanceInfo({
          distance: result.distance,
          duration: result.duration,
          loading: false,
          error: false
        });
      } catch (error) {
        console.error('Error calculating distance:', error);
        setDistanceInfo(prev => ({ ...prev, loading: false, error: true }));
      }
    };

    // Debounce the calculation
    const timeoutId = setTimeout(getDistanceInfo, 500);
    return () => clearTimeout(timeoutId);
  }, [pickupAddress, dropoffAddress]);

  // Format duration from minutes to hours and minutes
  const formatDuration = (minutes: number): string => {
    if (minutes < 60) {
      return `${Math.round(minutes)} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = Math.round(minutes % 60);
    if (remainingMinutes === 0) {
      return `${hours}h`;
    }
    return `${hours}h ${remainingMinutes}min`;
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Location Details */}
      <div className="space-y-4">
        <div className="flex items-start gap-2 sm:gap-3">
          <div className="mt-1">
            <MapPin className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-500 font-medium">Pickup Location</p>
            <p className="text-gray-900 break-words">{pickupAddress}</p>
          </div>
        </div>

        <div className="flex items-start gap-2 sm:gap-3">
          <div className="mt-1">
            <MapPin className="w-5 h-5 text-red-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-500 font-medium">Dropoff Location</p>
            <p className="text-gray-900 break-words">{dropoffAddress}</p>
          </div>
        </div>
      </div>

      {/* Distance Information */}
      {(pickupAddress && dropoffAddress) && (
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Distance */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  {distanceInfo.loading ? (
                    <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                  ) : (
                    <Route className="w-4 h-4 text-blue-600" />
                  )}
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Distance</p>
                  {distanceInfo.loading ? (
                    <p className="text-sm font-semibold text-gray-400">Calculating...</p>
                  ) : distanceInfo.error ? (
                    <p className="text-sm font-semibold text-gray-400">~200 km</p>
                  ) : (
                    <p className="text-sm font-semibold text-gray-900">
                      {Math.round(distanceInfo.distance)} km
                    </p>
                  )}
                </div>
              </div>

              {/* Duration */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Est. Time</p>
                  {distanceInfo.loading ? (
                    <p className="text-sm font-semibold text-gray-400">Calculating...</p>
                  ) : distanceInfo.error ? (
                    <p className="text-sm font-semibold text-gray-400">~3h</p>
                  ) : (
                    <p className="text-sm font-semibold text-gray-900">
                      {formatDuration(distanceInfo.duration)}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {distanceInfo.error && (
              <div className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded">
                Estimated values
              </div>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-center sm:justify-start">
        <Button
          onClick={onReset}
          variant="secondary"
          className="flex items-center justify-center gap-2 text-sm py-2 px-4 w-full sm:w-auto"
        >
          <RotateCcw size={16} />
          Reset
        </Button>
      </div>
    </div>
  );
}