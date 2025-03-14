import { useState } from "react";
import { addPassword_Service } from "../../Service/Password.service";
import Dashboard from "../Dashboard";

const AddPassword = () => {
    const [formData, setFormData] = useState({
        username: "",
        websiteName: "",
        websiteURL: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await addPassword_Service(formData);
        if (success) {
            setFormData({ username: "", websiteName: "", websiteURL: "", email: "", password: "" });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1B1F3B] to-[#4D869C] text-[#F5F7FA] flex flex-col">
            <Dashboard />
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-full max-w-2xl bg-[#1B1F3B] p-12 rounded-2xl shadow-2xl">
                    <h2 className="text-3xl font-bold text-white text-center mb-8">
                        Add New Password
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full p-4 text-lg border border-gray-400 bg-[#2A2E5B] text-white rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-400"
                            required
                        />
                        <input
                            type="text"
                            name="websiteName"
                            placeholder="Website Name"
                            value={formData.websiteName}
                            onChange={handleChange}
                            className="w-full p-4 text-lg border border-gray-400 bg-[#2A2E5B] text-white rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-400"
                            required
                        />
                        <input
                            type="url"
                            name="websiteURL"
                            placeholder="Website URL"
                            value={formData.websiteURL}
                            onChange={handleChange}
                            className="w-full p-4 text-lg border border-gray-400 bg-[#2A2E5B] text-white rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-400"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-4 text-lg border border-gray-400 bg-[#2A2E5B] text-white rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-400"
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-4 text-lg border border-gray-400 bg-[#2A2E5B] text-white rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-400"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white p-4 text-lg font-semibold rounded-xl hover:bg-blue-700 transition duration-300"
                        >
                            Add Password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddPassword;
