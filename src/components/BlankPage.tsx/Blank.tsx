import React from "react";

interface BlankProps {
  title: string;
  description: string;
  imageSrc: string;
  listItems: string[];
}

const Blank: React.FC<BlankProps> = ({
  title,
  description,
  imageSrc,
  listItems,
}) => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 h-80 w-80 lg:h-[500px] lg:w-[500px] bg-gradient-to-br from-purple-400 to-blue-400 opacity-50 rounded-full transform translate-x-1/2 -translate-y-1/2 z-0"></div>
      <div className="absolute bottom-0 left-0 h-80 w-80 lg:h-[500px] lg:w-[500px] bg-gradient-to-tr from-pink-400 to-yellow-400 opacity-50 rounded-full transform -translate-x-1/2 translate-y-1/2 z-0"></div>
      <div className="w-full max-w-4xl p-8 bg-white shadow-md rounded-lg z-10">
        <div className="md:flex">
          <div className="md:w-1/2 p-4">
            <h1 className="text-3xl font-bold mt-4">{title}</h1>
            <p className="mt-4 text-gray-700">{description}</p>
            <ul className="mt-4 space-y-2 text-gray-700">
              {listItems.map((item, index) => (
                <li key={index}>✔️ {item}</li>
              ))}
            </ul>
            <div className="mt-6 flex space-x-4">
              <button className="py-2 px-4 bg-primary text-white rounded btn">
                Start now
              </button>
              <button className="py-2 px-4 bg-gray-200 text-gray-700 rounded btn">
                Learn more
              </button>
            </div>
          </div>
          <div className="md:w-1/2 p-4 flex justify-center items-center">
            {imageSrc && (
              <img
                src={imageSrc}
                alt=""
                className="w-full rounded-lg shadow-md"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blank;
