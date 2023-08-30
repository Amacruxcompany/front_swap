const ListSwaps = ({ items }) => {
  return (
    <div className="text-center">
      <div className="w-full flex justify-between py-2 border-b-2 border-sweet">
        <span className="w-3/12">{items.amountSend}</span>
        <span className="w-3/12">{items.currencySend}</span>
        <span className="w-3/12">{items.amountRecibe}</span>
        <span className="w-3/12">{items.currencyRecibe}</span>
      </div>
    </div>
  );
};

export default ListSwaps;
