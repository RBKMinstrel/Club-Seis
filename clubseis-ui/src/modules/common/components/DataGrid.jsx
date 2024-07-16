import './DataGrid.css';

const DataGrid = ({
                      dataList, getRowId, columns,
                      loading = false,
                      getNestedRows,
                      getSubRowId,
                      expandedRows = {},
                      setExpandedRows = () => {
                      },
                      selectedRows = [],
                      setSelectedRows,
                      children = null
                  }) => {
    const keys = Object.keys(columns);

    const toggleRow = (rowId) => {
        setExpandedRows((prevState) => ({
            ...prevState,
            [rowId]: !prevState[rowId],
        }));
    };

    const handleRowSelection = (rowId) => {
        setSelectedRows((prevSelectedRows) => {
            if (prevSelectedRows.includes(rowId)) {
                return prevSelectedRows.filter((id) => id !== rowId);
            } else {
                return [...prevSelectedRows, rowId];
            }
        });
    };

    const isRowSelected = (rowId) => {
        return selectedRows.includes(rowId);
    };

    return (
        <>
            <table className="data-grid">
                <thead>
                <tr>
                    {setSelectedRows && (
                        <th scope="col" className="data-grid-header checkbox-column">
                            {/* Header for the checkbox column */}
                        </th>
                    )}
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
                        <td colSpan={keys.length + (setSelectedRows ? 1 : 0)}
                            className="data-grid-loading">Cargando...
                        </td>
                    </tr>
                ) : dataList.length > 0 ? (
                    dataList.flatMap((data) => {
                        const rowId = getRowId(data);
                        const isExpanded = expandedRows[rowId];
                        const nestedRows = getNestedRows ? getNestedRows(data) : [];
                        return [
                            <tr key={rowId} className={isRowSelected(rowId) ? 'selected-row' : ''}
                                onClick={() => toggleRow(rowId)}>
                                {setSelectedRows && (
                                    <td className={isRowSelected(rowId) ? 'selected-row checkbox-column' : 'checkbox-column'}>
                                        <input
                                            type="checkbox"
                                            checked={isRowSelected(rowId)}
                                            onChange={(e) => {
                                                e.stopPropagation();
                                                handleRowSelection(rowId);
                                            }}
                                        />
                                    </td>
                                )}
                                {keys.map((key) => (
                                    <td key={key} scope="col" className="data-grid-cell">
                                        {columns[key].cell(data)}
                                    </td>
                                ))}
                            </tr>,
                            isExpanded && nestedRows.length > 0 && nestedRows.map((nestedData) => (
                                <tr key={rowId + getSubRowId(nestedData)} className="nested-row">
                                    {setSelectedRows && (
                                        <td className="checkbox-column"></td>
                                    )}
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
                        <td colSpan={keys.length + (setSelectedRows ? 1 : 0)} className="data-grid-no-results">No hay
                            datos disponibles
                        </td>
                    </tr>
                )}
                </tbody>

                {children && (
                    <tfoot>
                    <tr>
                        <td colSpan={keys.length + (setSelectedRows ? 1 : 0)} className="data-grid-footer">
                            {children}
                        </td>
                    </tr>
                    </tfoot>
                )}
            </table>
        </>
    );
}

export default DataGrid;
