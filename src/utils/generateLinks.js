export const generateLinks = (nodes) => {
const links = [];

for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
    const skillsA = Object.values(nodes[i].skills || {});
    const skillsB = Object.values(nodes[j].skills || {});
    let matchCount = skillsA.filter(skill => skillsB.includes(skill)).length;

    if (nodes[i].year === nodes[j].year) {
        matchCount += 1; // Add 1 for year match
    }

    if (matchCount >= 1) {
        links.push({ source: nodes[i].id, target: nodes[j].id, value: matchCount });
    }
    }
}

return links;
};
