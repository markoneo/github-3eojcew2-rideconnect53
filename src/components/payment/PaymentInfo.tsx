import React from 'react';
import { Wallet, CreditCard, DollarSign, ShieldCheck } from 'lucide-react';

export default function PaymentInfo() {
  return (
    <div className="bg-blue-50 rounded-lg p-6 mt-8">
      <div className="max-w-3xl mx-auto">
        <h3 className="text-xl font-semibold text-blue-900 mb-4 flex items-center gap-2">
          <Wallet className="h-6 w-6" />
          Secure Payment Process
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <DollarSign className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Reservation Deposit</h4>
                <p className="text-gray-600 text-sm">
                  Only 20% deposit required to secure your booking. Pay securely online with your preferred payment method.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <CreditCard className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Remaining Balance</h4>
                <p className="text-gray-600 text-sm">
                  Pay the remaining 80% to your driver in cash or by credit card after your journey.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
          <ShieldCheck className="h-5 w-5 text-green-600" />
          <span>All payments are secure and encrypted</span>
        </div>
      </div>
    </div>
  );
}