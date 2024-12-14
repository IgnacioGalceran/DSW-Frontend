import { useState, useEffect, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortUp,
  faSortDown,
  faTrash,
  faArrowDownZA,
  faArrowDownAZ,
} from "@fortawesome/free-solid-svg-icons";

import styles from "../../src/app/page.module.css";

import SortButton from "./SortButton";

export const Filter = (props: {
  data: any;
  onFilteredData: (filteredData: any[]) => void;
}) => {
  const { data, onFilteredData } = props;
  const [search, setSearch] = useState<string>("");

  const filteredData = useMemo(() => {
    return data.filter((item: any) => {
      const nombre = item.usuario?.nombre || item.nombre || "";
      return nombre.toLowerCase().includes(search.toLowerCase());
    });
  }, [data, search]);

  const handleSortedData = (sortedData: any[]) => {
    onFilteredData(sortedData);
  };

  return (
    <div className={`${styles.containerfilter}  p-4`}>
      <input
        type="text"
        placeholder="Buscar..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded-md"
      />

      <SortButton data={filteredData} onSortedData={handleSortedData} />
    </div>
  );
};
