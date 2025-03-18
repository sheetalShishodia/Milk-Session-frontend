'use client'; // Mark this as a Client Component
import { useState } from 'react';

export default function QuantityModal({ isOpen, onClose, onSubmit }) {
  const [quantity, setQuantity] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (quantity) {
      onSubmit(parseFloat(quantity));
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Enter Milk Quantity (in liters)</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            step="0.1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter quantity"
            required
          />
          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}