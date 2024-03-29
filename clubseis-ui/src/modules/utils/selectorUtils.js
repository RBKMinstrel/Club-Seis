export const parseListToSelect = (list, transformFunc, vacia) => {
    const transformedList = list.map(transformFunc);
    if (vacia) {
        transformedList.push({label: "Sin asignar", value: -1});
    }
    return transformedList;
}
