import React, { useState } from 'react';
import Navbar from '../componets/Navbar';

function Payments() {
    const [paymentAmount, setPaymentAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Credit Card');
    const [paymentStatus, setPaymentStatus] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!paymentAmount || paymentAmount <= 0) {
            setPaymentStatus('Please enter a valid payment amount.');
            return;
        }

        // Simulating payment processing
        setPaymentStatus('Processing payment...');

        // Fake delay to simulate payment processing
        setTimeout(() => {
            setPaymentStatus('Payment successful! Thank you.');
        }, 2000);
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className="p-6 space-y-6">
                <h1 className="text-3xl font-semibold text-indigo-600">Payment Page</h1>

                {/* Payment Form */}
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
                    <h2 className="text-xl font-medium text-indigo-500">Make a Payment</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Payment Amount */}
                        <div>
                            <label htmlFor="paymentAmount" className="block text-sm font-medium text-gray-700">
                                Payment Amount
                            </label>
                            <input
                                id="paymentAmount"
                                type="number"
                                value={paymentAmount}
                                onChange={(e) => setPaymentAmount(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter amount"
                                required
                            />
                        </div>

                        {/* Payment Method */}
                        <div>
                            <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
                                Payment Method
                            </label>
                            <select
                                id="paymentMethod"
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="Credit Card">Credit Card</option>
                                <option value="Debit Card">Debit Card</option>
                                <option value="PayPal">PayPal</option>
                            </select>
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className="w-full px-6 py-2 bg-indigo-600 text-white rounded-lg transform hover:scale-105 hover:bg-indigo-700 transition duration-300"
                            >
                                Pay Now
                            </button>
                        </div>
                    </form>
                </div>

                {/* Payment Status */}
                {paymentStatus && (
                    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 mt-4">
                        <h2 className="text-xl font-medium text-indigo-500">Payment Status</h2>
                        <p className="text-lg text-gray-700">{paymentStatus}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Payments;
