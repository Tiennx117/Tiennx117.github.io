export const flattenTree = (data, map = new Map()) => {
    data.forEach(item => {
        map.set(item.value, item);
        if (item.children && item.children.length > 0) {
            flattenTree(item.children, map);
        }
    });
    return { data, map };
};
export const setValue = (value, map, mode,checked) => {
    if (['radioSelect', 'simpleSelect'].includes(mode)) {
        let item = map.get(value);
        if (item) {
            item.checked = checked;
        }

    } else {
        (value || []).forEach(key => {
            let item = map.get(key);
            if (item) {
                item.checked = checked;
                item.expanded = checked;
            }
        });
    }

};