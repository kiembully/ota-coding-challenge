import React from 'react'
import { Company } from "@/types/types";

interface CompanyListProps {
  companies: Company[];
  selectedCompanies: Set<number>;
  toggleSelect: (id: number) => void;
}

const CompanyList: React.FC<CompanyListProps> = ({
  companies,
  selectedCompanies,
  toggleSelect,
}) => {
  return (
    <div className="mb-4">
      {companies.map((company) => (
        <div key={company.id} className="py-2 flex items-center gap-4 mb-10">
          <div
            onClick={() => toggleSelect(company.id)}
            className={`w-6 h-6 flex items-center justify-center border-2 rounded-md cursor-pointer transition-colors ${
              selectedCompanies.has(company.id)
                ? "bg-blue-600 border-blue-600"
                : "bg-white border-gray-300"
            }`}
          >
            {selectedCompanies.has(company.id) && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 12l5 5l10 -10" />
              </svg>
            )}
          </div>

          <span>{company.name}</span>
        </div>
      ))}
    </div>
  );
};

export default CompanyList;
