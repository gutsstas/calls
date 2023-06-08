import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { AudioCloseSVG, SearchSVG } from "../Sidebar/commons/IconSVG";
import style from "./search.module.scss";
import { debounce } from "lodash";

const useDebounce = (callback: () => void) => {
  const ref = useRef<any>();

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = () => {
      ref.current?.();
    };

    return debounce(func, 500);
  }, []);

  return debouncedCallback;
};

interface ISearchProps {
  search: string;
  setSearch: (str: string) => void;
}

export function Search({ search, setSearch }: ISearchProps) {
  const [value, setValue] = useState("");

  const debouncedRequest = useDebounce(() => {
    setSearch(value);
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);

    debouncedRequest();
  };

  return (
    <div className={style.search_container}>
      <div className={style.search_icon}>
        <SearchSVG />
      </div>

      <input
        type="text"
        className={
          search ? style.search + " " + style.search_active : style.search
        }
        placeholder="Поиск по звонкам"
        onChange={onChange}
        value={value}
      />

      <div
        className={style.remove_icon}
        onClick={() => {
          setSearch("");
          setValue("");
        }}
      >
        {search && <AudioCloseSVG />}
      </div>
    </div>
  );
}
