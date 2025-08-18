import { useState } from 'react';
import interestOptions from '../data/interestOptions.js';

const allInterests = interestOptions.flatMap(category => category.interests);

const NodeForm = ({ onNewNode, onClose }) => {
    const [formData, setFormData] = useState({
        id: '',
        fullName: '',
        year: '',
        portfolio: '',
        bio: '',
        interests: { primary: '', secondary: '', tertiary: '' },
        color: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (['primary', 'secondary', 'tertiary'].includes(name)) {
        const updatedInterests = {
            ...formData.interests,
            [name]: value,
        };

        const detectedColor =
            interestOptions.find(category =>
            category.interests.includes(updatedInterests.primary)
            )?.color || '';

        setFormData({
            ...formData,
            interests: updatedInterests,
            color: detectedColor,
        });
        } else {
        setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const storedNodes = JSON.parse(localStorage.getItem('nodes')) || [];
        const newNode = { ...formData, id: storedNodes.length + 1 };
        const updatedNodes = [...storedNodes, newNode];
        localStorage.setItem('nodes', JSON.stringify(updatedNodes));
        onNewNode(newNode);
        onClose();

        setFormData({
        fullName: '',
        year: '',
        portfolio: '',
        bio: '',
        interests: { primary: '', secondary: '', tertiary: '' },
        color: '',
        });
    };

    const getFilteredOptions = (excludeList) => {
        return allInterests.filter(interest => !excludeList.includes(interest));
    };

    return (
        <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 text-[#c9c9c9] font-space-grotesk"
        >
        <div className="flex flex-col">
            <label className="text-sm text-[#868686]">Full Name</label>
            <input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="bg-[#2a2a2a] p-2 rounded text-white outline-none"
            />
        </div>

        <div className="flex flex-col">
            <label className="text-sm text-[#868686]">Year</label>
            <input
            name="year"
            type="number"
            value={formData.year}
            onChange={handleChange}
            required
            className="bg-[#2a2a2a] p-2 rounded text-white outline-none"
            />
        </div>

        <div className="flex flex-col">
            <label className="text-sm text-[#868686]">Portfolio</label>
            <input
            name="portfolio"
            value={formData.portfolio}
            onChange={handleChange}
            className="bg-[#2a2a2a] p-2 rounded text-white outline-none"
            />
        </div>

        <div className="flex flex-col">
            <label className="text-sm text-[#868686]">Bio</label>
            <textarea
            name="bio"
            maxLength={100}
            value={formData.bio}
            onChange={handleChange}
            rows={3}
            className="bg-[#2a2a2a] p-2 rounded text-white outline-none resize-none"
            />
        </div>

        <div className="flex flex-col gap-2">
            <label className="text-sm text-[#868686]">Primary Interest</label>
            <select
            name="primary"
            value={formData.interests.primary}
            onChange={handleChange}
            required
            className="bg-[#2a2a2a] p-2 rounded text-white outline-none"
            >
            <option value="">Select Primary Interest</option>
            {getFilteredOptions([formData.interests.secondary, formData.interests.tertiary]).map(interest => (
                <option key={interest} value={interest}>
                {interest}
                </option>
            ))}
            </select>

            <label className="text-sm text-[#868686]">Secondary Interest</label>
            <select
            name="secondary"
            value={formData.interests.secondary}
            onChange={handleChange}
            className="bg-[#2a2a2a] p-2 rounded text-white outline-none"
            >
            <option value="">Select Secondary Interest</option>
            {getFilteredOptions([formData.interests.primary, formData.interests.tertiary]).map(interest => (
                <option key={interest} value={interest}>
                {interest}
                </option>
            ))}
            </select>

            <label className="text-sm text-[#868686]">Tertiary Interest</label>
            <select
            name="tertiary"
            value={formData.interests.tertiary}
            onChange={handleChange}
            className="bg-[#2a2a2a] p-2 rounded text-white outline-none"
            >
            <option value="">Select Tertiary Interest</option>
            {getFilteredOptions([formData.interests.primary, formData.interests.secondary]).map(interest => (
                <option key={interest} value={interest}>
                {interest}
                </option>
            ))}
            </select>
        </div>

        <button
            type="submit"
            className="mt-4 bg-[#BD17C0] hover:bg-[#a015a7] text-white py-2 px-4 rounded transition"
        >
            Add Node
        </button>
        </form>
    );
    };

export default NodeForm;
