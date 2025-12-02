import Link from "next/link";
import { Property } from "@/types/property";

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <Link
      href={`/properties/${property.id}`}
      className="block no-underline text-inherit group"
    >
      <article className="bg-slate-50 rounded-2xl shadow-lg overflow-hidden flex flex-col transition transform group-hover:-translate-y-1 group-hover:shadow-xl">
        <div
          className="h-52 bg-cover bg-center"
          style={{ backgroundImage: `url(${property.thumbImageUrl})` }}
        />

        <div className="px-5 pt-4 pb-5">
          <p className="text-xs uppercase tracking-[0.12em] text-gray-500 mb-1">
            {property.neighborhood}
          </p>

          <h2 className="text-lg font-semibold text-gray-900 mb-1">
            {property.propertyName}
          </h2>

          <p className="text-sm text-gray-500 mb-2.5">
            {property.street}, {property.city}
          </p>

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
      </article>
    </Link>
  );
}
