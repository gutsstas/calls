import React, { useDeferredValue, useEffect, useState } from "react";
import axios from "axios";
import style from "./calls.module.scss";
import { useQuery } from "react-query";
import { ICall } from "../interfaces/interfaces";
import { Call } from "../components/Call/Call";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Header } from "../components/Header/Header";
import {
  AudioCloseSVG,
  BalanceSVG,
  CalendarSVG,
  LeftSVG,
  RightSVG,
  SearchSVG,
} from "../components/Sidebar/commons/IconSVG";
import { Filters } from "../components/Filters/Filters";
import { getListCalls, limit } from "../API/API";

export function Calls() {
  const [dataDate, setDataDate] = useState<string[]>([]);

  const [day, setDay] = useState("3");

  const [page, setPage] = useState(1);

  const [offset, setOffset] = useState(1);

  const [search, setSearch] = useState("");

  const [typeCall, setTypeCall] = useState<string>("2");

  const handleChange = (event: SelectChangeEvent) => {
    setDay(event.target.value as string);
    setPage(+event.target.value);
  };

  const filterData: string[] = [];

  const { data, refetch } = useQuery(
    "data",
    async () => await getListCalls(day, search, offset, typeCall),
    {
      onSuccess(data) {
        data.results.forEach((item: ICall) => {
          if (!filterData.includes(item.date_notime))
            filterData.push(item.date_notime);
        });
        setDataDate(filterData);
        console.log(filterData);
      },
    }
  );

  useEffect(() => {
    if (data) refetch();
  }, [day, data, offset, search, typeCall, refetch]);

  function paginationRight() {
    const maxPages = Math.ceil(data.total_rows / limit);
    if (page === maxPages) return;
    const newPage = page + 1;
    const newOffset = offset + limit;
    setPage(newPage);
    setOffset(newOffset);
  }

  function paginationLeft() {
    if (page === 1) return;
    const newPage = page - 1;
    const newOffset = offset - limit;
    setPage(newPage);
    setOffset(newOffset);
  }

  return (
    <div className={style.listCalls_container}>
      <div className={style.background}></div>
      <Header />
      <div className={style.control_container}>
        <div className={style.control__balance}>
          <div className={style.control__balance__text}>
            Баланс: <span>272 ₽</span>
          </div>
          <div className={style.control__balance__btn}>
            <BalanceSVG />
          </div>
        </div>
        <div className={style.date_container}>
          <div className={style.left} onClick={paginationLeft}>
            <LeftSVG />
          </div>
          <div className={style.date_center}>
            <div className={style.date_center__div}>
              <CalendarSVG />
            </div>

            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                className={style.select}
                value={day}
                onChange={handleChange}
              >
                <MenuItem value={3} className={style.select_item}>
                  3 дня
                </MenuItem>
                <MenuItem className={style.select_item} value={7}>
                  Неделя
                </MenuItem>
                <MenuItem className={style.select_item} value={30}>
                  Месяц
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className={style.right} onClick={paginationRight}>
            <RightSVG />
          </div>
        </div>
      </div>
      <Filters
        search={search}
        setSearch={setSearch}
        typeCall={typeCall}
        setTypeCall={setTypeCall}
        setPage={setPage}
      />
      <div className={style.listCalls}>
        <div className={style.headerTable}>
          <div className={style.first__group}>
            <div className={style.checkbox}>
              <input type="checkbox" />
            </div>
            <div className={style.type}>Тип</div>
            <div className={style.time}>Время</div>
            <div>Сотрудник</div>
            <div className={style.ring}>Звонок</div>
          </div>

          <div className={style.second__group}>
            <div>Источник</div>
            <div className={style.score}>Оценка</div>
          </div>
          <div className={style.long}>Длительность</div>
        </div>
        {dataDate &&
          dataDate.map((date: string, i: number) => {
            return (
              <div key={date + i}>
                <div className={style.dateCall}>{date}</div>
                {data.results
                  .filter((item: ICall) => item.date_notime === date)
                  .map((call: ICall, index: number) => {
                    return (
                      <Call data={call} index={index} key={call.date + index} />
                    );
                  })}
              </div>
            );
          })}
      </div>
    </div>
  );
}
