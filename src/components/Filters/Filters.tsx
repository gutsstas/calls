import { useState } from "react";
import { MoreSVG } from "../Sidebar/commons/IconSVG";
import style from "./filters.module.scss";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Search } from "../Search/Search";
import { ICall } from "../../interfaces/interfaces";

interface IFiltersProps {
  search: string;
  setSearch: (str: string) => void;
  typeCall: string;
  setTypeCall: (str: string) => void;
  setPage: (num: number) => void;
}

export function Filters({
  search,
  setSearch,
  typeCall,
  setTypeCall,
  setPage,
}: IFiltersProps) {
  const handleChange = (event: SelectChangeEvent) => {
    setTypeCall(event.target.value);
    setPage(1);
  };

  const handleChangeEmployees = (event: SelectChangeEvent) => {
    setEmployees(event.target.value);
  };
  const handleChangeCalls = (event: SelectChangeEvent) => {
    setCalls(event.target.value);
  };
  const handleChangeError = (event: SelectChangeEvent) => {
    setError(event.target.value);
  };
  const handleChangeScore = (event: SelectChangeEvent) => {
    setScore(event.target.value);
  };

  const [employees, setEmployees] = useState("2");
  const [calls, setCalls] = useState("5");
  const [error, setError] = useState("5");
  const [score, setScore] = useState("5");

  return (
    <div className={style.container}>
      <div>
        <Search search={search} setSearch={setSearch} />
      </div>
      <div className={style.filters}>
        <div className={style.filters__type + " " + style.filters__calls}>
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              className={
                typeCall === "2"
                  ? style.select__available + " " + style.select
                  : style.select
              }
              value={typeCall}
              onChange={handleChange}
            >
              <MenuItem value={"2"} className={style.select_item}>
                Все типы
              </MenuItem>
              <MenuItem className={style.select_item} value={"1"}>
                Входящие
              </MenuItem>
              <MenuItem className={style.select_item} value={"0"}>
                Исходящие
              </MenuItem>
            </Select>
          </FormControl>
          <div className={style.filters__arrow}>
            <MoreSVG />
          </div>
        </div>
        <div className={style.filters__type + " " + style.filters__calls}>
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              className={
                employees === "2"
                  ? style.select__available + " " + style.select
                  : style.select
              }
              value={employees}
              onChange={handleChangeEmployees}
            >
              <MenuItem value={"2"} className={style.select_item}>
                Все сотрудники
              </MenuItem>
              <MenuItem className={style.select_item} value={"1"}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ marginRight: "8px" }}
                  >
                    <rect width="32" height="32" rx="16" fill="#EAF0FA" />
                    <path
                      d="M16.0001 16.0001C17.4734 16.0001 18.6667 14.8067 18.6667 13.3334C18.6667 11.8601 17.4734 10.6667 16.0001 10.6667C14.5267 10.6667 13.3334 11.8601 13.3334 13.3334C13.3334 14.8067 14.5267 16.0001 16.0001 16.0001ZM16.0001 17.3334C14.2201 17.3334 10.6667 18.2267 10.6667 20.0001V21.3334H21.3334V20.0001C21.3334 18.2267 17.7801 17.3334 16.0001 17.3334Z"
                      fill="#ADBFDF"
                    />
                  </svg>
                  Константин К.
                </div>
              </MenuItem>
              <MenuItem className={style.select_item} value={"0"}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ marginRight: "8px" }}
                  >
                    <rect width="32" height="32" rx="16" fill="#EAF0FA" />
                    <path
                      d="M16.0001 16.0001C17.4734 16.0001 18.6667 14.8067 18.6667 13.3334C18.6667 11.8601 17.4734 10.6667 16.0001 10.6667C14.5267 10.6667 13.3334 11.8601 13.3334 13.3334C13.3334 14.8067 14.5267 16.0001 16.0001 16.0001ZM16.0001 17.3334C14.2201 17.3334 10.6667 18.2267 10.6667 20.0001V21.3334H21.3334V20.0001C21.3334 18.2267 17.7801 17.3334 16.0001 17.3334Z"
                      fill="#ADBFDF"
                    />
                  </svg>
                  Константин К.
                </div>
              </MenuItem>
            </Select>
          </FormControl>
          <div className={style.filters__arrow}>
            <MoreSVG />
          </div>
        </div>
        <div className={style.filters__type + " " + style.filters__calls}>
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              className={
                calls === "5"
                  ? style.select__available + " " + style.select
                  : style.select
              }
              value={calls}
              onChange={handleChangeCalls}
            >
              <MenuItem value={"5"} className={style.select_item}>
                Все звонки
              </MenuItem>
              <MenuItem className={style.select_item} value={"4"}>
                Все клиенты
              </MenuItem>
              <MenuItem className={style.select_item} value={"3"}>
                Новые клиенты
              </MenuItem>
              <MenuItem className={style.select_item} value={"2"}>
                Все исполнители
              </MenuItem>
              <MenuItem className={style.select_item} value={"1"}>
                Через приложение
              </MenuItem>
              <MenuItem className={style.select_item} value={"0"}>
                Прочие звонки
              </MenuItem>
            </Select>
          </FormControl>
          <div className={style.filters__arrow}>
            <MoreSVG />
          </div>
        </div>

        <div className={style.filters__type + " " + style.filters__calls}>
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              className={
                error === "5"
                  ? style.select__available + " " + style.select
                  : style.select
              }
              value={error}
              onChange={handleChangeError}
            >
              <MenuItem value={"5"} className={style.select_item}>
                Все ошибки
              </MenuItem>
              <MenuItem className={style.select_item} value={"4"}>
                Приветствие
              </MenuItem>
              <MenuItem className={style.select_item} value={"3"}>
                Имя
              </MenuItem>
              <MenuItem className={style.select_item} value={"2"}>
                Скидка
              </MenuItem>
              <MenuItem className={style.select_item} value={"1"}>
                Предзаказ
              </MenuItem>
              <MenuItem className={style.select_item} value={"0"}>
                Благодарность
              </MenuItem>
            </Select>
          </FormControl>
          <div className={style.filters__arrow}>
            <MoreSVG />
          </div>
        </div>

        <div className={style.filters__type + " " + style.filters__calls}>
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              className={
                score === "5"
                  ? style.select__available + " " + style.select
                  : style.select
              }
              value={score}
              onChange={handleChangeScore}
            >
              <MenuItem value={"5"} className={style.select_item}>
                Все оценки
              </MenuItem>
              <MenuItem className={style.select_item} value={"4"}>
                Распознать
              </MenuItem>
              <MenuItem className={style.select_item} value={"3"}>
                Скрипт не использован
              </MenuItem>
            </Select>
          </FormControl>
          <div className={style.filters__arrow}>
            <MoreSVG />
          </div>
        </div>
      </div>
    </div>
  );
}
