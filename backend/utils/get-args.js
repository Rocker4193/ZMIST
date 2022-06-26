const getArgs = (args) => {
    const res = {};

    args.slice(2).forEach((value, index, arr) => {
        const nextEl = arr[index + 1];

        if (value.charAt(0) === "-" && nextEl && nextEl.charAt(0) !== "-") {
            res[value.substring(1)] = nextEl;
        }
    });

    return res;
};

export default getArgs;
