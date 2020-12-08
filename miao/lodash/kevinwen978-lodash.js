var kevinwen978 = function () {
    //过滤数组非真的值
    function compact(ary) {
        var result = []
        for (var i = 0;i < ary.length; i++) {
            if (ary[i]) {
                result.push(ary[i])
            }
        }
        return result
    }
    // 将数组分块
    function chunk(ary, size) {
        if (ary.length < 1) return []
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
      }                                                                                                                                                                                                                   )
    return {
        chunk,
        compact,
    }

}();