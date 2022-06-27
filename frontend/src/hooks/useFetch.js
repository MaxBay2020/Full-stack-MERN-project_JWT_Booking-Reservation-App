import axios from 'axios'
import {useEffect, useState} from "react";

// 这是自定义的hook，也就是一个方法
// 这个方法接受一个url，也就是后端的api地址
// 注意！虽然这是我们自定义的hook，也就是方法，但是！里面它也会根据里面变量的改变而重新执行！如，loading从false变成true时，也会重新执行这个hook（方法）
const useFetch = (url) => {
    const [data, setData] = useState([])

    // 用来加载页面的变量
    const [loading, setLoading] = useState(false)

    // 如果获取数据失败，则将error变成true
    const [error, setError] = useState(false)

    useEffect(()=>{
        fetchData()
    }, [url]) // 如果url改变，就运行里面的方法

    // 获取后端api数据的方法
    const fetchData = async () => {
        setLoading(true)
        setError(false)

        try{
            const res = await axios.get(url)
            res.status === 200 && setData(res.data)
            setLoading(false)
        }catch (e) {
            setError(true)
        }

    }

    // 将这些变量和方法返回
    return { data, loading, error, fetchData }

    // // 再一次获取后端api数据的方法
    // const reFetch = async () => {
    //     setLoading(true)
    //     setError(false)
    //
    //     try{
    //         const res = await axios.get(url)
    //         res.status === 200 && setData(res.data)
    //     }catch (e) {
    //         setError(true)
    //     }
    //     setLoading(false)
    // }
}

export default useFetch

