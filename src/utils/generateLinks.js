export const generateLinks = (nodes) => {
const links = [];

for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
    const skillsA = Object.values(nodes[i].skills || {});
    const skillsB = Object.values(nodes[j].skills || {});
    const matchCount = skillsA.filter(skill => skillsB.includes(skill)).length;

    if (matchCount >= 2) {
        links.push({ source: nodes[i].id, target: nodes[j].id, value: matchCount });
    }
    }
}

return links;
};
