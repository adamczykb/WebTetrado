import { message } from 'antd';
import config from '../../config.json'
type form_values = {
    fileId: string,
    rscbPdbId:string,
    userId:string,
    settings:{
        complete2d:boolean,
        noReorder:boolean,
        stackingMatch:number,
        strict:boolean
    }
}
export function processingRequest(data:form_values) {
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
    };
    fetch(config.SERVER_URL + '/api/process/request/', requestOptions)
        .then(response => response.json())
        .then(response => {
            window.open('http://127.0.0.1:3000/result/'+response.orderId, '_self')
        }).catch((error) => message.error('Processing error'));
}