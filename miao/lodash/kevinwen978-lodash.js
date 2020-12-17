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
        var result = new Set()
        for (var  val of values) {
            for (var res of val) result.add(res)
        }
        return ary.filter(res => !result.has(res))
    }
    //返回一个过滤值后的新数组
    function differenceWith	(ary,value,comparator) {
        var res = []
        for (var a of ary) {
            for (var v of value) {
                if (!comparator(a,v)) res.push(a)
            }
        }
        return res
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
    //返回找到元素的索引值
    function findIndex(arr, predicate, fromIndex = 0) {
        predicate = func(predicate)
        for (let i = fromIndex; i < arr.length; i++) {
            if (predicate(arr[i])) {
                return i
            }
        }
    
        return -1
    }
    //从后往前返回找到元素的索引值
    function findLastIndex(arr, predicate, fromIndex = arr.length - 1) {
        predicate = func(predicate)
    
        for (let i = fromIndex; i >= 0; i--) {
            if (predicate(arr[i])) {
                return i
            }
        }
    
        return -1
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
    //返回valuey从前往后在数组array中被找到的索引值
    function indexOf (ary, value, fromIndex = 0) {
         for (var i = fromIndex;i < ary.length; i ++) {
             if (ary[i] == value) return i
         } return -1
    }
    //获取array数组的第n个元素
    function nth (ary,n = 0) {
        if (n >= 0) {
            return ary[n]
        } else {
            return ary[ary.length + n]
        }
    }
    //移除数组array中所有和给定值相等的元素
    function pull (ary,...values) {
       var res = []
       for (var i = 0; i < ary.length; i ++) {
           if (!values.includes(ary[i])) res.push(ary[i])
       }
       return res
    }
    //去除数组array中的最后一个元素
    function initial(ary) {
        if (ary.length < 1 ) return []
        return ary.slice(0,ary.length - 1)
    }
    // 返回一个包含所有传入数组交集元素的新数组
    function intersection(...arys) {
        var map = {}
        var n = arys.length
        var res = []
        for (var i = 0;i < n; i ++) {
            for (var j = 0; j < arys[i].length; j ++) {
                map[arys[i][j]] ? map[arys[i][j]] ++ : map[arys[i][j]] = 1
            }
        }
        for (var key in map) {
            if (map[key] == n)  res.push(Number(key))
        }
        return res

    }
    //将 array 中的所有元素转换为由 separator 分隔的字符串
    function join (ary,separator = ',') {
        var str = '' + ary[0]
        for (var i = 1; i < ary.length; i++) {
            str += separator 
            str += ary[i]
        } return str
    }
    //返回array中的最后一个元素
    function last (ary) {
        return ary[ary.length -1]
    }
    //返回valuey从后往前在数组array中被找到的索引值
    function lastIndexOf(ary, value,fromIndex = ary.length - 1) {
        for (var i = fromIndex; i >=0; i --) {
            if (ary[i] == value) return  i
        } return -1
    }
    //移除数组array中所有和给定值相等的元素
    function pull (ary,...value) {

    }
    //反转array
    function reverse (ary) {
        var n = ary.length
        for (var i = n - 1; i >= 0 ; i --) {
            ary.push(ary[i])
        } return ary.slice(n)
    }
    //  value值插入到数组中尽可能小的索引位置
    function sortedIndex(ary, value) {
        for (var i = 0; i < ary.length; i++) {
            if (value <= ary[i]) return i
        }
    }
    // 转化为数组
    function toArray(val) {
        if (typeof val == "array") {
            return val
        }
        var  res = []
        if (typeof val == "object" || typeof val == "string") {
            for (p in val) {
                res.push(val[p])
            }
        }
        if (typeof val == "number" || !val) {
            return []
        }
        return res
    }
    //计算 array 中的最大值
    function max (ary) {
        if (!ary || ary.length < 1) return undefined
        var max = ary[0]
        for (var i = 1; i < ary.length; i++) {
            max = Math.max(max,ary[i])
        } return max
    }
    //计算 array 中的最小值
    function min (ary) {
        if (!ary || ary.length < 1) return undefined
        var min = ary[0]
        for (var i = 1; i < ary.length; i++) {
            min = Math.min(min,ary[i])
        } return min
    }
    // 计算array的总和
    function sum(ary) {
        var sum = 0
        for (var i = 0; i < ary.length; i++) {
            sum += ary[i]
        } return sum
    }
    // 将array与任何数组 或 值连接在一起
    function concat(ary, ...values) {
        let res = ary
        for (let i = 0; i < values.length; i++) {
            if (Array.isArray(values[i])) {
                res.push(...values[i])
            } else {
                res.push(values[i])
            }
        }
        return res
    }
    //判断输入是否为数组
    function isArray (value) {
        return typeof value == Array 
    }

    return {
        chunk,
        compact,
        difference,
        differenceWith,
        drop,
        dropRight,
        fill,
        findIndex,
        findLastIndex,
        flatten,
        flattenDeep,
        flattenDepth,
        fromPairs,
        head,
        indexOf,
        nth,
        pull,
        initial,
        intersection,
        join,
        last,
        lastIndexOf,
        reverse,
        sortedIndex,
        toArray,
        max,
        min,
        sum,
        concat,
        isArray,
    }

} ();