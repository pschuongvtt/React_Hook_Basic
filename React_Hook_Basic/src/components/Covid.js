import { useState, useEffect } from "react"; 
import axios from 'axios';
import moment from "moment";

/*Fetching data with UseEffect
Sever API: https://documenter.getpostman.com/view/10808728/SzS8rjbc 
*/
const Covid = () => {
    /*Định nghĩa mảng State - Lưu Data */
    const [dataCovid, setDataCovid] = useState([])

    /*Định nghĩa biến chỉ trạng thái - Lấy đươc hay không thông tin data
    Khi isLoading = true, khi không isLoading = false
    */
    const [isLoading, setIsLoading] = useState(true)

    /*Định nghĩa biến chỉ trạng thái error
    Nếu error = true (có lỗi), ngược lại = false (không lỗi)*/
    const [isError, setIsError] = useState(false)

    /*useState : Sau khi fetch data về lưu lại
      componentDidmount(): Lấy data về  trong Class Component = useEffect() trong Hook
      useEffect(()=>{}, []): componentDidmount()
    */
    useEffect(() => {
        (async function() {
            try {
                    //Sau 2s khi load dữ liệu ms chạy về 
                    //setTimeout(async() => {
                        //Lấy dữ liệu từ Server API - dùng axios
                        let res = await axios.get('https://api.covid19api.com/country/vietnam?from=2021-10-01T00%3A00%3A00Z&to=2021-10-20T00%3A00%3A00Z')
                        //Đặt 1 biến data nếu như có phản hồi về và phản hồi res có biến data thì ta lấy res.data. Ngược lại gán mảng = rỗng
                        let data =  res && res.data ? res.data : []
                        //Kiểm tra nếu có biến data và length > 0 thì sẽ lặp xuyên suốt để format và gán ngược lại mảng theo đúng hiển thị format Date
                        if(data && data.length >0){
                            data.map(item => {
                                item.Date = moment(item.Date).format("DD/MM/YYYY")
                            })
                        }
                        //Đảo ngược mảng 
                        data = data.reverse()
                        //Cập nhật rerender cho mảng dataCovid - hook useState
                        setDataCovid(data)
                        //Sau khi cập nhật xong setIsLoading = false 
                        setIsLoading(false)
                        //Check Log
                        console.log("Check request", res.data)
                    //}, 5000);
                    
                    //Set Error = true 
                    setIsError(false)
            } catch (e) {
                setIsError(true) 
                setIsLoading(false) 
                console.log("Check error: ", e)
                console.log("Error name:", e.name);
                console.log("Error message:", e.message);
            }
        })();
    }, []);

    return(
        <table id="DataDB">
            <thead>
                <tr>
                    <th>Date - Ngày</th>
                    <th>Active - Tổng số ca</th>
                    <th>Country - Tên quốc gia</th>
                    <th>CountryCode - Mã quốc qia</th>
                    <th>Deaths - Số ca tử vong</th>
                    <th>Recovered - Số ca hồi phục</th>
                </tr>
            </thead>
            <tbody>
                {/* Xây dựng vòng lặp map cho mảng dữ liệu dataCovid */}
                {
                    isError === false &&
                    isLoading === false &&
                    dataCovid && 
                    dataCovid.length>0 && 
                    dataCovid.map(item => {
                        return (
                            <tr key = {item.ID}>
                                <td>{item.Date}</td>
                                <td>{item.Active}</td>
                                <td>{item.Country}</td>
                                <td>{item.CountryCode}</td>
                                <td>{item.Deaths}</td>
                                <td>{item.Recovered}</td>
                            </tr>
                        )
                    })
                
                }

                {/* Nếu isLoading = false */}
                {
                    isLoading === true && 
                    <tr id="LoadingError">
                        <td colSpan='6'>Is Loading Data ...</td>
                    </tr>
                }

                {/* Kiểm tra nếu Error có lỗi */}
                {
                    isError === true && 
                    <tr id="LoadingError">
                        <td colSpan='6'>Somthing Wrong! ...</td>
                    </tr>
                }   
            </tbody>
        </table>
    ); 
}

export default Covid;