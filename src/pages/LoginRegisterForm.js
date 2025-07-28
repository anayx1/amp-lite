import React, { useState } from "react";

const AuthPages = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    userType: "customer",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = (data, isLoginForm) => {
    if (isLoginForm) {
      if (!data.email || !data.password) {
        throw new Error("Please fill in all required fields");
      }
    } else {
      if (!data.username || !data.email || !data.password) {
        throw new Error("Please fill in all required fields");
      }
      if (!/\S+@\S+\.\S+/.test(data.email)) {
        throw new Error("Please enter a valid email address");
      }
      if (data.password.length < 8) {
        throw new Error("Password must be at least 8 characters long");
      }
    }
    return true;
  };

  const handleLogin = async (loginData) => {
    try {
      validateForm(loginData, true);

      const payload = {
        email: loginData.email,
        password: loginData.password,
        rememberMe: loginData.rememberMe,
      };

      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Login failed. Please check your credentials."
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const handleRegister = async (registerData) => {
    try {
      validateForm(registerData, false);

      const payload = {
        username: registerData.username,
        email: registerData.email,
        password: registerData.password,
        userType: registerData.userType,
      };

      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Registration failed. Please try again."
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (isLogin) {
        await handleLogin(formData);
      } else {
        await handleRegister(formData);
      }

      setFormData({
        username: "",
        email: "",
        password: "",
        userType: "customer",
        rememberMe: false,
      });
    } catch (error) {
      console.error("Authentication error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-lg p-8">
        <div className="flex gap-4 justify-center mb-8">
          <button
            onClick={() => {
              setIsLogin(true);
              setError("");
            }}
            className={`text-2xl ${
              isLogin ? "font-bold text-gray-900" : "text-gray-400"
            }`}
            type="button"
          >
            Login
          </button>
          <button
            onClick={() => {
              setIsLogin(false);
              setError("");
            }}
            className={`text-2xl ${
              !isLogin ? "font-bold text-gray-900" : "text-gray-400"
            }`}
            type="button"
          >
            Register
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {isLogin ? (
          <p className="text-center text-gray-600 mb-6">
            If you have an account, sign in with your username or email address.
          </p>
        ) : (
          <p className="text-center text-gray-600 mb-6">
            There are many advantages to creating an account: the payment
            process is faster, shipment tracking is possible and much more.
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username *
              </label>
              <input
                type="text"
                name="username"
                required
                value={formData.username}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLoading}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isLogin ? "Username or email address *" : "Email address *"}
            </label>
            <input
              type="text"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password *
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            />
          </div>

          {isLogin ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
                  disabled={isLoading}
                />
                <label className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <button
                type="button"
                className="text-blue-500 text-sm hover:underline"
                disabled={isLoading}
              >
                Lost your password?
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="customer"
                    name="userType"
                    value="customer"
                    checked={formData.userType === "customer"}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300"
                    disabled={isLoading}
                  />
                  <label
                    htmlFor="customer"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    I am a customer
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="vendor"
                    name="userType"
                    value="vendor"
                    checked={formData.userType === "vendor"}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300"
                    disabled={isLoading}
                  />
                  <label
                    htmlFor="vendor"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    I am a vendor
                  </label>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Your personal data will be used to support your experience
                throughout this website, to manage access to your account, and
                for other purposes described in our privacy policy.
              </p>
            </>
          )}

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? (
              <span>Loading...</span>
            ) : (
              <span>{isLogin ? "Log in" : "Register"}</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPages;
