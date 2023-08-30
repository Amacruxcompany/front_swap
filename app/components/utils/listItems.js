const ListItems = ({ items }) => {
  return (
    <div className="text-center">
      <div className="w-full flex justify-between py-2 border-b-2 border-sweet">
        <span className="w-4/12">{items.ammount}</span>
        <span className="w-4/12">{items.currency}</span>
        <span className="w-4/12">
          {items.date.slice(0, items.date.indexOf("T"))}
        </span>
      </div>
    </div>
  );
};

export default ListItems;
