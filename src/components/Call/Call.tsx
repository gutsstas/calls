import { useQuery } from "react-query";
import { ICall } from "../../interfaces/interfaces";
import {
  AudioCloseSVG,
  AudioDownloadSVG,
  AudioPlaySVG,
  AudioStopSVG,
  FallIncomingSVG,
  FallOutgoingSVG,
  IncomingSVG,
  OutgoingSVG,
} from "../Sidebar/commons/IconSVG";
import style from "./call.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { Slider } from "@mui/material";

interface ICallProps {
  data: ICall;
  index: number;
}

export function Call({ data, index }: ICallProps) {
  const [play, setPlay] = useState(false);

  const [download, setDownload] = useState(false);

  const [audio, setAudio] = useState<HTMLAudioElement | undefined>();

  const [seconds, setSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    if (audio?.duration && seconds < audio.duration && timerActive) {
      setTimeout(setSeconds, 1000, seconds + 1);
    } else if (audio?.duration && seconds >= audio?.duration) {
      setSeconds(0);
      setPlay(false);
      setTimerActive(false);
    } else {
      setTimerActive(false);
    }
  }, [audio, seconds, timerActive]);

  function changeFormat(num: number) {
    const s = num.toString();
    return s.length < 2 ? "0" + s : s;
  }

  function formatTime(num: number) {
    const m = Math.floor(num / 60);
    const s = num % 60;
    return changeFormat(m) + ":" + changeFormat(s);
  }

  function formatTypeCall(data: ICall) {
    if (!data.in_out) {
      return data.status === "Дозвонился" ? (
        <OutgoingSVG />
      ) : (
        <FallOutgoingSVG />
      );
    } else {
      return data.status === "Дозвонился" ? (
        <IncomingSVG />
      ) : (
        <FallIncomingSVG />
      );
    }
  }

  const headers = {
    Authorization: "Bearer testtoken",
    "Content-type": "audio/mpeg, audio/x-mpeg, audio/x-mpeg-3, audio/mpeg3",
    "Content-Disposition": 'filename="record.mp3"',
  };

  async function componentDidMount() {
    if (!data.record || !data.partnership_id) return false;
    const res = await fetch(
      `https://api.skilla.ru/mango/getRecord?record=${data.record}&partnership_id=${data.partnership_id}`,
      {
        method: "post",
        headers: headers,
      }
    );

    if (!res.ok) return false;
    const dat = await res.blob();
    const audio = new Audio(URL.createObjectURL(dat));
    console.log("audio.duration", audio.duration);

    setAudio(audio);
  }

  function playAudio() {
    if (!download || !audio) return;
    console.log("audio.duration", audio.duration);
    !play ? audio.play() : audio.pause();
    setPlay((i) => !i);
    setTimerActive(!timerActive);
  }

  return (
    <div className={style.call}>
      <div className={style.first__group}>
        <input type="checkbox" className={style.checkbox} />
        <div>{formatTypeCall(data)}</div>
        <div className={style.time}>
          {new Date(data.date).toLocaleTimeString().slice(0, -3)}
        </div>
        <div className={style.person_avatar_container}>
          <img
            src={data.person_avatar}
            alt="person_avatar"
            className={style.person_avatar}
          />
        </div>
        <div className={style.contact}>
          {data.contact_name ? (
            <div className={style.contact_name}>
              <div>{data.contact_name}</div>
              <div>{data.contact_company}</div>
            </div>
          ) : !data.in_out ? (
            data.to_number
          ) : (
            data.from_number
          )}
        </div>
      </div>

      <div className={style.second__group}>
        <div className={style.source}>{data.source}</div>
        <div className={style.score + " " + style.score__error}>
          {data.errors.length
            ? data.errors[0]
            : data.record && (
                <button className={style.score__btn}>Распознать</button>
              )}
        </div>
        {data.record && (
          <div className={style.audio}>
            <div className={style.audio__time}>
              {seconds ? formatTime(seconds) : "00:00"}
            </div>
            <div className={style.audio__control} onClick={playAudio}>
              {!play ? <AudioPlaySVG /> : <AudioStopSVG />}
            </div>
            <div className={style.audio__scale}>
              <Slider
                defaultValue={0}
                aria-label="Default"
                valueLabelDisplay="auto"
                value={seconds}
                step={1}
                min={0}
                max={audio?.duration ? Math.floor(audio?.duration) : 100}
                className={style.audio__scale__slider}
                sx={{
                  color: "#002CFB",
                  "& .MuiSlider-thumb": {
                    width: "0",
                    height: "0",
                  },
                  "& .MuiSlider-thumb:before": {
                    boxShadow: "none",
                  },
                  "& .MuiSlider-thumb:active": {
                    boxShadow: "none",
                  },
                  "& .MuiSlider-thumb:hover": {
                    boxShadow: "none",
                  },
                  "& .MuiSlider-rail": {
                    color: "#ADBFDF",
                    opacity: "1",
                  },
                }}
              />
            </div>
            <div
              className={style.audio__download}
              onClick={async () => {
                await componentDidMount();
                setDownload(true);
              }}
            >
              <AudioDownloadSVG />
            </div>
            {download && (
              <div
                className={style.audio__close}
                onClick={() => {
                  setDownload(false);
                  setPlay(false);
                }}
              >
                <AudioCloseSVG />
              </div>
            )}
          </div>
        )}
      </div>

      {!data.record && data.time !== 0 && (
        <div className={style.time__call}>{formatTime(data.time)}</div>
      )}
    </div>
  );
}
