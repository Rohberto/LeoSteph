import List from "./List";
import AddProduct from "./../../../pages/Product/AddProduct";
import { useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import View from "../Misc/View";
import ViewTab from "../Misc/ViewTab";
import CategoryView from "./Category/list";
import { tabs as myTabs } from "./data";
import { Icon } from "@iconify/react/dist/iconify.js";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const view = searchParams.get("view");
  const tab = searchParams.get("tab");
  const [tabs, setTabs] = useState(myTabs);
  const [activeTab, setActiveTab] = useState(myTabs[0]);

  const handleTabs = useCallback(
    (tab) => {
      const modifiedTabs = tabs.map((t) =>
        t.name === tab.name ? { ...t, active: true } : { ...t, active: false }
      );
      setSearchParams({ view: "products", tab: tab.path });
      setTabs(modifiedTabs);
      setActiveTab(tab);
    },
    [setSearchParams, tabs]
  );

  const renderTabs = () => {
    return tabs.map((tab) => (
      <div
        key={tab.name}
        className={`flex cursor-pointer items-center gap-x-3 px-4 py-2 mb-2 rounded-md ${
          tab.active ? "bg-menu text-white" : "bg-transdashboard text-black"
        }`}
        onClick={() => handleTabs(tab)}
      >
        <div className="">
          <Icon icon={tab.icon} width={24} />
        </div>
        <div className="">{tab.name}</div>
      </div>
    ));
  };

  useEffect(() => {
    if (tab) {
      const thisTab = myTabs.find((t) => t.path === tab) || activeTab;
      handleTabs(thisTab);
    } else {
      setSearchParams({ view: "products", tab: "" });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, activeTab]);

  return (
    <View>
      <ViewTab>
        <div className="w-full bg-transparent mt-1 px-2 flex flex-col gap-y-2 font-Roobert changeFontSpacing">
          <div className="font-semibold text-3xl">Products</div>
          <div className="w-full flex flex-wrap flex-row items-center gap-x-4">
            {renderTabs()}
          </div>

          {view === "products" && (
            <div className="min-h-screen">
              {(tab === "list" || tab === "") && <List />}
              {tab === "add" && <AddProduct />}
              {tab === "categories" && <CategoryView />}
            </div>
          )}
        </div>
      </ViewTab>
    </View>
  );
};

export default Products;
