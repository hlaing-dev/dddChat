import { useState, useEffect } from "react";

const SettingFirst = ({ darkmode }: any) => {
  // Retrieve initial settings from localStorage or set defaults
  const initialSettings = JSON.parse(
    localStorage.getItem("movieAppSettings") || "{}"
  );

  const [filterToggle, setFilterToggle] = useState(
    initialSettings.filterToggle || false
  ); // Teen Mode
  const [pipMode, setPipMode] = useState(initialSettings.pipMode || false); // Picture-in-Picture Mode
  const [vibrantMode, setVibrantMode] = useState(
    initialSettings.vibrantMode || false
  ); // Vibrant Mode

  // Save the settings to localStorage whenever they change
  useEffect(() => {
    const settings = {
      filterToggle,
      pipMode,
      vibrantMode,
    };
    localStorage.setItem("movieAppSettings", JSON.stringify(settings));
  }, [filterToggle, pipMode, vibrantMode]);

  const handleFilter = () => {
    setFilterToggle((prev: any) => !prev);
    localStorage.removeItem("headerTopics");
  };

  return (
    <div className="profile-div">
      <div
        className={` w-full ${
          darkmode ? "profile-div-main_dark" : "profile-div-main"
        }`}
      >
        {/* Teen Mode */}
        <div className="p-first">
          <div className="flex gap-1 max-w-[230px] flex-col ">
            <h1 className={`${darkmode ? " text-white" : "text-black"}`}>
              青少年模式
            </h1>
            <p className={`settings-text ${darkmode ? "text-white" : "text-black"}`}>开启后不再展示R18内容 </p>
          </div>
          <div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filterToggle}
                onChange={handleFilter}
                className="sr-only peer"
              />
              <div
                className={`w-9 h-5 bg-[#606060] hover:bg-[#606060] peer-focus:outline-0 peer-focus:ring-transparent rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all ${
                  filterToggle
                    ? "peer-checked:bg-[#fe58b5] hover:peer-checked:bg-[#fe58b5]"
                    : "peer-checked:bg-[#606060]"
                }`}
              ></div>
            </label>
          </div>
        </div>

        {/* Picture-in-Picture Mode */}
        <div className="p-first">
          <div className="flex gap-1 max-w-[230px] flex-col ">
            <h1 className={`${darkmode ? " text-white" : "text-black"}`}>
              自动画中画
            </h1>
            <p className={`settings-text ${darkmode ? "text-white" : "text-black"}`}>开启后打开自动画中画模式</p>
          </div>
          <div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={pipMode}
                onChange={() => setPipMode((prev: any) => !prev)}
                className="sr-only peer"
              />
              <div
                className={`w-9 h-5 bg-[#606060] hover:bg-[#606060] peer-focus:outline-0 peer-focus:ring-transparent rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all ${
                  pipMode
                    ? "peer-checked:bg-[#fe58b5] hover:peer-checked:bg-[#fe58b5]"
                    : "peer-checked:bg-[#606060]"
                }`}
              ></div>
            </label>
          </div>
        </div>

        {/* Vibrant Mode */}
        <div className="p-first">
          <div className="flex gap-1 max-w-[230px] flex-col ">
            <h1 className={`${darkmode ? " text-white" : "text-black"}`}>
              无痕模式
            </h1>
            <p className={`settings-text ${darkmode ? "text-white" : "text-black"}`}>开启后您的浏览不会被记录</p>
          </div>
          <div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={vibrantMode}
                onChange={() => setVibrantMode((prev: any) => !prev)}
                className="sr-only peer"
              />
              <div
                className={`w-9 h-5 bg-[#606060] hover:bg-[#606060] peer-focus:outline-0 peer-focus:ring-transparent rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all ${
                  vibrantMode
                    ? "peer-checked:bg-[#fe58b5] hover:peer-checked:bg-[#fe58b5]"
                    : "peer-checked:bg-[#606060]"
                }`}
              ></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingFirst;
