import React, { useState } from 'react';
import BookingStepOne from '../booking/BookingStepOne';
import BookingStepTwo from '../booking/BookingStepTwo';
import PaymentInfo from '../payment/PaymentInfo';
import { StepOneData, StepTwoData, BookingFormData } from '../../types/booking';
import { handleBookingSubmission } from '../../services/bookingService';

export default function BookingForm() {
  const [step, setStep] = useState(1);
  const [stepOneData, setStepOneData] = useState<StepOneData>({
    pickupAddress: '',
    dropoffAddress: '',
    date: '',
    time: '',
    passengers: 1,
    priceEstimate: undefined
  });
  
  const [stepTwoData, setStepTwoData] = useState<StepTwoData>({
    fullName: '',
    phone: '',
    email: '',
    specialRequests: '',
    vehicleType: ''
  });

  const handleStepOneChange = (data: Partial<StepOneData>) => {
    setStepOneData(prev => ({ ...prev, ...data }));
  };

  const handleStepTwoChange = (data: Partial<StepTwoData>) => {
    setStepTwoData(prev => ({ ...prev, ...data }));
  };

  const handleSubmit = async () => {
    const formData: BookingFormData = {
      ...stepOneData,
      ...stepTwoData
    };

    try {
      await handleBookingSubmission(formData);
      return Promise.resolve();
    } catch (error) {
      console.error('Error submitting booking:', error);
      return Promise.reject(error);
    }
  };

  // Reset the form to its initial state
  const resetForm = () => {
    setStep(1);
    setStepOneData({
      pickupAddress: '',
      dropoffAddress: '',
      date: '',
      time: '',
      passengers: 1,
      priceEstimate: undefined
    });
    setStepTwoData({
      fullName: '',
      phone: '',
      email: '',
      specialRequests: '',
      vehicleType: ''
    });
  };

  return (
    <div className="w-full mx-auto">
      <div className="relative w-full">
        <div className="w-full max-w-4xl mx-auto">
          {/* Dynamic content */}
          {step === 1 ? (
            <BookingStepOne
              formData={stepOneData}
              onChange={handleStepOneChange}
              onNext={() => setStep(2)}
            />
          ) : (
            <>
              <BookingStepTwo
                formData={stepTwoData}
                locationData={{
                  pickupAddress: stepOneData.pickupAddress,
                  dropoffAddress: stepOneData.dropoffAddress,
                  date: stepOneData.date,
                  time: stepOneData.time,
                  priceEstimate: stepOneData.priceEstimate
                }}
                passengers={stepOneData.passengers}
                onChange={handleStepTwoChange}
                onSubmit={handleSubmit}
                onBack={() => setStep(1)}
                onReset={resetForm}
              />
              <PaymentInfo />
            </>
          )}
        </div>
      </div>
    </div>
  );
}