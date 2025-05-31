import React from 'react';
import skillOptions from '../data/skillOptions';

const getSkillColor = (skill) => {
  const group = skillOptions.find(group => group.skills.includes(skill));
  return group ? group.color : '#555';
};

const SkillFilter = ({ skillFilters, setSkillFilters }) => {
  const toggleSkill = (skill) => {
    if (skillFilters.includes(skill)) {
      setSkillFilters(skillFilters.filter(s => s !== skill));
    } else if (skillFilters.length < 3) {
      setSkillFilters([...skillFilters, skill]);
    }
  };

  return (
    <div className="fixed top-20 left-4 z-50 flex flex-col gap-4 w-[280px] max-h-[80vh] overflow-y-auto font-light font-['Space_Grotesk']">
      {skillOptions.map(group => (
        <div key={group.label} className="flex flex-wrap gap-2">
          {group.skills.map(skill => {
            const color = getSkillColor(skill);
            const isSelected = skillFilters.includes(skill);
            return (
            <button
            key={skill}
            onClick={() => toggleSkill(skill)}
            className={`text-sm px-3 py-1 rounded-[4px] border text-white transition-all duration-200 ${
                isSelected
                ? 'border-transparent'
                : 'bg-[#1a1a1a] hover:bg-[#2a2a2a]'
            }`}
            style={
                isSelected
                ? { backgroundColor: color }
                : { borderColor: color }
            }
            >
            {skill}
            </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default SkillFilter;
