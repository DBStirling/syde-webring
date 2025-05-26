import { useState } from 'react';
import skillOptions from '../data/skillOptions.js';

const allSkills = skillOptions.flatMap(category => category.skills);

const NodeForm = ({ onNewNode, onClose }) => {
    const [formData, setFormData] = useState({
        id: '',
        fullName: '',
        year: '',
        portfolio: '',
        bio: '',
        skills: { primary: '', secondary: '', tertiary: '' },
        color: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (['primary', 'secondary', 'tertiary'].includes(name)) {
        const updatedSkills = {
            ...formData.skills,
            [name]: value,
        };

        const detectedColor =
            skillOptions.find(category =>
            category.skills.includes(updatedSkills.primary)
            )?.color || '';

        setFormData({
            ...formData,
            skills: updatedSkills,
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
        skills: { primary: '', secondary: '', tertiary: '' },
        color: '',
        });
    };

    const getFilteredOptions = (excludeList) => {
        return allSkills.filter(skill => !excludeList.includes(skill));
    };

    return (
        <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 text-[#c9c9c9] font-['Space_Grotesk']"
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
            <label className="text-sm text-[#868686]">Primary Skill</label>
            <select
            name="primary"
            value={formData.skills.primary}
            onChange={handleChange}
            required
            className="bg-[#2a2a2a] p-2 rounded text-white outline-none"
            >
            <option value="">Select Primary Skill</option>
            {getFilteredOptions([formData.skills.secondary, formData.skills.tertiary]).map(skill => (
                <option key={skill} value={skill}>
                {skill}
                </option>
            ))}
            </select>

            <label className="text-sm text-[#868686]">Secondary Skill</label>
            <select
            name="secondary"
            value={formData.skills.secondary}
            onChange={handleChange}
            className="bg-[#2a2a2a] p-2 rounded text-white outline-none"
            >
            <option value="">Select Secondary Skill</option>
            {getFilteredOptions([formData.skills.primary, formData.skills.tertiary]).map(skill => (
                <option key={skill} value={skill}>
                {skill}
                </option>
            ))}
            </select>

            <label className="text-sm text-[#868686]">Tertiary Skill</label>
            <select
            name="tertiary"
            value={formData.skills.tertiary}
            onChange={handleChange}
            className="bg-[#2a2a2a] p-2 rounded text-white outline-none"
            >
            <option value="">Select Tertiary Skill</option>
            {getFilteredOptions([formData.skills.primary, formData.skills.secondary]).map(skill => (
                <option key={skill} value={skill}>
                {skill}
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
