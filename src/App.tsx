import React, { useState, useEffect } from "react";
import "./App.scss";
import { Card } from "./components";

interface IList {
  index: number;
  ordem: number;
  id: number;
  color: string;
}

const colors = [
  "#FF5733", // Laranja
  "#E5E542", // Amarelo
  "#42E55C", // Verde
  "#428FE5", // Azul
  "#E542B6", // Rosa
  "#E5425C", // Vermelho
  "#42E5DB", // Turquesa
  "#8542E5", // Roxo
  "#42B4E5", // Azul claro
  "#42E5A8", // Verde claro
];

export const App: React.FC = () => {
  const [list, setList] = useState<IList[]>([]);
  const [newOrder, setNewOrder] = useState<string>("");
  const [orderSelect, setOrderSelect] = useState<number>();
  const [error, setError] = useState<boolean>(false);

  const handleChangeOrder = (indexSelect?: number) => {
    const regex = /^(?![0-9]+\s[0-9]+$).*$/;

    if (regex.test(newOrder) && !indexSelect && !orderSelect) {
      setNewOrder("");
      setError(true);
      return;
    }

    const [stringOrder, stringIndex] = newOrder.split(" ");

    let order: number;
    let index: number;

    if (orderSelect != undefined && indexSelect != undefined) {
      order = orderSelect;
      index = indexSelect;
    } else {
      order = parseInt(stringOrder);
      index = parseInt(stringIndex);
    }

    const item = list.find((item) => item.ordem === order);
    let newList: IList[] = list.filter((item) => item.ordem !== order);

    if (item) {
      newList = [...newList.slice(0, index), item, ...newList.slice(index)].map(
        (obj, index) => ({ ...obj, index })
      );

      setOrderSelect(undefined);
      setNewOrder("");
      setError(false);
      setList(newList);
    }
  };

  const handleReset = () => {
    const newList = list
      .sort((a, b) => a.ordem - b.ordem)
      .map((item, index) => ({ ...item, index }));
    setList(newList);
  };

  useEffect(() => {
    if (!list.length) {
      const newList: IList[] = [];
      for (let i = 0; i < 10; i++) {
        newList.push({
          index: i,
          ordem: i + 1,
          id: i * 10,
          color: colors[i],
        });
      }
      setList(newList);
    }
  }, [list]);

  return (
    <div className="c-app">
      <div className="c-app__list">
        {!!list.length &&
          list.map((item, index) => (
            <Card
              key={item.id}
              index={index}
              ordem={item.ordem}
              color={item.color}
              orderSelect={orderSelect}
              setOrderSelect={setOrderSelect}
              handleChangeOrder={handleChangeOrder}
            />
          ))}
      </div>
      <div className="c-app__inputs">
        <input
          placeholder="ex: 3 1"
          type="text"
          value={newOrder}
          onChange={(event) => {
            if (newOrder && error) setError(false);
            setNewOrder(event.target.value);
          }}
        />
        <button onClick={() => handleChangeOrder()}>Salvar</button>
        <button onClick={handleReset}>Resetar</button>
      </div>

      <div>{error && <p>"Valor inválido!"</p>}</div>
    </div>
  );
};
