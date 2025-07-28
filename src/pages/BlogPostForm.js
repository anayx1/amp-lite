import React, { useState } from "react";
import { AlertCircle } from "lucide-react";
import { Alert } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const BlogPostForm = () => {
  const [formData, setFormData] = useState({
    photo: null,
    title: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setFormData((prev) => ({ ...prev, photo: file }));
        setPreviewUrl(URL.createObjectURL(file));
        setErrors((prev) => ({ ...prev, photo: null }));
      } else {
        setErrors((prev) => ({
          ...prev,
          photo: "Please upload an image file",
        }));
      }
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setFormData((prev) => ({ ...prev, photo: file }));
      setPreviewUrl(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, photo: null }));
    } else {
      setErrors((prev) => ({ ...prev, photo: "Please upload an image file" }));
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.photo) {
      newErrors.photo = "Please upload a photo";
    }

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!termsAccepted) {
      newErrors.terms = "Please accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const formPayload = new FormData();
      formPayload.append("photo", formData.photo);
      formPayload.append("title", formData.title);
      formPayload.append("description", formData.description);

      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/createablog`, {
        method: "POST",
        body: formPayload,
      });

      if (!response.ok) {
        throw new Error("Failed to submit blog post");
      }

      // Reset form after successful submission
      setFormData({ photo: null, title: "", description: "" });
      setPreviewUrl("");
      setTermsAccepted(false);
      setErrors({});
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        submit: "Failed to submit blog post. Please try again.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="flex w-full justify-center flex-col items-center my-10">
        <h1 className="text-4xl font-bold text-center mb-8 text-center">
          Share your insights on ACMarketplace let your voice shine!
        </h1>
        <div className="max-w-6xl m-5 p-6 bg-[#F9F9FB] rounded-xl ">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
              {'>'} Upload photo file:
              </label>
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                {previewUrl ? (
                  <div className="relative">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="max-h-48 mx-auto rounded"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewUrl("");
                        setFormData((prev) => ({ ...prev, photo: null }));
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="mb-2">Drag & Drop file or</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
                    >
                      Browse file
                    </label>
                  </>
                )}
              </div>
              {errors.photo && (
                <p className="mt-1 text-sm text-red-500">{errors.photo}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
              {'> '}Write Title for Blog:
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Write Title here"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-500">{errors.title}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
              {'> '}Description of Blog:
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Write description of Blog here..."
                rows={4}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.description}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="terms"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
              />
              <label htmlFor="terms" className="text-sm">
                you agree to our{" "}
                <a href="/terms" className="text-blue-500 hover:underline">
                  Terms & Conditions
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-blue-500 hover:underline">
                  Privacy & Cookies Policy
                </a>
              </label>
            </div>
            {errors.terms && (
              <p className="text-sm text-red-500">{errors.terms}</p>
            )}

            {errors.submit && (
              <Alert
                severity="error"
                icon={<AlertCircle className="h-5 w-5" />}
                className="mb-4"
              >
                {errors.submit}
              </Alert>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Posting..." : "Post Blog"}
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default BlogPostForm;
