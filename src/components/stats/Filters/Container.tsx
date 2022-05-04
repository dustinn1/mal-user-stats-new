import { useContext } from "react";
import { FilterContext } from "../../../contexts/FilterContext";
import Button from "../../Button";
import {
  faAngleLeft,
  faArrowDown91,
  faArrowDownAZ,
  faCalendar,
  faFilter,
  faTv,
} from "@fortawesome/free-solid-svg-icons";
import FilterSelect from "./FilterSelect";
import Input from "../../Input";
import { AnimeStats } from "../../../interfaces/stats";
import FilterRange from "./FilterRange";
import FilterTags from "./FilterTags";
import { Disclosure, Transition } from "@headlessui/react";

type Props = {
  stats: AnimeStats;
};

export default function FilterContainer({ stats }: Props) {
  const filter = useContext(FilterContext);

  return (
    <Disclosure>
      {({ open }) => (
        <>
          <div className="mb-3 flex justify-between">
            <div className="flex w-1/3">
              <div className="grow">
                <Input />
              </div>
              <Disclosure.Button>
                <Button
                  size="sm"
                  icon={faFilter}
                  text="Filters"
                  dropdown
                  active={open}
                />
              </Disclosure.Button>
            </div>
            <div>
              <Button
                //onClick={() => setSort("count")}
                size="sm"
                icon={faArrowDownAZ}
                text="Title"
                //active={sort === "count"}
              />
              <Button
                //onClick={() => setSort("count")}
                size="sm"
                icon={faArrowDown91}
                text="Score"
                //active={sort === "count"}
              />
              <Button
                //onClick={() => setSort("count")}
                size="sm"
                icon={faCalendar}
                text="Release Year"
                //active={sort === "count"}
              />
              <Button
                //onClick={() => setSort("count")}
                size="sm"
                icon={faCalendar}
                text="Watch Year"
                //active={sort === "count"}
              />
              <Button
                //onClick={() => setSort("count")}
                size="sm"
                icon={faTv}
                text="Episode Count"
                //active={sort === "count"}
              />
            </div>
          </div>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-100 opacity-0"
            enterTo="transform opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-100 opacity-0"
          >
            <Disclosure.Panel className="mb-4 grid grid-cols-4 gap-4 rounded-md bg-gray-200 p-5">
              <FilterSelect data={stats.genres} name="genres" />
              <FilterSelect data={stats.studios} name="studios" />
              <FilterSelect data={stats.statuses} name="status" />
              <FilterSelect data={stats.formats} name="format" />
              <FilterRange name="score" data={stats.scores} />
              <FilterRange name="release_year" data={stats.release_years} />
              <FilterRange name="watch_year" data={stats.watch_years} />
            </Disclosure.Panel>
          </Transition>
          {filter.filters.length > 0 && <FilterTags />}
        </>
      )}
    </Disclosure>
  );
}
