"use client";

export interface Stat {
  label: string;
  value: string;
  change: string;
  icon: React.ElementType;
  color: string;
}

export default function StatsGrid({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 mb-3">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="card sm:px-1 sm:py-1 px-2 py-4">
            <div className="flex items-center">
            
              <div className="ml-4">
                <p className="text-md md:text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs md:text-sm text-gray-600">{stat.label}</p>
                <p
                  className={`text-xs font-medium ${
                    stat.change.startsWith("+")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {stat.change} from last month
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
