import { Input, Button } from "antd";
import { useState } from "react";

export const Results = () => {
  let [inputValue, setInputValue] = useState("");

  return (
    <div className={"horizontal-center"}>
      <div
        className={"vertical-center"}
        style={{ width: "70%", flexDirection: "row-reverse" }}
      >
        <Input.Group compact>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{
              width: "calc(100% - 67px)",
              paddingTop: "2px",
              paddingBottom: "2px",
              marginBottom: "20px",
              fontSize: "20px",
            }}
            placeholder={"Result code"}
            maxLength={100}
          />
          <Button
            type="primary"
            style={{ height: "38px" }}
            onClick={() => {
              if (inputValue != "")
                window.open("/result/" + inputValue, "_self");
            }}
          >
            Show
          </Button>
        </Input.Group>
      </div>
    </div>
  );
};
