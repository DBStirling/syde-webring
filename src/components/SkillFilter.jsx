import React from 'react';
import skillOptions from '../data/skillOptions';

const allSkills = skillOptions.flatMap(group => group.skills);

const SkillFilter = ({ skillFilters, setSkillFilters }) => {
    const toggleSkill = (skill) => {
        if (skillFilters.includes(skill)) {
        setSkillFilters(skillFilters.filter(s => s !== skill));
        } else if (skillFilters.length < 3) {
        setSkillFilters([...skillFilters, skill]);
        }
    };

    return (
        <div className="fixed top-20 left-4 z-50 flex flex-wrap gap-2 w-[240px]">
        {allSkills.map(skill => (
            <button
            key={skill}
            onClick={() => toggleSkill(skill)}
            className={`text-sm px-3 py-1 rounded-full border ${
                skillFilters.includes(skill)
                ? 'bg-[#8B32EB] text-white border-transparent'
                : 'bg-[#1a1a1a] text-gray-300 border-gray-600 hover:bg-[#2a2a2a]'
            }`}
            >
            {skill}
            </button>
        ))}
        </div>
    );
};

export default SkillFilter;
