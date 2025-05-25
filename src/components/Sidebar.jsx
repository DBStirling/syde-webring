const Sidebar = ({ node }) => (
<div className="sidebar">
    <h2>{node.fullName}</h2>
    <p><strong>Year:</strong> {node.year}</p>
    <p><strong>Bio:</strong> {node.bio} </p>
    <p><strong>Skills:</strong></p>
    <ul>
    <li>{node.skills.primary}</li>
    <li>{node.skills.secondary}</li>
    <li>{node.skills.tertiary}</li>
    </ul>
    <a href={node.portfolio} target="_blank" rel="noreferrer">Portfolio</a>
</div>
);

export default Sidebar;
