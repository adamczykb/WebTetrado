import { Input, Button } from "antd";
import { useState } from "react";

export const Results = () => {
    let [inputValue, setInputValue] = useState("");

    return (
        <div className={"horizontal-center"}>
            <div
                className={"vertical-center"}
                style={{ width: "100%", maxWidth: '890px', flexDirection: "row-reverse" }}
            >
                <Input.Group compact>
                    <Input
                        value={inputValue}
                        onPressEnter={() => {
                            if (inputValue != "")
                                window.open("/result/" + inputValue, "_self");

                        }}
                        onChange={(e) => setInputValue(e.target.value)}
                        style={{
                            width: "calc(100% - 80px)",
                            paddingTop: "2px",
                            paddingBottom: "2px",
                            marginBottom: "20px",
                            fontSize: "20px",
                        }}
                        placeholder={"Task id"}
                        maxLength={100}
                    />
                    <Button
                        type="primary"
                        style={{ height: "38px" }}
                        disabled={inputValue.length == 0}
                        onClick={() => {
                            if (inputValue != "")
                                window.open("/result/" + inputValue, "_self");
                        }}
                    >
                        Submit
                    </Button>
                </Input.Group>
            </div>
        </div>
    );
};
