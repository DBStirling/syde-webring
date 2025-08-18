import interestOptions from '../data/interestOptions';

const getNodeColor = (node) => {
    console.log(node)
    const primaryInterest = node.interests?.interest_1;
    if (!primaryInterest) return '#333333'; // default fallback color

    const group = interestOptions.find(group => group.interests.includes(primaryInterest));
    return group ? group.color : '#333333'; // fallback if interest not found
};

export default getNodeColor;
