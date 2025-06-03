import skillOptions from '../data/skillOptions';

const getNodeColor = (node) => {
    const primarySkill = node.skills?.skill1;
    if (!primarySkill) return '#333333'; // default fallback color

    const group = skillOptions.find(group => group.skills.includes(primarySkill));
    return group ? group.color : '#333333'; // fallback if skill not found
};

export default getNodeColor;
