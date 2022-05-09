import { getAnimesInfo } from "../../utils/getAnimesInfo";
import CardsContainer from "./AnimeCard/CardsContainer";
import { useListFilter } from "../../hooks/useListFilter";
import { StatArray, AnimeStats } from "../../interfaces/stats";
import FilterContainer from "../stats/Filters/Container";
import { FilterContext } from "../../contexts/FilterContext";

type Props = {
  data: StatArray;
  allStats: AnimeStats;
};

export default function StatsSectionLoaded({ data, allStats }: Props) {
  const animesInfos = getAnimesInfo(data.animes, allStats.animes);

  const filtersContext = useListFilter(animesInfos);

  return (
    <>
      {/* <Link href={`/stats/${username}/anime/${stat}`}>
        <a>
          <Button size="sm" icon={faAngleLeft} text="Back" />
        </a>
      </Link> */}
      <div className="mb-3 w-full rounded-lg bg-gray-100 pt-3">
        <div className="mx-4 flex items-center justify-center font-bold">
          <span className="text-3xl">{data.name}</span>
        </div>
        <div className="mx-4 flex py-2 text-center">
          <span className="w-1/3">
            <strong>{data.count}</strong>
            <br /> Animes
          </span>
          <span className="w-1/3">
            <strong>{data.time_watched}</strong>
            <br /> Watched
          </span>
          <span className="w-1/3">
            <strong>{data.mean_score}</strong>
            <br /> Average Score
          </span>
        </div>
      </div>
      <FilterContext.Provider value={filtersContext}>
        <FilterContainer stats={allStats} />
      </FilterContext.Provider>
      <CardsContainer data={filtersContext.filteredList} />
    </>
  );
}
