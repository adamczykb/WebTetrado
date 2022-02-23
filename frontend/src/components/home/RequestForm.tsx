
import { message, Input, Button, Switch, Form } from 'antd';
import Dragger from 'antd/lib/upload/Dragger';
import { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import config from '../../config.json'
import { processingRequest } from '../../utils/adapters/ProcessingRequest';
import { useCookies } from 'react-cookie';
export const RequestForm = () => {
    const [cookies, setCookie] = useCookies(["userId"]);

    let form_values = {
        fileId: '',
        rscbPdbId:'',
        userId:cookies.userId,
        settings:{
            complete2d:false,
            noReorder:false,
            stackingMatch:2,
            strict:false
        }
    }
    
    const [formValues, setFormValues] = useState(form_values);
    const [loading,setLoading]=useState(false);
    const props = {
        name: 'structure',
        multiple: false,
        action: config.SERVER_URL+'/api/upload/structure/',
        maxCount: 1,
        beforeUpload: (file: File) => {
            const isCifOrPdb = file.type === 'text/plain' || file.type === 'chemical/x-cif' || file.type === 'chemical/x-pdb';
            if (!isCifOrPdb) {
                message.error(`${file.name} is not a proper file`);
            }
            return isCifOrPdb;
        },
        onRemove(info: any) {
            setFormValues({...formValues, fileId: '' })
        },
        onChange(info: any) {
            const { status } = info.file;
            if (status !== 'uploading') {
                message.info('Uploading file in progress...');
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
                setFormValues({...formValues,rscbPdbId:'', fileId: info.file.response.id})
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
                setFormValues({...formValues, fileId: '' })
            }

        },
        onDrop(e: any) {
        },
    };
    const submit = () => {
        if(formValues.fileId=='' && formValues.rscbPdbId==''){
            message.error('None of structure sources are provided 😱')
            return null
        }
        if(formValues.settings.stackingMatch<1 && formValues.settings.stackingMatch>2){
            message.error('Wrong value in stacking match option')
            return null
        }
        setLoading(true);
        processingRequest(formValues);
      };
    return (
        <Form
        labelCol={{ span: 16 }}
        wrapperCol={{ span: 32 }}
        >
            <div className={'horizontal-center'} >
                <div>
                    <div style={{ width: '400px', height: '200px' }}>
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
                        <Form.Item>
                        <Input name='rcsbPdbId' value={formValues.rscbPdbId} onChange={(e)=>setFormValues({...formValues,rscbPdbId:e.target.value.toUpperCase()})} disabled={formValues.fileId!=''} style={{ width: '200px', paddingTop: '2px', paddingBottom: '2px' }} placeholder={'PDB ID eg. 1D59 '} maxLength={4} />
                        </Form.Item>
                    </div>
                </div>
            </div>
            <div className={'horizontal-center'} style={{ paddingTop: '30px', fontSize: '17px' }} >
                <div className='requestSetting' style={{ width: '300px', paddingRight:'70px'}}>
                    <Form.Item label='Complete 2D' valuePropName="checked">
                        <Switch size="small" checkedChildren="Yes" unCheckedChildren="No"  onChange={()=>setFormValues({...formValues, settings:{...formValues.settings,complete2d: !formValues.settings.complete2d}})}/>
                    </Form.Item>
                    <Form.Item label='No reorder' valuePropName="checked">
                        <Switch size="small" checkedChildren="Yes" unCheckedChildren="No"  onChange={()=>setFormValues({...formValues, settings:{...formValues.settings,noReorder: !formValues.settings.noReorder}})}/>
                    </Form.Item>
                    <Form.Item label='Strict' valuePropName="checked">
                        <Switch size="small" checkedChildren="Yes" unCheckedChildren="No"  onChange={()=>setFormValues({...formValues, settings:{...formValues.settings,strict: !formValues.settings.strict}})}/>
                    </Form.Item>
                    <Form.Item label='Stacking mismatch'>
                        <Input size="small" type={'number'} min="1" max="2" value={formValues.settings.stackingMatch} onChange={(e)=> setFormValues({...formValues, settings:{...formValues.settings,stackingMatch: e.target.valueAsNumber}})}/>
                    </Form.Item>
                </div>
            </div>
            <div className={'horizontal-center'} style={{ paddingTop: '30px' }} >
            <Form.Item>
                <Button  htmlType="submit" type="primary" loading={loading} onClick={submit}>Send request</Button>
                </Form.Item>
            </div>
        </Form>
    )
}