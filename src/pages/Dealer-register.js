import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ShippingForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    country: "United States (US)",
    streetAddress: "",
    apartmentInfo: "",
    city: "",
    state: "California",
    zipCode: "",
    phone: "",
    email: "",
    createAccount: false,
    differentAddress: false,
    paymentMethod: "directBank",
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });

  const validateForm = () => {
    const newErrors = {};

    // Required field validation
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.streetAddress.trim())
      newErrors.streetAddress = "Street address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = "Valid email is required";
    }

    const zipRegex = /^\d{6}$/i;
    if (formData.zipCode && !zipRegex.test(formData.zipCode)) {
      newErrors.zipCode = "Invalid ZIP code format";
    }

    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Invalid phone number format";
    }

    if (!formData.termsAccepted) {
      newErrors.terms = "You must accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ type: "", message: "" });

    if (!validateForm()) {
      setSubmitStatus({
        type: "error",
        message: "Please correct the errors before submitting.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/sampleendpoint`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSubmitStatus({
        type: "success",
        message: "Form submitted successfully!",
      });

      // Clear form if submission is successful
      if (data.success) {
        setFormData({
          firstName: "",
          lastName: "",
          companyName: "",
          country: "United States (US)",
          streetAddress: "",
          apartmentInfo: "",
          city: "",
          state: "California",
          zipCode: "",
          phone: "",
          email: "",
          createAccount: false,
          differentAddress: false,
          paymentMethod: "directBank",
          termsAccepted: false,
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message:
          "An error occurred while submitting the form. Please try again.",
      });
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit} className="max-w-6xl mx-auto p-4">
        {submitStatus.message && (
          <div
            className={`p-4 mb-4 rounded ${
              submitStatus.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {submitStatus.message}
          </div>
        )}

        {/* Coupon Banner */}
        <div className="bg-gray-50 p-3 mb-6">
          <p className="text-gray-700 text-sm">
            <span className="text-red-500 mr-1">□</span>
            Have a coupon?{" "}
            <button type="button" className="text-gray-700 hover:underline">
              Click here to enter your code
            </button>
          </p>
        </div>

        {/* Create Account Banner */}
        <div className="bg-pink-50 border border-pink-100 p-3 mb-6 rounded">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 flex items-center justify-center rounded-full border border-gray-400">
              <span className="text-gray-600 text-sm">?</span>
            </div>
            <p className="text-gray-700">
              Create Account and get free Advertisement !
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Form Section */}
          <div className="lg:col-span-2">
            <h2 className="text-gray-700 mb-4">Dealer details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm mb-1">
                  First name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  } rounded focus:outline-none focus:border-blue-500`}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm mb-1">
                  Last name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  } rounded focus:outline-none focus:border-blue-500`}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-1">
                Company name (optional)
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-1">
                Country / Region <span className="text-red-500">*</span>
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 bg-white"
              >
                <option value="United States (US)">United States (US)</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-1">
                Street address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleChange}
                placeholder="House number and street name"
                className={`w-full px-3 py-2 border ${
                  errors.streetAddress ? "border-red-500" : "border-gray-300"
                } rounded focus:outline-none focus:border-blue-500 mb-2`}
              />
              {errors.streetAddress && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.streetAddress}
                </p>
              )}
              <input
                type="text"
                name="apartmentInfo"
                value={formData.apartmentInfo}
                onChange={handleChange}
                placeholder="Apartment, suite, unit, etc. (optional)"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-1">
                Town / City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.city ? "border-red-500" : "border-gray-300"
                } rounded focus:outline-none focus:border-blue-500`}
              />
              {errors.city && (
                <p className="text-red-500 text-xs mt-1">{errors.city}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-1">
                State <span className="text-red-500">*</span>
              </label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.state ? "border-red-500" : "border-gray-300"
                } rounded focus:outline-none focus:border-blue-500 bg-white`}
              >
                <option value="California">California</option>
              </select>
              {errors.state && (
                <p className="text-red-500 text-xs mt-1">{errors.state}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-1">
                ZIP Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.zipCode ? "border-red-500" : "border-gray-300"
                } rounded focus:outline-none focus:border-blue-500`}
              />
              {errors.zipCode && (
                <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-1">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                } rounded focus:outline-none focus:border-blue-500`}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-1">
                Email address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded focus:outline-none focus:border-blue-500`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="createAccount"
                  checked={formData.createAccount}
                  onChange={handleChange}
                  className="border-gray-300 rounded"
                />
                <span className="text-sm">Create an account?</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="differentAddress"
                  checked={formData.differentAddress}
                  onChange={handleChange}
                  className="border-gray-300 rounded"
                />
                <span className="text-sm">Ship to a different address?</span>
              </label>
            </div>
          </div>

          {/* Right Section */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6">
              <h2 className="font-medium text-gray-700 mb-4">
                Terms & Conditions
              </h2>

              <div className="space-y-4">
                {[1, 2, 3].map((_, index) => (
                  <p key={index} className="text-sm text-gray-600">
                    Make your payment directly into our bank account. Please use
                    your Order ID as the payment reference. Your order will not
                    be shipped until the funds have cleared in our account.
                  </p>
                ))}

                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="directBank"
                      checked={formData.paymentMethod === "directBank"}
                      onChange={handleChange}
                      className="border-gray-300"
                    />
                    <span className="text-sm">Direct Bank Transfer</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="checkPayment"
                      checked={formData.paymentMethod === "checkPayment"}
                      onChange={handleChange}
                      className="border-gray-300"
                    />
                    <span className="text-sm">Check Payments</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cashOnDelivery"
                      checked={formData.paymentMethod === "cashOnDelivery"}
                      onChange={handleChange}
                      className="border-gray-300"
                    />
                    <span className="text-sm">Cash On Delivery</span>
                  </label>
                </div>

                <p className="text-sm text-gray-600">
                  Your personal data will be used to process your order, support
                  your experience throughout this website, and for other
                  purposes described in our{" "}
                  <button
                    type="button"
                    className="text-blue-600 hover:underline"
                  >
                    privacy policy
                  </button>
                  .
                </p>

                <label className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    className="mt-1 border-gray-300 rounded"
                  />
                  <span className="text-sm">
                    I have read and agree to the website{" "}
                    <button
                      type="button"
                      className="text-blue-600 hover:underline"
                    >
                      terms and conditions
                    </button>
                  </span>
                </label>
                {errors.terms && (
                  <p className="text-red-500 text-xs">{errors.terms}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors disabled:bg-blue-300"
                >
                  {isSubmitting ? "Processing..." : "Continue"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <Footer/>
    </>
  );
};

export default ShippingForm;
