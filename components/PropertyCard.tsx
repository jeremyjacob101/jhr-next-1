import Link from "next/link";
import Image from "next/image";
import { Property } from "@/types/property";

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <Link
      href={`/properties/${property.id}`}
      className="block h-full no-underline text-inherit group"
    >
      <article className="bg-slate-50 rounded-2xl shadow-lg overflow-hidden flex flex-col h-full transition transform group-hover:-translate-y-1 group-hover:shadow-xl">
        <div className="relative h-52 w-full">
          <Image
            src={property.thumbImageUrl}
            alt={property.propertyName}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover object-center"
          />
        </div>

        <div className="px-5 pt-4 pb-5 flex flex-col flex-1">
          <p className="text-xs uppercase tracking-[0.12em] text-gray-500 mb-1">
            {property.neighborhood}
          </p>

          <div className="mb-1 min-h-13 flex items-center">
            <h2 className="text-lg font-semibold text-gray-900 leading-snug overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
              {property.propertyName}
            </h2>
          </div>

          <p className="text-sm text-gray-500 mb-2.5 truncate">
            {property.street}, {property.city}
          </p>

          <div className="mt-auto">
            <p className="text-lg font-bold text-emerald-700 mb-2.5">
              ₪{property.priceNIS.toLocaleString("he-IL")}
            </p>

            <div className="flex gap-3 text-sm text-gray-700 mb-2">
              <span>{property.beds} beds</span>
              <span>{property.baths} baths</span>
              <span>{property.indoorSqm} m²</span>
            </div>

            <p className="text-xs text-gray-500">
              Listed by {property.brokerName}
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
}
