import React from 'react';

const ListCard = ({ node }) => {
  if (!node) return null;

  const fullName = node.fullName || 'Unknown';
  const [firstName, ...rest] = fullName.split(' ');
  const lastName = rest.join(' ');
  const year = node.year;
  const website = node.website || '';
  const borderColor = node.color || '#555';

  return (
    <div
      className="w-[420px] p-4 bg-[#161616] border-l-[3px] inline-flex flex-col justify-center items-start"
      style={{ borderColor }}
    >
      <div className="self-stretch inline-flex justify-start items-center">
        <div className="flex-1 justify-start text-[#c9c9c9] text-sm font-light font-['Space_Grotesk']">
          {firstName} {lastName}
        </div>
        <div className="justify-start text-[#868686] text-sm font-light font-['Space_Grotesk']">
          {year}
        </div>
      </div>
      <div className="self-stretch inline-flex justify-start items-center">
        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-[#868686] text-sm font-light font-['Space_Grotesk'] underline truncate"
        >
          {website}
        </a>
      </div>
    </div>
  );
};

export default ListCard;
