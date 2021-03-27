import React from "react";
import PropTypes from "prop-types";

const Table = ({ headers, contents, className, selectedRow, testId }) => {
  return (
    <div className="table-container" data-testid={testId}>
      <table className={`table is-fullwidth ${className}`}>
        <thead>
          <tr>
            {headers.map((header, i) => (
              <th key={i}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody data-testid="table-body">
          {contents.map((row, i) => (
            <tr className={i === selectedRow ? "is-selected" : null} key={i}>
              {row.map((cell, i) => (
                <td key={i}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Table.defaultProps = {
  headers: [],
  contents: [],
  className: "",
  selectedRow: null,
  testId: "",
};

Table.propTypes = {
  headers: PropTypes.array,
  contents: PropTypes.array,
  className: PropTypes.string,
  selectedRow: PropTypes.number,
  testId: PropTypes.string,
};

export default Table;
