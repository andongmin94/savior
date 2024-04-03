import React from "react";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <span>{children}</span>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function DetailTaps(props) {
  const [value, setValue] = React.useState(0);
  const target = props.target;
  const crit = props.crit;
  const howto = props.howto;
  const contact = props.contact;
  const phone = props.phone;
  const deptName = props.deptName;
  const siteLink = props.siteLink;
  const siteName = props.siteName;
  const content = props.content;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: 1014,
        border: 1,
        borderColor: "divider",
        borderRadius: 3,
        mb: 3,
      }}
    >
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="fullWidth"
        >
          <Tab label="지원대상" {...a11yProps(0)} />
          <Tab label="서비스 내용" {...a11yProps(1)} />
          <Tab label="신청방법" {...a11yProps(2)} />
          <Tab label="추가정보" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div
          className="mb-[4vh] font-bold"
          style={{ fontFamily: "TmoneyRoundWind" }}
        >
          누가 받을 수 있나요?
        </div>
        <div className="flex">
          <Avatar
            sx={{ width: 20, height: 20 }}
            className="mr-[10px]"
            src="/broken-image.jpg"
          />
          <div
            className="w-[80px] flex-shrink-0"
            style={{ fontFamily: "TmoneyRoundWind" }}
          >
            지원대상 |
          </div>
          <div style={{ fontFamily: "TmoneyRoundWind" }}>
            {target !== undefined &&
              target.split("○").map((item, index) => (
                <div key={index}>
                  {item.trim() !== "" && (
                    <div>
                      <span>○ </span>
                      <span>{item.trim()}</span>
                      <br />
                      <br />
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
        {crit !== null && crit !== undefined ? (
          <Box
            sx={{
              bgcolor: "#1d4ed8",
              borderRadius: 3,
              p: 2,
              mt: 3,
              color: "#eee",
              fontFamily: "TmoneyRoundWind",
            }}
          >
            {crit.split("○").map((item, index) => (
              <div key={index}>
                {item.trim() !== "" && (
                  <div>
                    <span>○ </span>
                    <span>{item.trim()}</span>
                    <br />
                    <br />
                  </div>
                )}
              </div>
            ))}
          </Box>
        ) : (
          <div />
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div
          className="mb-[5vh] font-bold"
          style={{ fontFamily: "TmoneyRoundWind" }}
        >
          어떤 혜택을 받을 수 있나요?
        </div>
        <div className="flex">
          <Avatar
            sx={{ width: 20, height: 20 }}
            className="mr-[10px]"
            src="/broken-image.jpg"
          />
          <div
            className="w-[80px] flex-shrink-0"
            style={{ fontFamily: "TmoneyRoundWind" }}
          >
            지원내용 |
          </div>
          <div style={{ fontFamily: "TmoneyRoundWind" }}>
            {content !== undefined &&
              content.split("○").map((item, index) => (
                <div key={index}>
                  {item.trim() !== "" && (
                    <div>
                      <span>○ </span>
                      <span>{item.trim()}</span>
                      <br />
                      <br />
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div
          className="mb-[5vh] font-bold"
          style={{ fontFamily: "TmoneyRoundWind" }}
        >
          어떻게 신청하나요?
        </div>
        <div className="flex">
          <Avatar
            sx={{ width: 20, height: 20 }}
            className="mr-[10px]"
            src="/broken-image.jpg"
          />
          <div
            className="w-[80px] flex-shrink-0"
            style={{ fontFamily: "TmoneyRoundWind" }}
          >
            신청방법 |
          </div>
          <div style={{ fontFamily: "TmoneyRoundWind" }}>
            {howto !== undefined &&
              howto.split("○").map((item, index) => (
                <div key={index}>
                  {item.trim() !== "" && (
                    <div>
                      <span>○ </span>
                      <span>{item.trim()}</span>
                      <br />
                      <br />
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <div
          className="mb-[5vh] font-bold"
          style={{ fontFamily: "TmoneyRoundWind" }}
        >
          궁금한 사항이 더 있어요.
        </div>
        <div className="flex">
          <Avatar
            sx={{ width: 20, height: 20 }}
            className="mr-[10px]"
            src="/broken-image.jpg"
          />
          <div
            className="w-20 flex-shrink-0 mb-[1vh]"
            style={{ fontFamily: "TmoneyRoundWind" }}
          >
            관련부서 |
          </div>
          <div style={{ fontFamily: "TmoneyRoundWind" }}>{deptName}</div>
          <div style={{ fontFamily: "TmoneyRoundWind" }}>{contact}</div>
        </div>
        <div className="flex">
          <Avatar
            sx={{ width: 20, height: 20 }}
            className="mr-[10px]"
            src="/broken-image.jpg"
          />
          <div
            className="w-20 flex-shrink-0 mb-[1vh]"
            style={{ fontFamily: "TmoneyRoundWind" }}
          >
            전화문의 |
          </div>
          <div style={{ fontFamily: "TmoneyRoundWind" }}>{phone}</div>
        </div>
        <div className="flex">
          <Avatar
            sx={{ width: 20, height: 20 }}
            className="mr-[10px]"
            src="/broken-image.jpg"
          />
          <div
            className="w-[120px] flex-shrink-0"
            style={{ fontFamily: "TmoneyRoundWind" }}
          >
            관련 웹사이트 |
          </div>
          <div className="mr-[1vw]" style={{ fontFamily: "TmoneyRoundWind" }}>
            {siteName}
          </div>
          <div>
            {siteLink}&nbsp;
            {siteLink && typeof window.electron === "undefined" && (
              <a
                href={`http://www.${siteLink.substring(8)}`}
                style={{ fontFamily: "TmoneyRoundWind", color: "#1d4ed8"}}
                target="_blank"
                rel="noopener noreferrer"
              >
                (바로가기)
              </a>
            )}
          </div>
        </div>
      </TabPanel>
    </Box>
  );
}
