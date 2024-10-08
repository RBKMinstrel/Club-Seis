import Select from "react-select";
import './DataGrid.css';
import {FormattedMessage} from "react-intl";

const FooterList = ({count, page, setPage, size, setSize, total}) => {
    const sizeOptions = [
        {value: 6, label: "6"},
        {value: 12, label: "12"},
        {value: 25, label: "24"},
    ];

    const lastPage = Math.ceil(total / size);
    const realLastPage = lastPage - 1;
    const startIndex = size * page;
    const b = startIndex + count;

    return (
        <div className="data-grid-footer-content">
            <div className="data-grid-rows-per-page">
                <p><FormattedMessage id="project.common.FooterList.part1"/></p>
                <Select
                    value={sizeOptions.find((e) => e.value === size)}
                    onChange={(e) => setSize(e.value)}
                    options={sizeOptions}
                    menuPlacement="auto"
                />
                <p>
                    <FormattedMessage
                        id="project.common.FooterList.part2"
                        values={{start: (startIndex + 1), end: b, total: total}}
                    />
                </p>
            </div>
            <div className="data-grid-pagination">
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
                        id="project.common.FooterList.part3"
                        values={{lastPage: lastPage}}
                    />
                </p>
                <span className="fa-solid fa-angle-right"
                      onClick={() => (page < realLastPage && setPage(page + 1))}/>
                <span className="fa-solid fa-angles-right" onClick={() => setPage(realLastPage)}/>
            </div>
        </div>
    )

}

export default FooterList;