import { message } from 'antd';
import config from '../../config.json'

export function processingResponse(orderId:any,setResultSet:any,setLoading:any) {
    const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
    };
    fetch(config.SERVER_URL + '/api/process/result/'+orderId, requestOptions)
        .then(response => response.json())
        .then(response => {
            setResultSet(response);
            setLoading(false);
        }).catch((error) => message.error('Processing error'));
}