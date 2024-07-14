import './DataGrid.css';

const DataGrid = ({
                      dataList, getRowId, columns,
                      loading = false,
                      getNestedRows,
                      expandedRows = {},
                      setExpandedRows = () => {
                      },
                      children = null
                  }) => {
    const keys = Object.keys(columns);

    //const [expandedRows, setExpandedRows] = useState({});

    const toggleRow = (rowId) => {
        setExpandedRows((prevState) => ({
            ...prevState,
            [rowId]: !prevState[rowId],
        }));
    };

    return (
        <>
            <table className="data-grid">
                <thead>
                <tr>
                    {keys.map((key) => (
                        <th key={key} scope="col" className="data-grid-header">
                            {columns[key].header()}
                        </th>
                    ))}
                </tr>
                </thead>

                <tbody className="data-grid-body">
                {loading ? (
                    <tr key={"data-loading"}>
                        <td colSpan={keys.length} className="data-grid-loading">Cargando...</td>
                    </tr>
                ) : dataList.length > 0 ? (
                    dataList.flatMap((data) => {
                        const rowId = getRowId(data);
                        const isExpanded = expandedRows[rowId];
                        const nestedRows = getNestedRows ? getNestedRows(data) : [];
                        return [
                            <tr key={rowId} onClick={() => toggleRow(rowId)}>
                                {keys.map((key) => (
                                    <td key={key} scope="col" className="data-grid-cell">
                                        {columns[key].cell(data)}
                                    </td>
                                ))}
                            </tr>,
                            isExpanded && nestedRows.length > 0 && nestedRows.map((nestedData) => (
                                <tr key={getRowId(nestedData)} className="nested-row">
                                    {keys.map((key) => (
                                        <td key={key} scope="col" className="data-grid-cell">
                                            {columns[key].cell(nestedData)}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ];
                    })
                ) : (
                    <tr key={"no-results"}>
                        <td colSpan={keys.length} className="data-grid-no-results">No hay datos disponibles</td>
                    </tr>
                )}
                </tbody>

                {children &&
                    <tfoot>
                    <tr>
                        <td colSpan={keys.length} className="data-grid-footer">
                            {children}
                        </td>
                    </tr>
                    </tfoot>
                }
            </table>
        </>
    );
}

export default DataGrid;
