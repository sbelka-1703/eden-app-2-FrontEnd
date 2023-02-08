export const GraphMenu = ({
  items,
  checkedItems,
  handleCheckboxChange,
  data2,
  setCheckedItems,
  graph,
}: any) => {
  return (
    <div>
      <h1>asfd</h1>
      <div className="fixed bottom-0 right-0 p-10">
        {/* <div className="absolute right-2 bottom-0 flex flex-col"> */}
        {items.map((item: any, idx: number) => (
          <div key={item.id} className="mb-2 flex items-center justify-end">
            <div className={`ml-2 text-${item.colorsa}-500`}>{item.name}</div>
            <button
              className="ml-2"
              style={{
                backgroundColor: checkedItems[idx].checked
                  ? item.fill
                  : item.fill,
                color: "black",
                fontSize: "small",
                padding: "5px 12px",
                borderRadius: "200px",
                // border: item.stroke,
                border: checkedItems[idx].checked
                  ? `2px solid ${item.stroke}`
                  : `2px solid ${item.stroke}`,
                cursor: "pointer",
                width: "fit-content",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() =>
                handleCheckboxChange(
                  idx,
                  data2,
                  checkedItems,
                  setCheckedItems,
                  graph
                )
              }
              value={idx}
            >
              {checkedItems[idx].checked ? (
                // {checkedItems[idx].checked ? (
                <span>&#10003;</span>
              ) : (
                <span style={{ color: item.fill }}>N</span>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GraphMenu;
