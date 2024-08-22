export const geTipoOptions = (intl) => [
    {label: intl.formatMessage({id: 'project.mercancias.Options.clothes'}), value: true},
    {label: intl.formatMessage({id: 'project.mercancias.Options.others'}), value: false}
];

export const getGeneroOptions = (intl) => [
    {label: intl.formatMessage({id: 'project.mercancias.Options.unisex'}), value: 1},
    {label: intl.formatMessage({id: 'project.mercancias.Options.male'}), value: 2},
    {label: intl.formatMessage({id: 'project.mercancias.Options.female'}), value: 3},
];