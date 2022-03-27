import { useMemo, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import type { Anime } from "../../interfaces/stats";
import stats from "../../data/mock/animeStats.json";
import intervalToDuration from "date-fns/intervalToDuration";
import formatDuration from "date-fns/formatDuration";
import { getAnimesInfo } from "../../utils/getAnimesInfo";
import { useVirtual } from "react-virtual";

type Props = {
  name: string;
  sort: "count" | "time_watched" | "mean_score";
  rank: number;
  amount: number;
  average: number;
  time: string;
  animes: number[];
};

const allAnimes: Anime[] = stats.animes;

export default function StatCard({
  name,
  sort,
  rank,
  amount,
  average,
  time,
  animes,
}: Props) {
  const router = useRouter();
  const { username, stat } = router.query;

  const listParentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtual({
    horizontal: true,
    size: animes.length,
    parentRef: listParentRef,
    estimateSize: useCallback(() => 90, []),
    overscan: 3,
    paddingStart: 16,
    paddingEnd: 16,
  });

  const CoversList = useMemo(() => {
    const animesInfo = getAnimesInfo(animes, allAnimes);
    return (
      <div
        style={{
          width: `${rowVirtualizer.totalSize}px`,
          height: "120px",
          position: "relative",
        }}
      >
        {rowVirtualizer.virtualItems.map((virtualRow) => (
          <div
            key={virtualRow.index}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: `${virtualRow.size}px`,
              transform: `translateX(${virtualRow.start}px)`,
            }}
          >
            <Image
              src={`https://cdn.myanimelist.net/images/anime/${
                animesInfo[virtualRow.index].image_url_id
              }l.webp`}
              alt="image"
              height={"120"}
              width={"85"}
              objectFit="cover"
              className="rounded-md"
            />
          </div>
        ))}
      </div>
    );
  }, [animes, rowVirtualizer.totalSize, rowVirtualizer.virtualItems]);

  return (
    <div
      className="mb-4 w-full rounded-lg bg-gray-100 pt-3"
      id={`card-${name}`}
    >
      <div className="mx-4 flex items-center font-bold">
        <div className="mr-2 rounded-lg bg-gray-700 px-3 py-1 text-center text-white">
          # {rank}
        </div>
        <Link
          href={`/stats/${username}/anime/${stat}/${name
            .toLowerCase()
            .replaceAll(" ", "_")}`}
        >
          <a className="text-3xl text-blue-500 hover:text-blue-600 hover:underline">
            {name}
          </a>
        </Link>
      </div>
      <div className="overflow-auto py-3" ref={listParentRef}>
        {CoversList}
      </div>
      <div className="mx-4 mb-3 flex justify-around text-center">
        <span className={sort === "count" ? "border-b-2 border-black" : ""}>
          <strong>{amount}</strong> Animes
        </span>
        <span
          className={sort === "time_watched" ? "border-b-2 border-black" : ""}
        >
          <strong>
            {parseInt(time) > 0
              ? formatDuration(
                  intervalToDuration({
                    start: 0,
                    end: parseInt(time) * 1000,
                  })
                )
              : "No time"}
          </strong>{" "}
          Watched
        </span>
        <span
          className={sort === "mean_score" ? "border-b-2 border-black" : ""}
        >
          <strong>{average}</strong> Average Score
        </span>
      </div>
    </div>
  );
}
