import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownAZ,
  faArrowDownZA,
  faArrowUpAZ,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useMemo, useState } from "react";

type SortButtonProps = {
  data: any[];
  onSortedData: (sortedData: any[]) => void;
};

const SortButton: React.FC<SortButtonProps> = ({ data, onSortedData }) => {
  const [isAscending, setIsAscending] = useState<boolean>(true);

  const toggleSort = () => {
    setIsAscending((prev) => !prev);
  };

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      const aValue = a.usuario?.nombre
        ? String(a.usuario.nombre)
        : String(a.nombre);
      const bValue = b.usuario?.nombre
        ? String(b.usuario.nombre)
        : String(b.nombre);

      return isAscending
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
  }, [data, isAscending]);

  useEffect(() => {
    onSortedData(sortedData);
  }, [sortedData, onSortedData]);

  return (
    <button
      onClick={toggleSort}
      className="flex-shrink-0 bg-emerald-400 rounded-md p-2"
    >
      {isAscending ? (
        <FontAwesomeIcon icon={faArrowUpAZ} />
      ) : (
        <FontAwesomeIcon icon={faArrowDownZA} />
      )}
    </button>
  );
};

export default SortButton;
