import { useState } from "react";
import { addPassword_Service } from "../../Service/Password.service";
import Dashboard from "../Dashboard";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const AddPassword = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        websiteName: "",
        websiteURL: "",
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await addPassword_Service(formData);
        if (success) {
            setFormData({ username: "", websiteName: "", websiteURL: "", email: "", password: "" });
            navigate("/passwords");
        }
    };
    
  const handleCancel = () => {
    navigate("/passwords"); // ✅ redirect if user cancels
  };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1B1F3B] to-[#4D869C] text-[#F5F7FA] flex flex-col">
            <Dashboard />
            <div className="flex justify-center items-center min-h-screen ">
                <div className="w-full max-w-2xl bg-gray-800 p-12 rounded-xl shadow-2xl border border-[#4D869C]">
                    <h2 className="text-2xl font-bold  text-gray-300 text-center mb-8">
                        Add New Password
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full p-4 text-lg border border-gray-400 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-400 placeholder-gray-400 placeholder-opacity-50"
                            required
                        />
                        <input
                            type="text"
                            name="websiteName"
                            placeholder="Website Name"
                            value={formData.websiteName}
                            onChange={handleChange}
                            className="w-full p-4 text-lg border border-gray-400 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-400 placeholder-gray-400 placeholder-opacity-50"
                            required
                        />
                        <input
                            type="url"
                            name="websiteURL"
                            placeholder="Website URL"
                            value={formData.websiteURL}
                            onChange={handleChange}
                            className="w-full p-4 text-lg border border-gray-400 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-400 placeholder-gray-400 placeholder-opacity-50"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-4 text-lg border border-gray-400 bg-gray-700 text-white rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-400 placeholder-gray-400 placeholder-opacity-50"
                            required
                        />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-4 pr-12 text-lg border border-gray-400 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-400 placeholder-gray-400 placeholder-opacity-50"
                required
                aria-label="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white focus:outline-none"
                aria-pressed={showPassword}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
                        <button
                            type="submit"
                            className="w-full px-6 py-3 bg-[#3A7CA5] text-white rounded-lg shadow-lg shadow-[#3A7CA5]/50 hover:bg-[#81c3d7] transition-all transform hover:scale-105 placeholder-gray-400 placeholder-opacity-50"
                        >
                            Add Password
                        </button>
                        <button
                                type="button"
                                onClick={handleCancel}
                                className="w-full px-6 py-3 bg-[#3A7CA5] text-white rounded-lg shadow-lg shadow-[#3A7CA5]/50 hover:bg-[#81c3d7] transition-all transform hover:scale-105 placeholder-gray-400 placeholder-opacity-50"
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddPassword;
