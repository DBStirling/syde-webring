export const generateLinks = (nodes) => {
const links = [];

for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
    const interestsA = Object.values(nodes[i].interests || {});
    const interestsB = Object.values(nodes[j].interests || {});
    let matchCount = interestsA.filter(interest => interestsB.includes(interest)).length;

    if (nodes[i].year === nodes[j].year) {
        matchCount += 1; // Add 1 for year match
    }

    if (matchCount >= 1) {
        links.push({ source: nodes[i].id, target: nodes[j].id, value: matchCount });
    }
        // console.log(matchCount)
    }
}

return links;
};
