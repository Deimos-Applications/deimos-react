import React from "react";

interface DeimosCardProps {
  src?: any;
  title?: string;
  body?: string;
}

const DeimosCard: React.FC<DeimosCardProps> = ({
  children,
  src,
  title,
  body,
}) => {
  return (
    <div className="max-w rounded overflow-hidden shadow-lg">
      {src && <img className="w-full" src={src} alt="" />}
      <div className="px-6 py-4">
        {title && <div className="font-bold text-xl mb-2">{title}</div>}
        {body && <p className="text-gray-700 text-base">{body}</p>}
      </div>
      <div className="px-6 py-4">{children}</div>
      {/* <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #photography
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #travel
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #winter
        </span>
      </div> */}
    </div>
  );
};

export default DeimosCard;
