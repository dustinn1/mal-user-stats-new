import { useState, Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Menu, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tab from "../Tab";
import { statsTabs } from "../../data/statsTabs";
import { classNames } from "../../utils/classNames";
import { useWindowWidth } from "@react-hook/window-size/throttled";
import LoadingIndicator from "../LoadingIndicator";

export default function Tabs() {
  const router = useRouter();
  const { username, type } = router.query;
  const [currentCategory, setCurrentCategory] = useState(type);

  const currentCategoryTab = statsTabs.find(
    (tab) => tab.name.toLowerCase() === currentCategory
  )!;
  const width = useWindowWidth();

  if (currentCategoryTab === undefined) {
    return <LoadingIndicator />;
  }

  return (
    <div className="grid grid-cols-2 gap-3 px-3 lg:flex xl:px-0">
      <Menu as="div" className="relative inline-block">
        <Menu.Button className="w-full">
          <Tab
            name={currentCategoryTab.name}
            icon={currentCategoryTab.icon}
            dropdown
          />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute left-0 z-50 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800">
            <div className="px-0.5">
              {statsTabs.map((tab) => (
                <Menu.Item key={tab.name.toLowerCase()}>
                  {({ active }) => (
                    <button
                      className={classNames(
                        "my-0.5 flex w-full items-center rounded-md px-3 py-2",
                        active ||
                          currentCategory ===
                            tab.name.toLowerCase().replaceAll(" ", "_")
                          ? "bg-gray-700 text-white dark:bg-gray-600"
                          : "text-gray-900 dark:text-gray-100"
                      )}
                      onClick={() =>
                        setCurrentCategory(
                          tab.name.toLowerCase() as "anime" | "manga"
                        )
                      }
                    >
                      <FontAwesomeIcon icon={tab.icon} className="mr-3 w-6" />
                      {tab.name}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      {width >= 1024 ? (
        <div className="auto-cols-max grid-flow-col gap-2.5 overflow-x-scroll lg:grid">
          {currentCategoryTab.tabs.map((tab) => (
            <Link
              href={`/stats/${username}/${currentCategory}/${tab
                .toLowerCase()
                .replaceAll(" ", "_")}`}
              key={tab}
            >
              <a>
                <Tab
                  name={tab}
                  active={
                    router.asPath.split("/")[3] === currentCategory &&
                    router.asPath.split("/")[4] ===
                      tab.toLowerCase().replaceAll(" ", "_")
                  }
                />
              </a>
            </Link>
          ))}
        </div>
      ) : (
        <Menu as="div" className="relative inline-block">
          <Menu.Button className="w-full capitalize">
            <Tab
              name={router.asPath.split("/")[4].replaceAll("_", " ")}
              dropdown
            />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute left-0 z-50 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800">
              <div className="px-0.5">
                {currentCategoryTab.tabs.map((tab) => (
                  <Link
                    href={`/stats/${username}/${currentCategory}/${tab
                      .toLowerCase()
                      .replaceAll(" ", "_")}`}
                    key={tab}
                  >
                    <a>
                      <Menu.Item key={tab.toLowerCase()}>
                        {({ active }) => (
                          <button
                            className={classNames(
                              "my-0.5 flex w-full items-center truncate rounded-md px-3 py-2",
                              active ||
                                router.asPath.split("/")[4] ===
                                  tab.toLowerCase().replaceAll(" ", "_")
                                ? "bg-gray-700 text-white dark:bg-gray-600"
                                : "text-gray-900 dark:text-gray-100"
                            )}
                          >
                            {tab}
                          </button>
                        )}
                      </Menu.Item>
                    </a>
                  </Link>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      )}
    </div>
  );
}
