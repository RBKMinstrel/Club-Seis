import './DataGrid.css';
import Select from "react-select";

const DataGrid = ({dataList, getRowId, columns, loading, page, setPage, size, setSize, total, height}) => {
    const keys = Object.keys(columns);
    const sizeOptions = [
        {value: 12, label: "12"},
        {value: 25, label: "25"},
        {value: 50, label: "50"},
        {value: 100, label: "100"},
    ];

    const maxPage = Math.ceil(total / size);
    const realMaxPage = maxPage - 1;
    const a = size * page;
    const b = a + dataList.length;

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
                    dataList.map((data) =>
                        <tr key={getRowId(data)}>
                            {keys.map((key) => (
                                <td key={key} scope="col" className="data-grid-cell">
                                    {columns[key].cell(data)}
                                </td>
                            ))}
                        </tr>
                    )
                ) : (
                    <tr key={"no-results"}>
                        <td colSpan={keys.length} className="data-grid-no-results">No hay datos disponibles</td>
                    </tr>
                )}
                </tbody>

                <tfoot>
                <tr>
                    <td colSpan={keys.length} className="data-grid-footer">
                        <div className="data-grid-footer-content">
                            <div className="data-grid-rows-per-page">
                                <p>Filas por página</p>
                                <Select
                                    value={sizeOptions.find((e) => e.value === size)}
                                    onChange={(e) => setSize(e.value)}
                                    options={sizeOptions}
                                />
                                <p>{a + 1} - {b} de {total} elementos</p>
                            </div>
                            <div className="data-grid-pagination">
                                <span className="fa-solid fa-angles-left" onClick={() => setPage(0)}/>
                                <span className="fa-solid fa-angle-left"
                                      onClick={() => (page > 0 && setPage(page - 1))}/>
                                <input
                                    type="number"
                                    min={1}
                                    max={maxPage}
                                    value={page + 1}
                                    onChange={(e) => setPage(Number(e.target.value) - 1)}
                                />
                                <p> de {maxPage}</p>
                                <span className="fa-solid fa-angle-right"
                                      onClick={() => (page < realMaxPage && setPage(page + 1))}/>
                                <span className="fa-solid fa-angles-right" onClick={() => setPage(realMaxPage)}/>
                            </div>
                        </div>
                    </td>
                </tr>
                </tfoot>

            </table>
        </>
    );
}

export default DataGrid;
