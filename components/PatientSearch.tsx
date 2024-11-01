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
import { IdentificationTypes } from "@/constants";

const PatientSearch = ({ doctors }: { doctors: ActifRegisterDoctor[] }) => {
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

  const handleGenderChange = (genre: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (genre) {
      params.set("genre", genre);
    } else {
      params.delete("genre");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleIdenticationTypeChange = (identicationType: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (identicationType) {
      params.set("identicationType", identicationType);
    } else {
      params.delete("identicationType");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleCancelFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (params.get("identicationType")) {
      params.delete("identicationType");
    }
    if (params.get("genre")) {
      params.delete("genre");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const checkIsSearchParamsData =
    searchParams.get("genre") ||
    searchParams.get("identicationType") ||
    searchParams.get("patient");

  return (
    <div className="relative w-full flex items-center gap-4 max-w-sm">
      <Input
        placeholder="Rechercher un patient..."
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
                Filtrer par genre
              </Label>
              <Select onValueChange={handleGenderChange}>
                <SelectTrigger className="shad-select-trigger">
                  <SelectValue placeholder="Genre" />
                </SelectTrigger>
                <SelectContent className="shad-select-content">
                  <SelectGroup>
                    <SelectItem value="homme">
                      <div className="flex cursor-pointer items-center gap-2 transition-colors hover:bg-dark-400">
                        <p>Homme</p>
                      </div>
                    </SelectItem>
                    <SelectItem value="femme">
                      <div className="flex cursor-pointer items-center gap-2 transition-colors hover:bg-dark-400">
                        <p>Femme</p>
                      </div>
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Doctor Name Filter */}
            <div className="w-full">
              <Label htmlFor="doctorName" className="text-white/80 mb-2">
                Filtrer par document d'identification
              </Label>
              <Select onValueChange={handleIdenticationTypeChange}>
                <SelectTrigger className="shad-select-trigger">
                  <SelectValue placeholder="Type d'identification" />
                </SelectTrigger>
                <SelectContent className="shad-select-content">
                  <SelectGroup>
                    {IdentificationTypes.map((identication, i) => (
                      <SelectItem key={identication + i} value={identication}>
                        <div className="flex cursor-pointer items-center gap-2 transition-colors hover:bg-dark-400">
                          <p>{identication}</p>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {checkIsSearchParamsData && (
              <button
                className="w-full outline-none text-white/80 selft-center  text-red-200 rounded p-2"
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

export default PatientSearch;
