import Select from "react-select";

import "./Pagination.css";
import {FormattedMessage} from "react-intl";

const Pagination = ({page, setPage, size, setSize, sizeOptions, actualItems, totalItems}) => {

    const lastPage = Math.ceil(totalItems / size);
    const realLastPage = lastPage - 1;
    const startIndex = size * page;
    const b = startIndex + actualItems;

    return (
        <div className="pagination-content">
            <div className="pagination-rows-per-page">
                <p><FormattedMessage id="project.common.Pagination.part1"/></p>
                <Select
                    value={sizeOptions.find((e) => e.value === size)}
                    onChange={(e) => setSize(e.value)}
                    options={sizeOptions}
                    menuPlacement="auto"
                />
                <p>
                    <FormattedMessage
                        id="project.common.Pagination.part2"
                        values={{start: (startIndex + 1), end: b, total: totalItems}}
                    />
                </p>
            </div>
            <div className="pagination-pagination">
                <span className="fa-solid fa-angles-left" onClick={() => setPage(0)}/>
                <span className="fa-solid fa-angle-left"
                      onClick={() => (page > 0 && setPage(page - 1))}/>
                <input
                    type="number"
                    min={1}
                    max={lastPage}
                    value={page + 1}
                    onChange={(e) => setPage(Number(e.target.value) - 1)}
                />
                <p>
                    <FormattedMessage
                        id="project.common.Pagination.part3"
                        values={{lastPage: lastPage}}
                    />
                </p>
                <span className="fa-solid fa-angle-right"
                      onClick={() => (page < realLastPage && setPage(page + 1))}/>
                <span className="fa-solid fa-angles-right" onClick={() => setPage(realLastPage)}/>
            </div>
        </div>
    );
}

export default Pagination;