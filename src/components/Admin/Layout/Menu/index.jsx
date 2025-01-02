import { useEffect, useState } from "react";
import { logo } from "../../../../constant/images/index";

import { tabs as myTabs } from "./data";
import Tab from "./Tab";
import { useSearchParams } from "react-router-dom";

const Menu = ({toggleSidebar, isSidebarOpen}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tabs, setTabs] = useState(myTabs);
  const view = searchParams.get("view");
  const thisTab = searchParams.get("tab");
  const action = searchParams.get("action");

  const handleTabs = (tab) => {
    const modifiedTabs = tabs.map((t) =>
      t.name === tab.name ? { ...t, active: true } : { ...t, active: false }
    );

    setSearchParams({ view: tab.path });
    if (thisTab) {
      setSearchParams({ view: tab.path, tab: thisTab });
    }
    setTabs(modifiedTabs);
  };

  const handleAction = (action) => {
    setSearchParams({ action });
  };

  const renderTabs = () => {
    return tabs.map((tab) => (
      <Tab click={handleTabs} key={tab.name} {...tab} />
    ));
  };

  useEffect(() => {
    if (view) {
      const tab = tabs.find((t) => t.path === view);
      if (tab) {
        handleTabs(tab);
      }
    } else if (action) {
      handleAction(action);
    } else {
      handleTabs(tabs[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className=" font-Roobert ChangeFontSpacing">
      <div className="h-auto min-h-[60px] sm:h-[10%] mb-4 sm:mb-0 flex">
        <img src={logo} alt="logo" className="h-full" />
      </div>
      <div className="flex-grow flex flex-col justify-start sm:justify-center gap-y-3 py-4">
        <div className="space-y-2 sm:space-y-3">{renderTabs()}</div>
      </div>
    </div>
  );
};

export default Menu;
