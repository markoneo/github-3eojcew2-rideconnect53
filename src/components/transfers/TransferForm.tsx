import React, { useState } from 'react';
import { Calendar, Clock, Phone, MessageSquare, Mail, User } from 'lucide-react';
import Button from '../ui/Button';
import FormInput from '../form/FormInput';

interface TransferFormProps {
  onSubmit: (data: { 
    date: string; 
    time: string;
    name: string;
    email: string;
    phone: string;
    specialRequirements: string;
  }) => void;
  onCancel: () => void;
}

export default function TransferForm({ onSubmit, onCancel }: TransferFormProps) {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
    specialRequirements: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Date"
          name="date"
          type="date"
          value={formData.date}
          onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
          required
          icon={Calendar}
        />

        <FormInput
          label="Time"
          name="time"
          type="time"
          value={formData.time}
          onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
          required
          icon={Clock}
        />
      </div>

      <FormInput
        label="Full Name"
        name="name"
        type="text"
        value={formData.name}
        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
        required
        icon={User}
      />

      <FormInput
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
        required
        icon={Mail}
      />

      <div className="space-y-2">
        <FormInput
          label="Phone Number"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          required
          icon={Phone}
        />
        <p className="text-xs text-gray-500">
          Please include your country code (e.g., +1 for USA/Canada, +44 for UK, +49 for Germany)
        </p>
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <MessageSquare size={18} />
          Special Requirements
        </label>
        <textarea
          name="specialRequirements"
          value={formData.specialRequirements}
          onChange={(e) => setFormData(prev => ({ ...prev, specialRequirements: e.target.value }))}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Examples: Child seat needed, extra luggage space, flight number, etc."
        />
      </div>

      <div className="flex gap-4">
        <Button
          variant="secondary"
          onClick={onCancel}
          type="button"
          className="flex-1"
        >
          Cancel
        </Button>
        <Button type="submit" className="flex-1">
          Proceed to Payment
        </Button>
      </div>
    </form>
  );
}