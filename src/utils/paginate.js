import _ from 'lodash';
export function Paginate(item,currentPages,pageSize) {
    const startIndex = (currentPages - 1) * pageSize;
    // console.log("Index is", startIndex);
    return _(item).slice(startIndex).take(pageSize).value();

};