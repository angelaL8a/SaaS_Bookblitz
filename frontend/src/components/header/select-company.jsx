import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useGetCurrentCompany } from "@/store/company-store";
import { useGetCompany } from "@/hooks/use-company";
import { useNavigate } from "react-router-dom";

const SelectCompany = () => {
  const navigate = useNavigate();

  const { data } = useAuth();
  const { data: company } = useGetCompany();
  const { currentCompany, setCurrentCompany } = useGetCurrentCompany();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(company?.id);

  useEffect(() => {
    if (data?.companies.length > 0 && !currentCompany) {
      setCurrentCompany(data.companies[0]);
    }
  }, [data, currentCompany, setCurrentCompany]);

  if (!data) return;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between rounded-[8px] h-10 font-semibold font-poppins"
        >
          {value
            ? data.companies.find((company) => company.id === value)?.name
            : "Select company..."}
          <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search company..." />
          <CommandEmpty>No company found.</CommandEmpty>

          <CommandGroup>
            {data.companies.map((company) => (
              <CommandItem
                key={company.id}
                value={company.id}
                onSelect={(currentValue) => {
                  setCurrentCompany(company);
                  setValue(currentValue);
                  setOpen(false);

                  navigate(`/app/${company.url}/${company.role.toLowerCase()}`);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === company.id ? "opacity-100" : "opacity-0"
                  )}
                />
                {company.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SelectCompany;
