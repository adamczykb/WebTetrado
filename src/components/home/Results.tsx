import { Input, Button, Table } from "antd"


export const Results = () =>{

    const columns = [
        {
            title: 'Order number',
            dataIndex: 'id',
            key: 'id',
            render: (text: Text) => <a>{text}</a>,
        },
        {
            title: 'Structure',
            dataIndex: 'structure',
            key: 'structure',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        }
    ];

    return( 
    <div className={'horizontal-center'} >
    <div className={'vertical-center'} style={{ width: '500px', flexDirection: 'row-reverse' }}>
        <Input.Group compact style={{ width: '300px' }}>
            <Input style={{ width: '200px', paddingTop: '2px', paddingBottom: '2px',fontSize:'17px' }} placeholder={'Order number'} maxLength={4} />
            <Button type="primary">Show</Button>
        </Input.Group>
    </div>
    <div className="split-layout__divider" style={{ width: '90px' }}>
        <div className="split-layout__rule"></div>
        <div className="split-layout__label">Or</div>
        <div className="split-layout__rule"></div>
    </div>
    <div style={{ width: '500px' }}>
        <Table size={'small'} columns={columns} dataSource={[]} />
    </div>
</div>
)
}