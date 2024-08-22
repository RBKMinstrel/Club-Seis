export const parseListToSelect = (list, transformFunc, vacia, intl) => {
    const transformedList = list.map(transformFunc);
    if (vacia) {
        transformedList.push({label: intl.formatMessage({id: 'project.global.title.unassigned'}), value: -1});
    }
    return transformedList;
}
