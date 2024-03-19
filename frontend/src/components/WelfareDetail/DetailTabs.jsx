import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";

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
          <Typography>{children}</Typography>
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
          style={{
            marginBottom: "5vh",
            fontWeight: "bold",
            fontFamily: 'Pretendard'
          }}
        >
          누가 받을 수 있나요?
        </div>
        <div style={{ display: "flex" }}>
          <Avatar
            sx={{ width: 20, height: 20 }}
            style={{ marginRight: "10px" }}
            src="/broken-image.jpg"
          />
          <div
            style={{ width: "80px", flexShrink: 0, fontFamily: 'Pretendard' }}
          >
            지원대상 |
          </div>
          <div>{target}</div>
        </div>
        {crit !== null ? (
          <Box
            sx={{
              bgcolor: "#90CAF9",
              borderRadius: 2,
              p: 2,
              mt: 3,
              color: "#033075",
              fontFamily: 'Pretendard'
            }}
          >
            {crit}
          </Box>
        ) : (
          <div></div>
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div
          style={{
            marginBottom: "5vh",
            fontWeight: "bold",
            fontFamily: 'Pretendard'
          }}
        >
          어떤 혜택을 받을 수 있나요?
        </div>
        <div style={{ display: "flex" }}>
          <Avatar
            sx={{ width: 20, height: 20 }}
            style={{ marginRight: "10px" }}
            src="/broken-image.jpg"
          />
          <div
            style={{ width: "80px", flexShrink: 0, fontFamily: 'Pretendard' }}
          >
            지원내용 |
          </div>
          <div>{content}</div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div
          style={{
            marginBottom: "5vh",
            fontWeight: "bold",
            fontFamily: 'Pretendard'
          }}
        >
          어떻게 신청하나요?
        </div>
        <div style={{ display: "flex" }}>
          <Avatar
            sx={{ width: 20, height: 20 }}
            style={{ marginRight: "10px" }}
            src="/broken-image.jpg"
          />
          <div
            style={{ width: "80px", flexShrink: 0, fontFamily: 'Pretendard' }}
          >
            신청방법 |
          </div>
          <div>{howto}</div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <div
          style={{
            marginBottom: "5vh",
            fontWeight: "bold",
            fontFamily: 'Pretendard'
          }}
        >
          궁금한 사항이 더 있어요.
        </div>
        <div style={{ display: "flex" }}>
          <Avatar
            sx={{ width: 20, height: 20 }}
            style={{ marginRight: "10px" }}
            src="/broken-image.jpg"
          />
          <div
            style={{
              width: "80px",
              flexShrink: 0,
              marginBottom: "1vh",
              fontFamily: 'Pretendard'
            }}
          >
            관련부서 |
          </div>
          <div>{deptName}</div>
          <div>{contact}</div>
        </div>
        <div style={{ display: "flex" }}>
          <Avatar
            sx={{ width: 20, height: 20 }}
            style={{ marginRight: "10px" }}
            src="/broken-image.jpg"
          />
          <div
            style={{
              width: "80px",
              flexShrink: 0,
              marginBottom: "1vh",
              fontFamily: 'Pretendard'
            }}
          >
            전화문의 |
          </div>
          <div>{phone}</div>
        </div>
        <div style={{ display: "flex" }}>
          <Avatar
            sx={{ width: 20, height: 20 }}
            style={{ marginRight: "10px" }}
            src="/broken-image.jpg"
          />
          <div
            style={{
              width: "120px",
              flexShrink: 0,
              fontFamily: 'Pretendard'
            }}
          >
            관련 웹사이트 |
          </div>
          <div style={{ marginRight: "1vw" }}>{siteName}</div>
          <div>
            <a href={siteLink}>{siteLink}</a>
          </div>
        </div>
      </TabPanel>
    </Box>
  );
}
