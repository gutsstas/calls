import axios from "axios";
import { ICall } from "../interfaces/interfaces";

export const limit = 50;

export async function getListCalls(
  day: string,
  search: string,
  offset: number,
  typeCall: string
) {
  const days = selectDays(day);
  const res = await axios.post(
    `https://api.skilla.ru/mango/getList?search=${search}&offset=${offset}limit=${limit}&date_start=${
      days.start
    }&date_end=${days.end}&${typeCalls(typeCall)}`,
    null,
    { headers }
  );

  const data = await res.data;

  return data;
}

function typeCalls(typeCall: string) {
  console.log(typeCall === "2" ? "" : `in_out=${typeCall}&`);

  return typeCall === "2" ? "" : `in_out=${typeCall}`;
}

const headers = {
  Authorization: "Bearer testtoken",
};

function selectDays(day: string) {
  const currentDay = new Date();
  const endDate = currentDay.toISOString().slice(0, 10);
  currentDay.setDate(currentDay.getDate() - Number(day));
  const startDay = currentDay.toISOString().slice(0, 10);
  return { start: startDay, end: endDate };
}
