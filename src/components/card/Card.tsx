import React from "react";
import "./Card.scss";

interface ICard {
  index: number;
  ordem: number;
  color: string;
  orderSelect: number | undefined;
  setOrderSelect: React.Dispatch<React.SetStateAction<number | undefined>>;
  handleChangeOrder: (indexSelect?: number) => void;
}

export const Card: React.FC<ICard> = ({
  index,
  ordem,
  color,
  orderSelect,
  setOrderSelect,
  handleChangeOrder,
}) => {
  const handleSelect = () => {
    if (orderSelect) {
      handleChangeOrder(index);
    } else {
      setOrderSelect(ordem);
    }
  };

  return (
    <div
      className="c-card"
      style={{
        backgroundColor: `#${color}`,
        opacity: orderSelect === ordem ? 0.2 : 1,
      }}
      onClick={handleSelect}
    >
      <p className="c-card__index">Index: {index}</p>
      <p className="c-card__order">{ordem}</p>
    </div>
  );
};
