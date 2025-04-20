// import { unstable_noStore as noStore } from "next/cache";
import { getCabins } from "../_lib/data-service";
import CabinCard from "../cabins/CabinCard";

async function CabinList({ filter }) {
  // noStore();

  const cabins = await getCabins();

  let displayedCabins;
  if (filter === "all") {
    displayedCabins = cabins;
  }

  if (filter === "small") {
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
  }
  if (filter === "medium") {
    displayedCabins = cabins.filter(
      (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7
    );
  }
  if (filter === "large") {
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);
  }

  if (!cabins.length) return null;
  return (
    <div className="grid grid-cols-2 gap-12">
      {displayedCabins.map((cabin) => {
        return <CabinCard key={cabin.id} cabin={cabin} />;
      })}
    </div>
  );
}

export default CabinList;
