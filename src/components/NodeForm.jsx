import { useState } from 'react';
import skillOptions from '../data/skillOptions.js';

const allSkills = skillOptions.flatMap(category => category.skills);
console.log(allSkills); // This will log all skills in a flat array

const NodeForm = ({onNewNode}) => {
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
            setFormData({
                ...formData, skills: {
                    ...formData.skills, 
                    [name]: value 
                } 
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Get existing nodes from localStorage
        const storedNodes = JSON.parse(localStorage.getItem('nodes')) || [];

        // Create a new node with next ID
        const newNode = {
            ...formData,
            id: storedNodes.length + 1
        };

        // Update localStorage
        const updatedNodes = [...storedNodes, newNode];
        localStorage.setItem('nodes', JSON.stringify(updatedNodes));

        // Pass to parent for in-app graph update
        onNewNode(newNode);

        // Reset form
        setFormData({
            fullName: '',
            year: '',
            portfolio: '',
            bio: '',
            skills: { primary: '', secondary: '', tertiary: '' },
            color: ''
        });
    };


    const getFilteredOptions = (excludeList) => {
        return allSkills.filter(skill => !excludeList.includes(skill));
    };

    return (
        <form className="node-form" onSubmit={handleSubmit}>
        {/* TASK: ID NEEDS TO AUTO INCREMENT AND NOT BE AN INPUT (probably retrieve from JSON?) */}
        <input
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
        />
        <input
            name="year"
            type="number"
            placeholder="Year"
            value={formData.year}
            onChange={handleChange}
            required
        />
        <input
            name="portfolio"
            placeholder="Portfolio URL"
            value={formData.portfolio}
            onChange={handleChange}
        />
        <textarea
            name="bio"
            placeholder="Bio"
            value={formData.bio}
            onChange={handleChange}
        />
        <select
            name="primary"
            value={formData.skills.primary}
            onChange={handleChange}
            required
        >
            <option value="">Select Primary Skill</option>
            {getFilteredOptions([formData.skills.secondary, formData.skills.tertiary]).map(skill => (
                <option key={skill} value={skill}>{skill}</option>
            ))}
            {formData.color = skillOptions.find(category => category.skills.includes(formData.skills.primary))?.color || ''}
            {console.log(formData.color)}
        </select>
        <select
            name="secondary"
            value={formData.skills.secondary}
            onChange={handleChange}
        >
            <option value="">Select Secondary Skill</option>
            {getFilteredOptions([formData.skills.primary, formData.skills.tertiary]).map(skill => (
                <option key={skill} value={skill}>{skill}</option>
            ))}
        </select>
        <select
            name="tertiary"
            value={formData.skills.tertiary}
            onChange={handleChange}
        >
            <option value="">Select Tertiary Skill</option>
            {getFilteredOptions([formData.skills.primary, formData.skills.secondary]).map(skill => (
                <option key={skill} value={skill}>{skill}</option>
            ))}
        </select>
        <button type="submit">Add Node</button>
    </form>
    );
};

export default NodeForm;