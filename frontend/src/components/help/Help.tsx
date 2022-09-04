import { Image, Collapse } from "antd";
import { Content } from "antd/es/layout/layout";
import { useMediaQuery } from "react-responsive";
import { Divider  } from "../layout/common/Divider";
import help_home_set_request from "../../assets/images/help_home_set_request.png";
import help_request_result from "../../assets/images/help_request_result.png";
import help_result_waiting from "../../assets/images/help_result_waiting.png";
import help_home_check_result from "../../assets/images/help_home_check_result.png";
import safari from "../../assets/images/234px-Safari_browser_logo.png";
import firefox from "../../assets/images/640px-Firefox_logo.png";
import chrome from "../../assets/images/Google_Chrome_icon_(September_2014).png";
import edge from "../../assets/images/microsoftedgenewlogo.jpg";

const { Panel } = Collapse;
export const Help = () => {
    let isDesktop = useMediaQuery({ query: "(min-width: 900px)" });
    let webbDaSilvaRoman = ['Ia','Ib','IIa','IIb','IIIa','IIIb','IVa','IVb','Va','Vb','VIa','VIb','VIIa','VIIb','VIIIa','VIIIb'];

    let renderContent = () => {
        return (
            <Content
                style={{ padding: isDesktop ? "0 24px" : "0 0", minHeight: 280 }} id='help-navigation'
            >
                <div className="site-layout-content">
                    <h1>Help</h1>
                    <h2>Table of contents</h2>
                    <ol>
                        <li> 
                            <a href={'#navigation'}
                                onClick={()=>{
                                    (document.getElementById("navigation"))!.scrollIntoView({
                                        behavior:'smooth',
                                        block:'start',
                                        inline: 'nearest'
                                    })
                                }} >Navigation</a>
                                <ol  style={{paddingLeft:'10px'}}>
                                    <li>
                                        <a 
                                            href={"#home_paragraph"}
                                            onClick={()=>{
                                                (document.getElementById("home_paragraph"))!.scrollIntoView({
                                                    behavior:'smooth',
                                                    block:'start',
                                                    inline: 'nearest'
                                                })
                                            }}>
                                                Home
                                            </a>
                                            <ol style={{paddingLeft:'10px'}}>
                                                <li>
                                                    <a 
                                                        href={"#home_set_reqeust"}
                                                        onClick={()=>{
                                                            (document.getElementById("home_set_request"))!.scrollIntoView({
                                                                behavior:'smooth',
                                                                block:'start',
                                                                inline: 'nearest'
                                                            })
                                                        }}>
                                                            Set request
                                                        </a>        
                                                    </li>
                                                    <li>
                                                        <a 
                                                            href={"#home_check_result"}
                                                            onClick={()=>{
                                                                (document.getElementById("home_check_result"))!.scrollIntoView({
                                                                    behavior:'smooth',
                                                                    block:'start',
                                                                    inline: 'nearest'
                                                                })
                                                            }}>
                                                                Check request
                                                            </a>        
                                                    </li>                                       </ol>
                                                </li>
                                                <li>
                                                    <a 
                                                        href={"#result_paragraph"}
                                                        onClick={()=>{
                                                            (document.getElementById("result_paragraph"))!.scrollIntoView({
                                                                behavior:'smooth',
                                                                block:'start',
                                                                inline: 'nearest'
                                                            })
                                                        }}>
                                                            Result
                                                        </a> 
                                                        <ol  style={{paddingLeft:'10px'}}>

                                                            <li>
                                                                <a 
                                                                    href={"#result_waiting_for_result"}
                                                                    onClick={()=>{
                                                                        (document.getElementById("result_waiting_for_result"))!.scrollIntoView({
                                                                            behavior:'smooth',
                                                                            block:'start',
                                                                            inline: 'nearest'
                                                                        })
                                                                    }}>
                                                                        Waiting for result
                                                                </a> </li>
                                                                <li>
                                                                    <a 
                                                                        href={"#result_request_result"}
                                                                        onClick={()=>{
                                                                            (document.getElementById("result_request_result"))!.scrollIntoView({
                                                                                behavior:'smooth',
                                                                                block:'start',
                                                                                inline: 'nearest'
                                                                            })
                                                                        }}>
                                                                            Request result</a></li>
                                                                </ol>
                                                            </li>

                                                        </ol>
                                                    </li>
                                                    <li>

                                                        <a href={"#webb_da_silva_classification"}
                                                            onClick={()=>{
                                                                (document.getElementById("webb_da_silva_classification"))!.scrollIntoView({
                                                                    behavior:'smooth',
                                                                    block:'start',
                                                                    inline: 'nearest'
                                                                })
                                                            }}>Webb da Silva classification</a>
                                                            <ol  style={{paddingLeft:'10px'}}>
                                                                <li>
                                                                    <a 
                                                                        href={"#webb_chi_angle"}
                                                                        onClick={()=>{
                                                                            (document.getElementById("webb_chi_angle"))!.scrollIntoView({
                                                                                behavior:'smooth',
                                                                                block:'start',
                                                                                inline: 'nearest'
                                                                            })
                                                                        }}>
                                                                            Chi angle
                                                                        </a> 
                                                                    </li>
                                                                    <li>
                                                                        <a 
                                                                            href={"#webb_loop_progression"}
                                                                            onClick={()=>{
                                                                                (document.getElementById("webb_loop_progression"))!.scrollIntoView({
                                                                                    behavior:'smooth',
                                                                                    block:'start',
                                                                                    inline: 'nearest'
                                                                                })
                                                                            }}>
                                                                                Loop progression
                                                                            </a>
                                                                        </li>
                                                                    </ol>
                                                                </li>

                                                                <li><a href={"#system_requirements"}
                                                                    onClick={()=>{
                                                                        (document.getElementById("system_requirements"))!.scrollIntoView({
                                                                            behavior:'smooth',
                                                                            block:'start',
                                                                            inline: 'nearest'
                                                                        })
                                                                    }}>System requirements</a></li>
                                                                <li><a href={"#funding"}
                                                                    onClick={()=>{
                                                                        (document.getElementById("funding"))!.scrollIntoView({
                                                                            behavior:'smooth',
                                                                            block:'start',
                                                                            inline: 'nearest'
                                                                        })
                                                                    }} >Funding</a></li>
                                                                <li><a>References</a></li>

                                                            </ol>
                                                            <h2 id={'navigation'}>1. Navigation</h2>
                                                            <div style={{ textAlign: "justify" }}>
                                                                <h3 id={'home_paragraph'}>1.1. Home</h3>
                                                                <h3 id={'home_set_reqeust'}>1.1.1. Set request</h3>
                                                                <div
                                                                    style={{
                                                                        width: "100%",
                                                                            display: "flex",
                                                                            alignItems: "center",
                                                                            justifyContent: "center",
                                                                    }}
                                                                >
                                                                    <Image alt={"infographic"} width={"75%"} src={help_home_set_request} />
                                                                </div>
                                                                <Divider/>
                                                                <h3 id={'home_check_reqeust'}>1.1.2. Check request</h3>
                                                                <div
                                                                    style={{
                                                                        width: "100%",
                                                                            display: "flex",
                                                                            alignItems: "center",
                                                                            justifyContent: "center",
                                                                    }}
                                                                >
                                                                    <Image alt={"infographic"} width={"75%"} src={help_home_check_result} />
                                                                </div> 
                                                                <Divider/>
                                                                <h3 id={'result_paragraph'}>1.2. Result</h3>
                                                                <h3 id={'result_waiting_for_result'}>1.2.1. Waiting for result</h3>
                                                                <div
                                                                    style={{
                                                                        width: "100%",
                                                                            display: "flex",
                                                                            alignItems: "center",
                                                                            justifyContent: "center",
                                                                    }}
                                                                >
                                                                    <Image alt={"infographic"} width={"75%"} src={help_result_waiting} />
                                                                </div>
                                                                <Divider/>
                                                                <h3 id={'result_request_result'}>1.2.1. Request result</h3>
                                                                <div
                                                                    style={{
                                                                        width: "100%",
                                                                            display: "flex",
                                                                            alignItems: "center",
                                                                            justifyContent: "center",
                                                                    }}
                                                                >
                                                                    <Image alt={"infographic"} width={"75%"} src={help_request_result} />
                                                                </div>
                                                            </div>
                                                            <Divider />
                                                            <h2 style={{ color: "#005675" }} id={"webb_da_silva_classification"}>
                                                                2. Webb da Silva classification
                                                            </h2>
                                                            <Collapse defaultActiveKey={1}>
                                                                <Panel header="2.1. Chi angle" key="1">
                                                                    <div
                                                                        style={{
                                                                            display: "flex",
                                                                                justifyContent: "center",
                                                                                flexWrap: "wrap",
                                                                        }} id={'webb_chi_angle'}
                                                                    >
                                                                        {Array.from(Array(13).keys()).map((v)=>{
                                                                            return Array.from(['a','b']).map((v1)=>{
                                                                                return <div style={{textAlign:'center',marginTop:'10px',width:'250px'}}>
                                                                                    <h3 style={{paddingTop:'10px'}}>{v+1}{v1}</h3>
                                                                                    <div
                                                                                        style={{ padding: "20px",width:'250px',height:'250px' }}
                                                                                    >
                                                                                        <Image src={require('../../assets/da-silva/'+(v+1).toString()+v1+'.svg')} height="100%"/>
                                                                                    </div>
                                                                                </div>

                                                                            }
                                                                            )

                                                                        } 
                                                                        )
                                                                        }
                                                                    </div>
                                                                </Panel>
                                                            </Collapse>
                                                            <br/>   
                                                            <Collapse defaultActiveKey={1}>
                                                                <Panel header="2.2. Loop progression" key="1">

                                                                    <div
                                                                        style={{
                                                                            display: "flex",
                                                                                justifyContent: "center",
                                                                                flexWrap: "wrap",
                                                                        }}
                                                                        id={'webb_loop_progression'}
                                                                    >

                                                                    {webbDaSilvaRoman.map((v)=>{
                                                                        return <div style={{textAlign:'center',marginTop:'10px',width:'250px'}}>
                                                                            <h3 style={{paddingTop:'10px'}}>{v}</h3>
                                                                            <div
                                                                                style={{ padding: "20px",width:'250px',height:'150px' }}
                                                                            >
                                                                                <Image src={require('../../assets/da-silva/'+v+'.svg')}/>
                                                                            </div>

                                                                        </div>
                                                                        })}  
                                                                    </div>
                                                                </Panel>
                                                            </Collapse>
                                                            <Divider/>
                                                            <h2 style={{ color: "#005675" }} id={"system_requirements"}>
                                                                3. System requirements
                                                            </h2>
                                                            <p>
                                                                WebTetrado is designed to work with most of web browsers. The latest
                                                                versions of browsers are recommended.
                                                            </p>
                                                            <table style={{ border: "1px solid black", textAlign: "center" }}>
                                                                <tr>
                                                                    <td width="75px">
                                                                        <a href="https://www.google.com/intl/en_en/chrome/">
                                                                            <img alt={"chrome logo"} width="55px" src={chrome} />
                                                                        </a>
                                                                    </td>
                                                                    <td width="75px">
                                                                        <a href="https://www.microsoft.com/en-us/edge">
                                                                            <img alt={"edge logo"} width="64px" src={edge} />
                                                                        </a>
                                                                    </td>
                                                                    <td width="75px">
                                                                        <a href="https://www.mozilla.org/en-US/firefox/new/">
                                                                            <img alt={"firefox logo"} width="64px" src={firefox} />
                                                                        </a>
                                                                    </td>
                                                                    <td width="75px">
                                                                        <a href="https://www.apple.com/safari/">
                                                                            <img alt={"safari logo"} width="64px" src={safari} />
                                                                        </a>
                                                                    </td>
                                                                </tr>
                                                                <tr style={{ height: "50px" }}>
                                                                    <td>
                                                                        <b>
                                                                            Chrome
                                                                            <br />
                                                                            85
                                                                        </b>
                                                                    </td>
                                                                    <td>
                                                                        <b>
                                                                            Edge
                                                                            <br />
                                                                            88
                                                                        </b>
                                                                    </td>
                                                                    <td>
                                                                        <b>
                                                                            Firefox
                                                                            <br />
                                                                            86
                                                                        </b>
                                                                    </td>
                                                                    <td>
                                                                        <b>
                                                                            Safari
                                                                            <br />
                                                                            14
                                                                        </b>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                            <Divider />
                                                            <h2 style={{ color: "#005675" }} id={"funding"}>
                                                                4. Funding
                                                            </h2>
                                                            <p style={{textAlign:'justify'}}>
                                                                We acknowledge support from the National Science Centre, Poland
                                                                [2019/35/B/ST6/03074], the statutory funds of Poznan University of
                                                                Technology and Institute of Bioorganic Chemistry PAS.
                                                            </p>
                                                            <Divider />
                                                            <h2 id={"references"}>5. References</h2>
                                                        </div>
                                                    </Content>
                                                );
    };
    return renderContent();
}
