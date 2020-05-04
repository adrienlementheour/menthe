import Vue from 'vue';

export function toClassicDate(value) {
    let date = new Date(value);
    let classicDate = new Intl.DateTimeFormat('en-GB').format(date);
    return classicDate;
}

const filters = { toClassicDate };

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});

export default filters;
