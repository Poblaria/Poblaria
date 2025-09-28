"use client";

import { useState, type FormEvent } from "react";

export default function FormComponent({ onClose }: { onClose?: () => void }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        questionType: "general",
        message: ""
    });

    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/submit-form", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setSubmitted(true);
                setFormData({
                    name: "",
                    email: "",
                    questionType: "general",
                    message: ""
                });
                setTimeout(() => setSubmitted(false), 3000);
            }
        } catch {
            // TODO: handle error
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Submit a Question</h2>
                {onClose && (
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-2xl"
                        aria-label="Close form"
                    >
                        &times;
                    </button>
                )}
            </div>

            {submitted ? (
                <div className="bg-green-100 p-4 rounded-lg text-green-700">
                    Thank you for your submission!
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Full Name *
                        </label>
                        <input
                            type="text"
                            required
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    name: e.target.value
                                })
                            }
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Email *
                        </label>
                        <input
                            type="email"
                            required
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    email: e.target.value
                                })
                            }
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Question Type
                        </label>
                        <select
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={formData.questionType}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    questionType: e.target.value
                                })
                            }
                        >
                            <option value="general">General Inquiry</option>
                            <option value="property">Property Question</option>
                            <option value="job">Job Question</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Message *
                        </label>
                        <textarea
                            required
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"
                            value={formData.message}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    message: e.target.value
                                })
                            }
                        />
                    </div>

                    <div className="flex justify-end gap-3">
                        {onClose && (
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                            >
                                Cancel
                            </button>
                        )}
                        <button
                            type="submit"
                            className="px-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
