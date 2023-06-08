import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "./Sidebar.module.css";

import {
  CallsSVG,
  CounterpartiesSVG,
  DocumentationSVG,
  PaymentSVG,
  KnowledgeBaseSVG,
  LogoSVG,
  MessagesSVG,
  OrdersSVG,
  PerformersSVG,
  ReportsSVG,
  ResultsSVG,
  SettingsSVG,
  AddOrderSVG,
} from "./commons/IconSVG";

const listMenu = [
  {
    text: "Итоги",
    svg: <ResultsSVG />,
  },
  { text: "Заказы", svg: <OrdersSVG /> },
  { text: "Сообщения", svg: <MessagesSVG /> },
  { text: "Звонки", svg: <CallsSVG /> },
  { text: "Контрагенты", svg: <CounterpartiesSVG /> },
  { text: "Документы", svg: <DocumentationSVG /> },
  { text: "Исполнители", svg: <PerformersSVG /> },
  { text: "Отчеты", svg: <ReportsSVG /> },
  { text: "База знаний", svg: <KnowledgeBaseSVG /> },
  { text: "Настройки", svg: <SettingsSVG /> },
];

export function Sidebar() {
  const [select, setSelect] = useState(3);

  return (
    <nav className={style.navigation}>
      <div className={style.logo}>
        <LogoSVG />
      </div>

      <ul className={style.menu}>
        {listMenu.map((el, index) => {
          return (
            <li
              className={
                select === index
                  ? style.menuItem + " " + style.menuActiveItem
                  : style.menuItem
              }
              onClick={() => setSelect(index)}
              key={el.text + index}
            >
              <div className={style.menuItemText}>
                <div
                  className={
                    select === index
                      ? style.menuItemImg + " " + style.menuActiveItemImg
                      : style.menuItemImg
                  }
                >
                  {el.svg}
                </div>
                <div>{el.text}</div>
              </div>

              {select === index && <div className={style.menuItemCircle}></div>}
            </li>
          );
        })}
      </ul>

      <button className={style.btnSidebar}>
        <div className={style.btnSidebarDiv}>Добавить заказ</div>
        <AddOrderSVG />
      </button>

      <button className={style.btnSidebar + " " + style.btnSidebarPay}>
        <div className={style.btnSidebarDiv + " " + style.btnSidebarPayDiv}>
          Оплата
        </div>

        <PaymentSVG />
      </button>

      {/* <span>
        <Link to="/" className="mr-2">
          Products
        </Link>
        <Link to="/about">About</Link>
      </span> */}
    </nav>
  );
}
