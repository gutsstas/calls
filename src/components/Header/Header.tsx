import { MoreSVG, SearchSVG } from "../Sidebar/commons/IconSVG";
import style from "./header.module.scss";

export function Header() {
  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.first__group}>
          <div className={style.date}>
            {new Date().toLocaleString("ru", {
              month: "long",
              day: "numeric",
              weekday: "long",
            })}
          </div>
          <div className={style.new_calls}>
            <div className={style.new_calls_text}>
              Новые звонки&nbsp;
              <span className={style.new_calls_scale__text}>20 из 30 шт</span>
            </div>
            <div className={style.new_calls_scale}>
              <div className={style.new_calls__green}></div>
            </div>
          </div>
          <div className={style.quality}>
            <div className={style.new_calls_text}>
              Качество разговоров&nbsp;
              <span className={style.new_calls_scale__yellow}>40%</span>
            </div>
            <div className={style.new_calls_scale}>
              <div className={style.new_calls__yellow}></div>
            </div>
          </div>
          <div className={style.conversion}>
            <div className={style.new_calls_text}>
              Конверсия в заказ&nbsp;
              <span className={style.new_calls_scale__red}>67%</span>
            </div>
            <div className={style.new_calls_scale}>
              <div className={style.new_calls__red}></div>
            </div>
          </div>
        </div>
        <div className={style.second__group}>
          <div className={style.search}>
            <SearchSVG />
          </div>
          <div className={style.profile}>
            ИП Сидорова Александра Михайловна
            <span>
              <MoreSVG />
            </span>
          </div>
          <div className={style.container_avatar}>
            <div className={style.avatar}>
              <div>CA</div>
            </div>
            <div>
              <MoreSVG />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
