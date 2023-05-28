"use client";

const ListItemComponents = ({ data }) => {
  return (
    <div className="py-2 grid grid-cols-3 text-center items-center w-10/12 mx-auto">
      <div className="px-2  border-4 border-x-indigo-500 border-y-transparent text-white ">
        {" "}
        {data.currency}
      </div>
      <div className="  text-white "> {data.ammount}</div>
      <div className=" text-white px-2 border-4 border-x-indigo-500  border-y-transparent">
        {data.date.split("T")[0]}
      </div>
    </div>
  );
};

export default ListItemComponents;
