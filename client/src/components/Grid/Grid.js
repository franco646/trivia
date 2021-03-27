import React from "react";
import PropTypes from "prop-types";

const Grid = ({ elements, className }) => {
  return elements ? (
    <div className={`columns is-multiline ${className}`}>
      {elements.map((element, i) => {
        return (
          <div className="column is-half" style={{ padding: "0%" }} key={i}>
            {element}
          </div>
        );
      })}
    </div>
  ) : null;
};

Grid.defaultProps = {
  elements: [],
  className: "",
};

Grid.propTypes = {
  elements: PropTypes.array,
  className: PropTypes.string,
};

export default Grid;
