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
    //
    function uniqWith(ary,comparator) {
        var res = []
        ary.forEach(it => {
            if (res.every(a => !comparator(a, it))) res.push(it)
        })
        return res
    }
    //
    function unzip(arys) {
        var n = arys[0].length
        var m = arys.length
        var res = []
        for (var i = 0;i < n ; i ++) {
            res.push([])
        }
        for (var i = 0 ; i < m; i ++) {
            for (var j = 0; j < n;j ++) {
                res[j][i]= arys[i][j]
            }
        }
        return res
    }
    //
    function unzipWith(ary,predicate) {
        predicate = processJudge(predicate)
        ary = unzip(ary)
        var res = ary.map((it) => predicate(...it))
        return res
    }
    //返回过滤值后的新数组
    function without(ary,...val) {
        return ary.filter(it => !val.includes(it))
    }
    //返回所有数组都不重复的值的数组
    function xor(...ary) {
        ary = flatten(ary)
        var map = {}
        var res = []
        for (var i = 0; i < ary.length; i ++ ) {
            map[ary[i]] ? map[ary[i]] ++ : map[ary[i]] = 1
        }
        for (var key in map) {
            if (map[key] == 1) res.push(+key)
        }
        return res
    }
    //
    function xorBy(...ary) {
        var predicate = processJudge(ary.pop())
        ary = flatten(ary)
        var map = {}
        var res = []
        for (var i = 0; i < ary.length; i ++ ) {
            map[predicate(ary[i])] ? map[predicate(ary[i])] ++ : map[predicate(ary[i])] = 1
        }
        for (var key in map) {
            if (map[key] == 1) {
                for (var i = 0; i < ary.length; i ++) {
                    if ((+key) == predicate(ary[i])) {
                        res.push(ary[i])
                        break
                    }
                }
            }
        }
        return res
    }
    //
    function xorWith(ary,oth,comparator) {
        var res = ary.slice()
        var reso = oth.slice()
        for (var i = 0; i < res.length; i ++) {
            for (var j = 0; j < reso.length; j ++) {
                if (comparator(res[i],reso[j])) {
                    res.splice(i,1)
                    reso.splice(j,1)
                    j = -1
                }
            }
        }
        return res.concat(reso)
    }
    //创建一个分组元素的数组，数组的第一个元素包含所有给定数组的第一个元素，
    //数组的第二个元素包含所有给定数组的第二个元素，以此类推。
    function zip(...arys) {
        var n = arys[0].length
        var m = arys.length
        var res = []
        for (var i = 0;i < n ; i ++) {
            res.push([])
        }
        for (var i = 0 ; i < m; i ++) {
            for (var j = 0; j < n;j ++) {
                res[j][i]= arys[i][j]
            }
        }
        return res
    }
    //第一个数组中的值作为属性标识符（属性名），第二个数组中的值作为相应的属性值。
    function zipObject(key,val) {
        var res = {}
        for (var i = 0; i <key.length; i ++) {
            res[key[i]] = val[i]
        }
        return res
    }
    //这个方法类似于_.zip，不同之处在于它接受一个 iteratee（迭代函数），
    //来 指定分组的值应该如何被组合。 该iteratee调用每个组的元素： (...group).
    function zipWith(...arys) {
        var predicate = arys.pop()
        var res = zip(...arys)
        return res.map(it => predicate(...it))
    }
    //创建一个组成对象，key（键）是经过 iteratee（迭代函数） 
    //执行处理collection中每个元素后返回的结果，每个key（键）对应的值
    //是 iteratee（迭代函数）返回该key（键）的次数（注：迭代次数）。
    // iteratee 调用一个参数：(value)。
    function countBy(ary,iteratee) {
        var res = {}
        var iteratee = processJudge(iteratee)
        for (var k of ary) {
            res[iteratee(k)] ?  res[iteratee(k)] ++ : res[iteratee(k)] = 1
        }
        return res
    }
    //每个元素都为真返回真
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
        return flatten(col.map(it => iteratee(it)))
    }
    //
    function flatMapDeep(col, iteratee) {
        return flattenDeep(col.map(it => iteratee(it)))
    }
    //
    function flatMapDepth(col, iteratee,n) {
        return flattenDepth(col.map(it => iteratee(it)),n)
    }
    //
    function forEach(col,iteratee) {
        if (Array.isArray(col)) {
            for (var k of col) {
                iteratee(k)
            }
        }
        if (typeof col == 'Object') {
            for (var key of col) {
                iteratee(key,col[key])
            }
        }
        return col
    }
    //
    function forEachRight(col,iteratee) {
        for (var i = col.length -1;i >=0;i--) {
            iteratee(col[i])
        }
        return col
    }
    //创建一个对象，key 是 iteratee 遍历 collection(集合) 中的每个元素返回的结果。
    // 分组值的顺序是由他们出现在 collection(集合) 中的顺序确定的。每个键对应的值
    //负责生成 key 的元素组成的数组。iteratee 调用 1 个参数： (value)。
    function groupBy(col,iteratee) {
        iteratee = processJudge(iteratee)
        var res = {}
        for (var a of col) {
            res[iteratee(a)] ? res[iteratee(a)].push(a) : res[iteratee(a)] = [a]
        }
        return res
    }
    //
    function includes(col,val,fromIndex = 0) {
        if (Array.isArray(col)) {
            if (fromIndex >= 0) {
                for (var i = fromIndex;i < col.length; i ++ ) {
                    if (col[i] == val) return true
                }
                return false
            } else {
                for (var i = fromIndex;i >= 0; i -- ) {
                    if (col[i] == val) return true
                }
                return false                
            }
        }
        if (typeof col == 'object') {
            for (var key in col) {
                if (col[key] == val) return true
            }
            return false
        }
        if (typeof col == 'string') {
            var n = val.length
            for (var i = 0; i < col.length - n; i ++ ) {
                var x = ''
                for (var j = i; j <= i + n -1; j ++) {
                    x += val[j]
                }
                if (x == val) return true
            } 
            return false
        }
    }
    //调用path（路径）上的方法处理 collection(集合)中的每个元素，返回一个数组，
    //包含每次调用方法得到的结果。任何附加的参数提供给每个被调用的方法。
    //如果methodName（方法名）是一个函数，每次调用函数时，
    //内部的 this 指向集合中的每个元素。
    function invokeMap(col,path,...args) {
        if (typeUtils.isString(path)) {
            return col.map(it => it[path](...args))
        }
        if (typeUtils.isFunction(path)) {
            return col.map(it => path.call(it, ...args))
        }
    }
    //创建一个对象组成， key（键） 是 collection（集合）中的每个元素经过
    // iteratee（迭代函数） 处理后返回的结果。 每个 key（键）对应的值是生成key（键）
    //的最后一个元素。iteratee（迭代函数）调用1个参数：(value)。
    function keyBy(col,iteratee) {
        iteratee = processJudge(iteratee)
        var res = {}
        for (var a of col) {
            res[iteratee(a)] = a
        }
        return res
    }  
    //创建一个数组， value（值） 是 iteratee（迭代函数）遍历
    // collection（集合）中的每个元素后返回的结果。 iteratee（迭代函数）
    //调用3个参数:value, index|key, collection).  
    function map(col,iteratee) {
        var res = []
        iteratee = processJudge(iteratee)
        if (Array.isArray(col)) {
            col.forEach((a,b,c) => 
            res.push(iteratee(a,b,c)))
        }
        if (Object.prototype.toString.call(col) == "[object Object]") {
            for (var b in col) {
                res.push(iteratee(col[b],b,col))
            }
        }
        return res
    }
    //此方法类似于_.sortBy，除了它允许指定 iteratee（迭代函数）结果如何排序。
    //如果没指定 orders（排序），所有值以升序排序。 否则，指定为"desc" 降序，
    //或者指定为 "asc" 升序，排序对应值。
    function orderBy(col,iteratee,orders) {
        var n = iteratee.length
        var res = col.slice()
        if (!orders) {
            orders = []
            for (var i = 1; i <= n;i ++) {
                orders.push("asc")
            }
        }
        for (var i = orders.length -1; i >=0; i --) {
            var predicate = processJudge(iteratee[i])
            if (orders[i] == "asc") {
                res.sort((a,b)=> predicate(b) - predicate(a))
            } else {
                res.sort((a,b)=> predicate(a) - predicate(b))
            }
        }
        return res
    }
    //创建一个分成两组的元素数组，第一组包含predicate（断言函数）返回为 truthy（真值）
    //的元素，第二组包含predicate（断言函数）返回为 falsey（假值）的元素。
    //predicate 调用1个参数：(value) 
    function partition(col,predicate) {
        predicate = processJudge(predicate)
        var res = [[],[]]
        for (var a of col) {
            if (predicate(a)) {
                res[0].push(a)
            } else {
                res[1].push(a)
            }
        }
        return res
    }
    //压缩 collection（集合）为一个值，通过 iteratee（迭代函数）遍历 collection
    //（集合）中的每个元素，每次返回的值会作为下一次迭代使用(注：作为iteratee
    //（迭代函数）的第一个参数使用)。 如果没有提供 accumulator，则 collection（集合）
    //中的第一个元素作为初始值。(注：accumulator参数在第一次迭代的时候作为iteratee
    //（迭代函数）第一个参数使用。) iteratee 
    //调用4个参数：accumulator, value, index|key, collection).
    function reduce (col,iteratee,accumulator) {
            if (accumulator == null) {
                accumulator = Array.isArray(col)? 0 : {}
            }
            if (Array.isArray(col)) {
                for (let i = 0; i < col.length; i++) {
                    accumulator = iteratee(accumulator, col[i], i, col)
                }
            } else {
                for (let key in col) {
                    accumulator = iteratee(accumulator, col[key], key, col)
                }
            }
            return accumulator
    }
    function reduceRight (col,iteratee,accumulator) {
        if (accumulator == null) {
            accumulator = Array.isArray(col)? 0 : {}
        }
        if (Array.isArray(col)) {
            for (let i = col.length; i >= 0; i--) {
                accumulator = iteratee(accumulator, col[i], i, col)
            }
        } else {
            for (let key in col) {
                accumulator = iteratee(accumulator, col[key], key, col)
            }
        }
        return accumulator
    }
    //_.filter的反向方法;此方法 返回 predicate（断言函数)
    //不返回 truthy（真值）的collection（集合）元素（注释：非真）
    function reject (col,predicate) {
        predicate = processJudge(predicate)
        return col.filter(it => !predicate(it))
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
        uniqWith,
        zip,
        unzip,
        unzipWith,
        without,
        xor,
        xorBy,
        xorWith,
        zipObject,
        zipWith,
        countBy,
        flatMapDeep,
        flatMapDepth,
        forEach,
        forEachRight,
        groupBy,
        includes,
        invokeMap,
        keyBy,
        map,
        orderBy,
        partition,
        reduce,
        reduceRight,
        reject,
        

    }

} ();