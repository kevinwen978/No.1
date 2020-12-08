var kevinwen978 = function () {
    function chunk(ary, size ) {
        if (ary.length < 1)
            return [];
        size = size > 0 ? size : 1;
        let res = [];
        let l = ary.length;
        let resL = (l / size) | 0;
        for (let i = 0; i < resL; i++) {
            res[i] = ary.slice(size * i, size * (i + 1));
        }
        if (resL * size < l) {
            res[resL] = ary.slice(resL * size);
        }
        return res;
    }
    //过滤数组非真的值
    function compact(ary) {
        var result = [];
        for (var i = 0; i < ary.length; i++) {
            if (ary[i]) {
                result.push(ary[i]);
            }
        }
        return result;
    }
    // 排除数组特定的值  
    function difference(arr, values) {
        var result = [];
        for (var i = 0; i < arr.length; i++) {
            var p = false;
            for (var j = 0; j < values.length; j++) {
                if (arr[i] == values[j])
                    p = true;
            }
            if (p == false)
                result.push(arr[i]);
        } return result;
    }
    return {
        chunk,
        compact,
        difference,
    };

} ();