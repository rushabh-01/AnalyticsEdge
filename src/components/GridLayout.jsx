import PropTypes from "prop-types";

const GridLayout = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (<th key={column} className="px-4 py-2">
                {column}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (<tr key={index}>
              {columns.map((column) => (
                <td key={column} className="px-4 py-2">
                  {item[column]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

GridLayout.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
};

export default GridLayout;
