import React, { useState } from 'react';
import Navbar from '../componets/Navbar';

function Payments() {
    const [paymentAmount, setPaymentAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Credit Card');
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [pastPayments, setPastPayments] = useState([]); // Store all past payments

    // Function to handle form submission and process the payment
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
            const paymentDate = new Date().toLocaleDateString();
            const newPayment = {
                date: paymentDate,
                amount: parseFloat(paymentAmount),
                method: paymentMethod,
            };

            // Add the new payment to the list of past payments
            setPastPayments([...pastPayments, newPayment]);

            setPaymentStatus('Payment successful! Thank you.');
        }, 2000);
    };

    // Function to generate and download the receipt
    const downloadReceipt = (payment) => {
        if (!payment) return;

        const receiptContent = `
            Payment Receipt:
            Date: ${payment.date}
            Amount: $${payment.amount.toFixed(2)}
            Payment Method: ${payment.method}
        `;

        const blob = new Blob([receiptContent], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'payment_receipt.txt';
        link.click();
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

                {/* Past Payments Section */}
                {pastPayments.length > 0 && (
                    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 mt-6">
                        <h2 className="text-xl font-medium text-indigo-500">Past Payments</h2>
                        <div className="space-y-4">
                            {pastPayments.map((payment, index) => (
                                <div key={index} className="space-y-2">
                                    <p className="text-lg text-gray-700">
                                        <strong>Date:</strong> {payment.date}
                                    </p>
                                    <p className="text-lg text-gray-700">
                                        <strong>Amount:</strong> ${payment.amount.toFixed(2)}
                                    </p>
                                    <p className="text-lg text-gray-700">
                                        <strong>Payment Method:</strong> {payment.method}
                                    </p>
                                    {/* Button to download the receipt */}
                                    <button
                                        onClick={() => downloadReceipt(payment)}
                                        className="px-6 py-2 bg-indigo-600 text-white rounded-lg transform hover:scale-105 hover:bg-indigo-700 transition duration-300"
                                    >
                                        Download Receipt
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Payments;
