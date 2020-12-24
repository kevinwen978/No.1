var kevinwen978 = function () {
     // 类型检测工具集
    const types = ["Null", "Undefined", "Boolean",
    "Number", "String", "Object", "Array",
    "Function"]
    const typeUtils = {}
    //增加对象属性对应的类型判断
    types.forEach(type => {typeUtils["is" + type] = function(obj) {
    return Object.prototype.toString.call(obj) === "[object " + type + "]";
    }
    })
    //判断迭代器类型
    function processJudge(iteratee) {
        if (typeUtils.isFunction(iteratee)) return iteratee;

        if (typeUtils.isObject(iteratee))  return matches(iteratee);

        if (typeUtils.isArray(iteratee))  return obj => obj[iteratee[0]] === iteratee[1];

        if (typeUtils.isNull(iteratee) ||typeUtils.isUndefined(iteratee))   return val => val;

        if (typeUtils.isString(iteratee)) {
            strArr = iteratee.split('.')
            if (strArr.length == 1)  {
                return obj => obj[iteratee]
            } else {
                return obj => strArr.reduce((prev, cur) => prev[cur] , obj)
            }
        }
    }

/** ----------------以下为函数实现----------------------**/ 



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
    function differenceBy(ary,...ary2) {
        var iteratee = ary2[ary2.length -1]
        if (Array.isArray(iteratee)) {
            iteratee = null
        } else {
            ary2.pop()
        }
        iteratee = processJudge(iteratee)
        if (Array.isArray(ary2[0])) {
            ary2 = flatten(ary2)
        }
        for (var i = 0;i < ary2.length;i++) {
            for (var j = 0; j < ary.length; j ++) {
                if (iteratee(ary2[i]) == iteratee(ary[j])) {
                    ary.splice(j,1)
                    j --
                }
            }
        }
        return ary
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
    //去除array中从 predicate 返回假值开始到尾部的部分
    function dropRightWhile(ary,predicate) {
        predicate = processJudge(predicate)
        for (var i = ary.length -1; i >= 0 ; i --) {
            if (!predicate(ary[i])) {
                var x = i + 1 
                break
            }
        }
        return ary.slice(0,x)
    }
    //去除array中从起点开始到 predicate 返回假值结束部分
    function dropWhile(ary,predicate) {
        predicate = processJudge(predicate)
        for (var i = 0; i < ary.length -1 ; i ++) {
            if (!predicate(ary[i])) {
                break
            }
        }
        return ary.slice(i)
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
        predicate = processJudge(predicate)
        for (let i = fromIndex; i < arr.length; i++) {
            if (predicate(arr[i])) {
                return i
            }
        }
    
        return -1
    }
    //从后往前返回找到元素的索引值
    function findLastIndex(arr, predicate, fromIndex = arr.length - 1) {
        predicate = processJudge(predicate)
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
    function head(ary) {
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
    function pull(ary,...values) {
       var res = []
       for (var i = 0; i < ary.length; i ++) {
           if (!values.includes(ary[i])) res.push(ary[i])
       }
       return res
    }
    //这个方法类似_.pull，区别是这个方法接收一个要移除值的数组
    function pullAll (ary,val) {
        for (var i = 0; i < val.length; i ++) {
            for (var j = 0; j < ary.length; j ++) {
                if (val[i] == ary[j]) {
                    ary.splice(j,1)
                    j --
                }
            }
        }
        return ary
    }
    function pullAllBy(ary,val,iteratee) {
        iteratee = processJudge(iteratee)
        val = val.map(it => iteratee(it))
        var res = [] 
        for (var a of ary) {
            if (!val.includes(iteratee(a))) res.push(a)
        }
        return res
    }
    function pullAllWith(ary,val,comparator) {
        comparator = processJudge(comparator)
        var n = ary.length
        var judge = new Array(n).fill(0)
        var res = []
        for (var i = 0; i < n; i ++) {
            var count = 0
            for (var j = 0; j < val.length; j ++) {
                if (!comparator(ary[i],val[j])) count ++
            }
            if (count == val.length) judge[i] = 1
        }
        for (var i = 0; i < n; i ++) {
            if (judge[i] == 1) res.push(ary[i])
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
    //返回一个包含所有传入数组交集元素的新数组
    function intersectionBy	(...ary) {
        var iteratee = ary[ary.length - 1]
        iteratee = processJudge(iteratee)
        ary.pop()
        var map = {}
        var n = ary.length
        var res = []
        var ary1 = ary[0]
        for (var i = 0; i < n; i++) {
            for (var j = 0; j < ary[i].length; j++) {
                map[iteratee(ary[i][j])] ? map[iteratee(ary[i][j])]++ : map[iteratee(ary[i][j])] = 1
            }
        }
        for (var key in map) {
            if (map[key] == n) {
                for (var i = 0; i <ary1.length; i ++) {
                    if (iteratee(ary1[i]) == Number(key)) {
                        res.push(ary1[i])
                        break
                    }
                }
            }
        }
        return res
    
    }
    //返回一个包含所有传入数组交集元素的新数组
    function intersectionWith(...arys) {
        var comparator = arys.pop()
        comparator = processJudge(comparator)
        var ary = arys[0]
        var res = []
        for (var a of ary) {
            for (var b of arys[1]) {
                if (comparator(a,b)) res.push(a)
            }
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
    //返回数组第一个以外的数组
    function tail (ary) {
        if (ary.length == 0) return ary
        return  ary.slice(1)
    }
    //返回 array 数组的切片（从起始元素开始n个元素
    function take (ary,n = 1) {
        if (n == 0) return []
        if (n >= ary.length) {
            return ary
        } else {
            return ary.slice(0,n)
        }
    }
    //返回 array 数组的切片（从结尾元素开始n个元素）
    function takeRight(ary,n = 1) {
        if (n == 0) return []
        if (n >= ary.length) {
            return ary
        } else {
            return ary.slice(ary.length - n)
        }        
    }
    //从array数组的最后一个元素开始提取元素，直到 predicate 返回假值。
    function takeRightWhile(ary,predicate) {
        predicate = processJudge(predicate)
        for (var i = ary.length - 1; i >=0; i --) {
            if (!predicate(ary[i])) return ary.slice(i+1)
        }
        return []
    }
    //
    function takeWhile(ary,predicate) {
        predicate = processJudge(predicate)
        var res =[]
        for (var i = 0; i < ary.length - 1; i ++) {
            if (!predicate(ary[i],i,ary)) {
                break
            }
            res.push(ary[i])
        }
        return res
    }
    //创建一个按顺序排列的唯一值的数组
    function union(...arys) {
        var res = []
        for (var a of arys) {
            for (var b of a) {
                if (!res.includes(b)) res.push(b)
            }
        }
        return res
    }
    //
    function unionBy(...arys) {
        let predicate = arys.pop()
        predicate = processJudge(predicate)
        let res = []
        let map = []
        for (let i = 0; i < arys.length ; i ++) {
            for (let j = 0; j <arys[i].length ; j++) {
                if (!map.includes(predicate(arys[i][j]))) {
                    res.push(arys[i][j])
                    map.push(predicate(arys[i][j]))
                }
            }
        }
        return res
    }
    //
    function unionWith(...arys) {
        let comparator = processJudge(arys.pop())
        let a = arys.shift()
        let b = [].concat(...arys)
        for (let c of a) {
             b = b.filter(num => !comparator(num,c))
        }
        return a.concat(b)

    }
    //这个方法类似_.sortedIndex ，除了它接受一个 iteratee（迭代函数），
    //调用每一个数组（array）元素，返回结果和value 值比较来计算排序。iteratee 会传入一个参数：(value)。
    function sortedIndexBy(ary, val, iteratee) {
        iteratee = processJudge(iteratee)
        for (let i = 0; i < ary.length; i++) {
            if (iteratee(ary[i]) >= iteratee(val))
                return i
        }
        return ary.length
    }
    //这个方法类似_.indexOf，除了它是在已经排序的数组array上
    //执行二进制检索
    function sortedIndexOf(ary,val)  {
        if (val != val) {
            for (var i = 0; i < ary.length;i ++) {
                if (ary[i] != ary[i]) return i
            }
            return -1
        }
        for (var i = 0; i < ary.length;i ++) {
            if (ary[i] == val) return i
        }
        return -1  
    }
    //此方法类似于_.sortedIndex，除了它返回value值
    //在array中尽可能大的索引位置（index）
    function sortedLastIndex(ary,val)  {
        var n = ary.length
        if (val >= ary[n-1]) return n
        for (var i = n - 2; i >= 0;i --) {
            if (ary[i+1] >= val && ary[i] <= val) return i + 1
        }
        if (val < ary[0]) return 0
        return -1  
    }
    //返回value值应该在数组array中插入的索引位置index
    function sortedLastIndexBy(ary, val, iteratee) {
        iteratee = processJudge(iteratee)
        for (let i = ary.length - 1; i >= 0; i--) {
            if (iteratee(ary[i]) <= iteratee(val))
                return i + 1
        }
        return -1
    }
    function sortedLastIndexOf (ary,val) {
        for (var i = ary.length -1 ;i >= 0; i --) {
            if (ary[i] == val) return i
        }
        return -1
    }
    //返回一个新的不重复排序的数组
    function sortedUniq(ary) {
        var res = []
        for (var i = 0; i < ary.length; i ++) {
            if (!res.includes(ary[i])) res.push(ary[i])
        }
        return res      
    }
    //
    function sortedUniqBy(ary,iteratee) {
        var res = []
        var map = []
        for (var i = 0; i < ary.length; i ++) {
            if (!map.includes(iteratee(ary[i]))) {
                res.push(ary[i])
                map.push(iteratee(ary[i]))
            }
        }
        return res   
    }
    //返回新的去重后的数组
    function uniq(ary) {
        var res = []
        for (var i = 0; i < ary.length; i ++) {
            if (!res.includes(ary[i])) res.push(ary[i])
        }
        return res
    }
    //
    function uniqBy(ary,predicate) {
        let res = []
        let map =[]
        predicate = processJudge(predicate)
        for (let i =0; i < ary.length; i++) {
            if (!map.includes(predicate(ary[i]))) {
                res.push(ary[i])
                map.push(predicate(ary[i]))
            }
        }
        return res
    }
    function every (ary,predicate) {
        predicate = processJudge(predicate)
        for (var val of ary) {
            if (!predicate(val)) return false
        }
        return true
    }
    //遍历 collection（集合）元素，返回 predicate（断言函数）
    //返回真值 的所有元素的数组
    function filter (ary,predicate) {
        var res =[]
        predicate = processJudge(predicate)
        for (var val of ary) {
            if (predicate(val)) res.push(val)
        }
        return res
    }
    //遍历 collection（集合）元素，返回 predicate（断言函数）第一个返回真值的第一个元素
    function find (ary,predicate,fromIndex=0) {
        predicate = processJudge(predicate)
        for (var i = fromIndex; i < ary.length; i ++) {
            if (predicate(ary[i])) return ary[i]
        }
        return undefined
    }
    function findLast (ary,predicate,fromIndex= ary.length -1) {
        predicate = processJudge(predicate)
        for (var i = fromIndex; i >= 0; i --) {
            if (predicate(ary[i])) return ary[i]
        }
        return undefined
    }
    function flatMap(col, iteratee) {
        iteratee = processJudge(iteratee)
        return flatten(col.map(it => iteratee(it)))
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
    //创建一个深比较的方法来比较给定的对象和 source 对象。 如果给定的对象拥有相同的属性值返回 true，
    //否则返回 false
    function matches(obj) {
        return partialDeepEqual.bind(null, obj)
    }
    //判断输入是否为数组
    function isArray (value) {
        return Object.prototype.toString.call(value) == '[object Array]'
    }
    //判断两者是否完全相等
    function isEqual(x, y) {
        if (x === y) {
            return true
        }
        if (x !== x && y !== y) {
            return true
        }
        if (x === null || y === null || typeof x !== 'object' || typeof y !== 'object') {
            return false
        }
        if (Object.keys(x).length !== Object.keys(y).length) {
            return false
        }
        for (let key in x) {
            if (!(key in y) || !isEqual(x[key], y[key])) {
                return false
            }
        }
        return true
    }
    //deepequal
    function partialDeepEqual(s, t) {
        if (s === t) return true;
    
        if (s == null || typeof s != "object" ||
            t == null || typeof t != "object")
          return false;
    
        for (var prop in s) {
          if (!(prop in t) || !partialDeepEqual(s[prop], t[prop]))
            return false;
        }
    
        return true;
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
        sortedIndexBy,
        sortedIndexOf,
        sortedLastIndex,
        sortedLastIndexBy,
        sortedLastIndexOf,	
        uniq,
        toArray,
        max,
        min,
        sum,
        concat,
        matches,
        isArray,
        isEqual,
        pullAll,
        tail,
        take,
        takeRight,
        union,
        every,
        filter,
        find,
        findLast,
        flatMap,
        differenceBy,
        dropRightWhile,
        dropWhile,
        intersectionBy,
        intersectionWith,
        pullAllBy,
        pullAllWith,
        sortedUniq,
        sortedUniqBy,
        takeRightWhile,
        takeWhile,
        unionBy,
        unionWith,
        uniqBy,

    }

} ();