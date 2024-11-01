"use client";

import { ChangeEvent } from "react";
import { Search, Filter } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "./ui/input";

import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ActifRegisterDoctor } from "@/types";
import Image from "next/image";

const ScheduleSearch = ({ doctors }: { doctors: ActifRegisterDoctor[] }) => {
  // console.log(doctors);
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const handleSearchChange = useDebouncedCallback((searchTerm: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (searchTerm) {
      params.set("patient", searchTerm);
    } else {
      params.delete("patient");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 600);

  const handleStatusChange = (status: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (status) {
      params.set("status", status);
    } else {
      params.delete("status");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleDoctorChange = (docteur: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (docteur) {
      params.set("doctor", docteur);
    } else {
      params.delete("doctor");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleCancelFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (params.get("doctor")) {
      params.delete("doctor");
    }
    if (params.get("status")) {
      params.delete("status");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const checkIsSearchParamsData =
    searchParams.get("status") ||
    searchParams.get("startDate") ||
    searchParams.get("endDate");

  return (
    <div className="relative w-full flex items-center gap-4 max-w-sm">
      <Input
        placeholder="Rechercher un rendez-vous..."
        id="searchInput"
        // value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleSearchChange(e.target.value)
        }
        defaultValue={searchParams.get("patient")?.toString()}
        className="w-full pl-8 max-w-80 placeholder:text-white/50 border-dark-500 bg-dark-400 text-14-regular"
      />
      <Search
        className="absolute text-dark-500 top-[24%] left-[2%]"
        size={22}
      />
      <Popover>
        <PopoverTrigger asChild>
          <button className="bg-dark-400 p-2.5 rounded-[10px]">
            <Filter size={22} className="text-white/50" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-80 bg-dark-300 border-dark-500 p-4 rounded-lg">
          <div className="flex flex-col space-y-4">
            {/* Status Filter */}
            <div className="w-full">
              <Label htmlFor="doctorName" className="text-white/80 mb-2">
                Filtrer par Status
              </Label>
              <Select onValueChange={handleStatusChange}>
                <SelectTrigger className="shad-select-trigger">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="shad-select-content">
                  <SelectGroup>
                    <SelectItem value="pending">
                      <div className="flex cursor-pointer items-center gap-2 transition-colors hover:bg-dark-400">
                        <p>En attente</p>
                      </div>
                    </SelectItem>
                    <SelectItem value="scheduled">
                      <div className="flex cursor-pointer items-center gap-2 transition-colors hover:bg-dark-400">
                        <p>Programmé</p>
                      </div>
                    </SelectItem>
                    <SelectItem value="cancelled">
                      <div className="flex cursor-pointer items-center gap-2 transition-colors hover:bg-dark-400">
                        <p>Annulé</p>
                      </div>
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Doctor Name Filter */}
            <div className="w-full">
              <Label htmlFor="doctorName" className="text-white/80 mb-2">
                Filtrer par Docteur
              </Label>
              <Select onValueChange={handleDoctorChange}>
                <SelectTrigger className="shad-select-trigger">
                  <SelectValue placeholder="Docteurs" />
                </SelectTrigger>
                <SelectContent className="shad-select-content">
                  <SelectGroup>
                    {doctors?.map((doctor, i) => (
                      <SelectItem key={doctor.name + i} value={doctor.name}>
                        <div className="flex cursor-pointer items-center gap-2 transition-colors hover:bg-dark-400">
                          <Image
                            src={doctor.profile}
                            width={32}
                            height={32}
                            alt="doctor"
                            className="rounded-full border border-dark-500"
                          />
                          <p>{doctor.name}</p>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {checkIsSearchParamsData && (
              <button
                className="w-full outline-none text-white/80 selft-center text-red-200 rounded p-2"
                onClick={handleCancelFilter}
              >
                Annuler les filtres
              </button>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ScheduleSearch;
