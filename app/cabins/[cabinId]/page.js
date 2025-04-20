import { getCabin, getCabins } from "@/app/_lib/data-service";
import Reservation from "@/app/_components/Reservation";
import { Suspense } from "react";
import Spinner from "@/app/_components/Spinner";
import CabinContainer from "@/app/_components/CabinContainer";

export const revalidate = 10;

export async function generateMetadata({ params }, parent) {
  const { name } = await getCabin(params.cabinId);

  return {
    title: `Cabin ${name} / Welcome The Wild Oasis`,
  };
}

export async function generateStaticParams() {
  const cabins = await getCabins();
  const ids = cabins.map((cabin) => {
    return { cabinId: String(cabin.id) };
  });

  return ids;
}

export default async function Page({ params }) {
  const { cabinId } = params;

  const cabin = await getCabin(cabinId);

  return (
    <>
      <div className="max-w-6xl mx-auto mt-8">
        <CabinContainer cabin={cabin} />
        <div>
          <h2 className="text-5xl font-semibold text-center text-accent-400 mb-10 ">
            Reserve {cabin.name} today. Pay on arrival.
          </h2>
          <Suspense fallback={<Spinner />} key={cabinId}>
            <Reservation cabin={cabin} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
