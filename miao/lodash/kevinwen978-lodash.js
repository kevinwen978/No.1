var kevinwen978 = function () {
    function chunk(ary, size ) {
        if (ary.length < 1)
            return []
        size = size > 0 ? size : 1
        let res = []
        let l = ary.length
        let resL = (l / size) | 0
        for (let i = 0; i < resL; i++) {
            res[i] = ary.slice(size * i, size * (i + 1))
        }
        if (resL * size < l) {
            res[resL] = ary.slice(resL * size)
        }
        return res
    }
    //过滤数组非真的值
    function compact(ary) {
        var result = []
        for (var i = 0; i < ary.length; i++) {
            if (ary[i]) {
                result.push(ary[i])
            }
        }
        return result
    }
    // 排除数组特定的值  
    function difference(ary, ...values) {
        var result = []
        for (var i = 0; i < ary.length; i++) {
            var p = false
            for (var j = 0; j < values.length; j++) {
                for (var m = 0; m < values[j].length; m++) {
                  if (ary[i] == values[j])  p = true
                }
            }
            if (p == false)
                result.push(ary[i])
        } return result
    }
    //删除数组前面n个元素
    function drop (arr,n = 1) {
        var m = arr.length
        if (n >= m) return []
        var result = arr.slice(n)
        return result
    }
    //删除数组后面n个元素
    function dropRight (arr,n = 1) {
        var m = arr.length
        if (n >= m) return []
        var result = arr.slice(0,m - n)
        return result    
    }
    //替换数组连续几个值
    function fill (arr,value,start = 0, end = arr.length) {
        for (var i = start; i < end ;i++) {
            arr[i] = value
        }
        return arr
    }
    // 减少一级array嵌套深度
    function flatten(ary) {
        var result = []
        for (var i = 0; i < ary.length; i++) {
            if (ary[i] instanceof Array) {
                result.push(...ary[i])
            } else {
                result.push(ary[i])
            }
        }
        return result
    } 
    // 减少所有array嵌套深度
    function flattenDeep (ary) {
        var result = []
        for (var i = 0; i < ary.length; i++) {
            if (ary[i] instanceof Array) {
                result.push(...flattenDeep(ary[i]))
            } else {
                result.push(ary[i])
            }
        }
        return result

    }
    // 减少depth个array嵌套深度
    function flattenDepth(ary, depth = 1) {
        var res = []
        for (var i = 0; i < ary.length; i++) {
            if (ary[i] instanceof Array && depth > 0) {
                res.push(...flattenDepth(ary[i], depth - 1))
            } else {
                res.push(ary[i])
            }
        }
        return res
    }
    //返回一个由键值对pairs构成的对象
    function fromPairs(pairs) {
       var res = {}
       for (var i = 0; i < pairs.length; i ++) {
           for (var j = 0; j < pairs[i].length; j += 2) {
                if (!res[pairs[i][j]]) res[pairs[i][j]] = pairs[i][j + 1]
           }
       } return res
    }
    //返回数组第一个值
    function head (ary) {
        if (ary.length < 1) return undefined
        return ary[0]
    }
    //返回value在数组array中被找到的索引值
    function indexOf (ary, value, fromIndex = 0) {
         for (var i = fromIndex;i < ary.length; i ++) {
             if (ary[i] == value) return i
         } return -1
    }
    //去除数组array中的最后一个元素
    function initial(ary) {
        if (ary.length < 1 ) return []
        return ary.slice(0,ary.length - 1)
    }
    //将 array 中的所有元素转换为由 separator 分隔的字符串
    function join (ary,separator = ',') {
        var str = '' + ary[0]
        for (var i = 1; i < ary.length; i++) {
            str += separator + ary[i]
        } return str
    }
     

    return {
        chunk,
        compact,
        difference,
        drop,
        dropRight,
        fill,
        flatten,
        flattenDeep,
        flattenDepth,
        fromPairs,
        head,
        indexOf,
        initial,
        join,
    }

} ();