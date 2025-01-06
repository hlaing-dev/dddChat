import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setHistoryData } from "../slice/HistorySlice";

const Rank = ({ data, index }: { data: any; index: number }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getColorByIndex = (idx: number) => {
    if (idx === 0) return "#FF0F00";
    if (idx === 1) return "#EFFF0B";
    if (idx === 2) return "#FF018F";
    return "#fff";
  };

  // linear-gradient(180deg, #FE8181 0%, #FF9F5E 46%)

  // // Alternate background for odd/even indices
  // const getBackgroundByIndex = (index: number) => {
  //   return index % 2 === 0
  //     ? "linear-gradient(180deg, #341b1b 0%, #1f1f22 46%)" // Red background for even indexes (1st, 3rd, etc.)
  //     : "linear-gradient(180deg, #1b2a34 0%, #1f1f22 46%)"; // Blue background for odd indexes (2nd, 4th, etc.)
  // };

  // Alternate background for odd/even indices
  const getBackgroundByIndex = (index: number) => {
    return index % 2 === 0
      ? "linear-gradient(180deg, #FE8181 0%, #FF9F5E 46%)" // Red background for even indexes (1st, 3rd, etc.)
      : "linear-gradient(180deg, #14527E 0%, #484875 46%)"; // Blue background for odd indexes (2nd, 4th, etc.)
  };

  const handleClick = (query: any) => {
    if (query.trim()) {
      dispatch(setHistoryData({ data: query.trim() }));
      navigate(`/search?query=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="rank" style={{ background: getBackgroundByIndex(index) }}>
      <h1 className="mb-3 text-white">{data?.title}</h1>
      {data?.list?.map((res: any, idx: any) => (
        <button
          key={idx}
          className="flex items-start gap-3 cursor-pointer"
          onClick={() => handleClick(res?.word)}
        >
          <span
            className={`number ${
              idx !== 1 && idx !== 2 && idx !== 0 && "opacity-60"
            }`}
            style={{ color: getColorByIndex(idx) }}
          >
            {idx + 1}
          </span>
          <span className="rank_word truncate">{res?.word}</span>
        </button>
      ))}
    </div>
  );
};

export default Rank;