import { Input, Button, Table } from "antd";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { clientRequestList } from "../../utils/adapters/ClientRequestList";

type result_fileds = {
  orderId: number;
  structure: string;
  date: string;
};

export const Results = () => {
  let _data: result_fileds[] = [];
  let [loading, setLoading] = useState(true);
  let [inputValue, setInputValue] = useState("");
  let [data, setData] = useState(_data);
  const [cookies, setCookie] = useCookies(["userId"]);

  useEffect(() => {
    clientRequestList(setData, setLoading,cookies.userId);
  }, []);
  const columns = [
    {
      title: "Order number",
      dataIndex: "orderId",
      key: "orderId",
      render: (text: Text) => (
        <a href={"/result/" +  text }>{text}</a>
      ),
    },
    {
      title: "Structure",
      dataIndex: "structure",
      key: "structure",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];

  return (
    <div className={"horizontal-center"}>
      <div
        className={"vertical-center"}
        style={{ width: "500px", flexDirection: "row-reverse" }}
      >
        <Input.Group compact style={{ width: "300px" }}>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{
              width: "200px",
              paddingTop: "2px",
              paddingBottom: "2px",
              fontSize: "17px",
            }}
            placeholder={"Order number"}
            maxLength={4}
          />
          <Button type="primary" onClick={()=> {if(inputValue!='') window.open('/result/'+inputValue,'_self')} }>Show</Button>
        </Input.Group>
      </div>
      <div className="split-layout__divider" style={{ width: "90px" }}>
        <div className="split-layout__rule"></div>
        <div className="split-layout__label">Or</div>
        <div className="split-layout__rule"></div>
      </div>
      <div style={{ width: "500px" }}>
        <Table
          size={"small"}
          columns={columns}
          loading={loading}
          dataSource={data}
        />
      </div>
    </div>
  );
};
