
import {  message, Input, Button, Switch, Form } from 'antd';
import Dragger from 'antd/lib/upload/Dragger';
import { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';

export const RequestForm = ()=>{
    let input_props = {
        from_file: false
    }
    const [dragOptions, setDragOptions] = useState(input_props);
    const props = {
        name: 'structure',
        multiple: false,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        maxCount: 1,
        beforeUpload: (file: File) => {
            const isCifOrPdb = file.type === 'text/plain' || file.type === 'chemical/x-cif' || file.type === 'chemical/x-pdb';
            if (!isCifOrPdb) {
                message.error(`${file.name} is not a proper file`);
            }
            return isCifOrPdb;
        },
        onRemove(info: any) {
            setDragOptions({ from_file: false });
        },
        onChange(info: any) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
                setDragOptions({ from_file: true });
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
                setDragOptions({ from_file: false })

            }

        },
        onDrop(e: any) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };
    return(
    <Form>
        <div className={'horizontal-center'} >
            <div>
                <div style={{ width: '400px', height: '230px' }}>
                    <Dragger {...props} style={{ padding: '20px' }}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <h3 className="ant-upload-text">Click or drag file to this area to upload</h3>
                        <h3 className="ant-upload-hint">
                            *.cif, *.pdb
                        </h3>
                    </Dragger>
                </div>
            </div>
            <div className="split-layout__divider" style={{ width: '90px' }}>
                <div className="split-layout__rule"></div>
                <div className="split-layout__label">Or</div>
                <div className="split-layout__rule"></div>
            </div>
            <div style={{ width: '400px' }} className={'vertical-center'}>
                <div>
                    <p style={{ margin: '0' }}>Get structure from RCSB:</p>
                    <Input disabled={dragOptions.from_file} style={{ width: '200px', paddingTop: '2px', paddingBottom: '2px' }} placeholder={'PDB ID eg. 1D59 '} maxLength={4} />
                </div>
            </div>
        </div>
        <div className={'horizontal-center'} style={{ paddingTop: '30px',fontSize:'17px' }} >
            <div style={{ width: '200px', paddingRight: '5px', textAlign: 'right' }}>
                Complete 2D: <br />
                No reorder: <br />
                Stacking mismatch: <br />
                Strict:
            </div>
            <div style={{ width: '200px', paddingLeft: '5px' }}>
                <Switch size="small" checkedChildren="Yes" unCheckedChildren="No" /><br />
                <Switch size="small" checkedChildren="Yes" unCheckedChildren="No" /><br />
                <Switch size="small" checkedChildren="Yes" unCheckedChildren="No" /><br />
                <Switch size="small" checkedChildren="Yes" unCheckedChildren="No" /><br />
            </div>
        </div>
        <div className={'horizontal-center'} style={{ paddingTop: '30px' }} >
            <Button type="primary">Send request</Button>
        </div>
    </Form>
    )
}