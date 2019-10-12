import * as React from 'react';
import './stepsLine.scss';

export function StepsLine(props) {
  const handleClick = index => {
    let number = index + 1;
    if (number > props.curPageNumber) {
      if (props.canOpenPage()) {
        props.openPage(number);
      }
    } else {
      props.openPage(number);
    }
  };

  const createStepsLine = () => {
    let listData = [];
    for (let i = 0; i < props.stepQuantity; i++) {
      let data = (
        <button
          style={
            props.curPageNumber === i + 1
              ? {
                  backgroundColor: '#00a3af',
                  color: '#fff'
                }
              : {
                  backgroundColor: '#e1f2f4',
                  color: '#00a3af'
                }
          }
          onClick={() => handleClick(i)}
          className={`stepsLine__btn stepsLine__btn-${i + 1}`}
        >
          {i + 1}
        </button>
      );
      let line = <div className="stepsLine__line"></div>;

      listData.push(data);
      if (i !== props.stepQuantity - 1) {
        listData.push(line);
      }
    }

    return listData;
  };

  return <div className="stepsLine">{createStepsLine()}</div>;
}
