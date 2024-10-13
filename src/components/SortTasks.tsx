import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { TTask } from "@/types";

type TProps = {
  sortField: keyof TTask;
  sortDirection: "asc" | "desc";
  setSortDirection: (value: "asc" | "desc") => void;
  setSortField: (value: keyof TTask) => void;
  handleSort: (value: keyof TTask) => void;
  filterStatus: string;
  setFilterStatus: (value: string) => void;
};

const SortTasks = ({
  sortField,
  sortDirection,
  setSortDirection,
  filterStatus,
  setFilterStatus,
  handleSort,
}: TProps) => {
  return (
    <>
      {/* Sorting */}
      <Select
        value={sortField}
        onValueChange={(value) => handleSort(value as keyof TTask)}
      >
        <SelectTrigger className="w-[180px] ">
          <SelectValue placeholder="Sort by Field" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectLabel> Sort by Field</SelectLabel>
            <SelectItem value="title">Title</SelectItem>
            <SelectItem value="status">Status</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        value={sortDirection}
        onValueChange={(value) => setSortDirection(value as "asc" | "desc")}
      >
        <SelectTrigger className="w-[180px] ">
          <SelectValue placeholder="Sort Direction" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sort Direction</SelectLabel>
            <SelectItem value="asc">Ascending</SelectItem>
            <SelectItem value="desc">Descending</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      Filtering
      <Select
        value={filterStatus}
        onValueChange={(value) => setFilterStatus(value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="not-started">Not Started</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="finished">Finished</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};

export default SortTasks;
