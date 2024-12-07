import React, { useState } from "react";

const CommentForm = ({ onAddComment }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onAddComment) {
      onAddComment(formData);
    }
    setFormData({ name: "", email: "", comment: "" }); // Reset form setelah submit
  };

  return (
    <form
      className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg"
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="comment"
          className="block text-sm font-medium text-gray-700"
        >
          Comment
        </label>
        <textarea
          id="comment"
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          required
          rows="4"
          className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-emerald-700 text-white px-4 py-2 rounded-lg hover:bg-emerald-800"
      >
        Submit
      </button>
    </form>
  );
};

export default CommentForm;
