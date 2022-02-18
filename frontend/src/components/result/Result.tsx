import { Descriptions, Steps, Table, Image, Button } from "antd";
import { useParams } from "react-router-dom";
const { Step } = Steps;
import { DownloadOutlined } from '@ant-design/icons';
import { Divider } from "../layout/common/Divider";
const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];

const columns_tetrad = [
  {
    title: 'Tetrad ID',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Sequence',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'ONZ Class',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Planarity [Å]',
    dataIndex: 'address',
    key: 'address',
  },
];

const columns_tetrad_pairs = [
  {
    title: 'Tetrad pairs',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Twist [°]',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Rise [Å]',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Strand direction',
    dataIndex: 'address',
    key: 'address',
  },
];

const columns_loops = [
  {
    title: 'Loop ID',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Short sequence',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Full sequence',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Loop length',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Loop type',
    dataIndex: 'address',
    key: 'address',
  },
];

const columns_chi = [
  {
    title: 'Tetrad ID',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Nucleotide 1',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Nucleotide 2',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Nucleotide 3',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Nucleotide 4',
    dataIndex: 'address',
    key: 'address',
  }
];
export const Result = () => {
  const { requestNumber } = useParams();
  return (<>
    <h1 style={{ marginTop: '20px' }}>Request number #{requestNumber}</h1>

    <Steps current={4} status="process">
      <Step title="Make request" description="" />
      <Step title="Waiting in queue" description="" />
      <Step title="Processing" description="" />
      <Step title="Done" description="" />
    </Steps>

    <Divider />

    <h2 id='result' style={{ marginTop: '40px' }}>Helica Structure of DNA by Design: The T(GGGG)T Hexad Alignment</h2>
    <Descriptions
      title="Analytics result"
      bordered
      layout="vertical"
      labelStyle={{ fontWeight: 'bold' }}
    >
      <Descriptions.Item label="PDB ID">1xce</Descriptions.Item>
      <Descriptions.Item label="Assembly ID">1</Descriptions.Item>
      <Descriptions.Item label="Molecule">DNA</Descriptions.Item>
      <Descriptions.Item label="Experimental method">NMR</Descriptions.Item>
      <Descriptions.Item label="Type (by no. of strands)">bimolecular</Descriptions.Item>
      <Descriptions.Item label="No. of tetrads">2</Descriptions.Item>
      <Descriptions.Item label="ONZM class">Op+</Descriptions.Item>
      <Descriptions.Item label="Loop topology">n/a</Descriptions.Item>
      <Descriptions.Item label="Tetrad combination">VIII</Descriptions.Item>
    </Descriptions>
    <Divider />
    <h2 id='two-d-structure' style={{ marginTop: '40px' }}>2D structure (dot-bracket):</h2>
    <p style={{ whiteSpace: 'pre-wrap', fontSize: '20px', marginLeft: '10px', fontFamily: "'PT Mono', monospace" }}>
      GCGGTTGGAT-GCGGTTGGAT-GCGGTTGGAT-GCGGTTGGAT<br />
      ..([..)]..-..........-..([..)]..-..........<br />
      ..([..([..-..........-..)]..)]..-..........<br />
    </p>

    <Descriptions
      bordered
      layout="vertical"
      labelStyle={{ fontWeight: 'bold' }}
      style={{ marginTop: '40px' }}
      contentStyle={{ textAlign: 'center' }}

    >
      <Descriptions.Item label="VARNA" className="two-d-description-item">
        <div>
          <Image className="two-d-image" src={"https://onquadro.cs.put.poznan.pl/static/rchie/Q111.svg"} />
          <br />
          <Button type="primary" shape="round" icon={<DownloadOutlined />} style={{ marginTop: '15px' }} size={'large'}>
            Download
          </Button>
        </div>
      </Descriptions.Item>
      <Descriptions.Item label="R-chie" className="two-d-description-item">
        <div>
          <Image className="two-d-image" src={"https://onquadro.cs.put.poznan.pl/static/varna/Q111.svg"} />
          <br />
          <Button type="primary" shape="round" icon={<DownloadOutlined />} style={{ marginTop: '15px' }} size={'large'}>
            Download
          </Button>
        </div>
      </Descriptions.Item>
      <Descriptions.Item label="Layers" className="two-d-description-item">
        <div>
          <Image className="two-d-image" src={"https://onquadro.cs.put.poznan.pl/static/layers/Q111.svg"} />
          <br />
          <Button type="primary" shape="round" icon={<DownloadOutlined />} style={{ marginTop: '15px' }} size={'large'}>
            Download
          </Button>
        </div>
      </Descriptions.Item>
      <Descriptions.Item label="LiteMol" className="two-d-description-item">
        <div>
          <Image className="two-d-image" src={"https://onquadro.cs.put.poznan.pl/static/pymol/Q111.png"} />
          <br />
          <Button type="primary" shape="round" icon={<DownloadOutlined />} style={{ marginTop: '15px' }} size={'large'}>
            Download
          </Button>
        </div>
      </Descriptions.Item>
    </Descriptions>

    <Divider />

    <h2 id='tetrads' style={{ marginTop: '40px' }}>Tetrads</h2>
    <Table style={{ textAlign: 'center' }} dataSource={dataSource} columns={columns_tetrad} />

    <Divider />

    <h2 id='tetrad-pairs' style={{ marginTop: '40px' }}>Tetrad pairs</h2>
    <Table style={{ textAlign: 'center' }} dataSource={dataSource} columns={columns_tetrad_pairs} />

    <Divider />

    <h2 id='loops' style={{ marginTop: '40px' }}>Loops</h2>
    <Table style={{ textAlign: 'center' }} dataSource={dataSource} columns={columns_loops} />

    <Divider />

    <h2 id='chi-angle' style={{ marginTop: '40px' }}>Chi angle value and type in each nucleotide</h2>
    <Table style={{ textAlign: 'center' }} dataSource={dataSource} columns={columns_chi} />

  </>)
}