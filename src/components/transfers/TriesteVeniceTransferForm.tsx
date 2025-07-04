import React, { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';
import Button from '../ui/Button';
import FormInput from '../form/FormInput';

interface TransferFormProps {
  onSubmit: (data: { date: string; time: string }) => void;
  onCancel: () => void;
}

export default function TransferForm({ onSubmit, onCancel }: TransferFormProps) {
  const [formData, setFormData] = useState({
    date: '',
    time: ''
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