"use client";

import { useState, useEffect } from "react";

export interface InspectionDetailsData {
  inspectorName: string;
  companyName: string;
  companyAddress: string;
  clientName: string;
  propertyAddress: string;
  date: string;
}

interface InspectionDetailsProps {
  details: InspectionDetailsData;
  onChange: (details: InspectionDetailsData) => void;
}

export function InspectionDetails({ details, onChange }: InspectionDetailsProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ ...details, [name]: value });
  };

  const inputClasses = "w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border text-slate-900 bg-white placeholder:text-slate-400";

  return (
    <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
        <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">1</span>
        Inspection Details
      </h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="inspectorName" className="block text-sm font-medium text-slate-700 mb-1">
            Inspector Name
          </label>
          <input
            type="text"
            id="inspectorName"
            name="inspectorName"
            value={details.inspectorName}
            onChange={handleChange}
            className={inputClasses}
            placeholder="John Doe"
          />
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-slate-700 mb-1">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={details.date}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-slate-700 mb-1">
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={details.companyName}
            onChange={handleChange}
            className={inputClasses}
            placeholder="Acme Inspections LLC"
          />
        </div>
        <div>
          <label htmlFor="companyAddress" className="block text-sm font-medium text-slate-700 mb-1">
            Company Address / Contact
          </label>
          <input
            type="text"
            id="companyAddress"
            name="companyAddress"
            value={details.companyAddress}
            onChange={handleChange}
            className={inputClasses}
            placeholder="123 Main St, Springfield"
          />
        </div>
        <div>
          <label htmlFor="clientName" className="block text-sm font-medium text-slate-700 mb-1">
            Client Name
          </label>
          <input
            type="text"
            id="clientName"
            name="clientName"
            value={details.clientName}
            onChange={handleChange}
            className={inputClasses}
            placeholder="Jane Smith"
          />
        </div>
        <div>
          <label htmlFor="propertyAddress" className="block text-sm font-medium text-slate-700 mb-1">
            Property Address
          </label>
          <input
            type="text"
            id="propertyAddress"
            name="propertyAddress"
            value={details.propertyAddress}
            onChange={handleChange}
            className={inputClasses}
            placeholder="456 Oak Lane"
          />
        </div>
      </div>
    </section>
  );
}
