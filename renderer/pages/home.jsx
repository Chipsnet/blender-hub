import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import { makeStyles, styled, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

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
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        margin: "0 20px",
    },
}));

const MainTab = styled(AppBar)({
    borderRadius: 8,
});

const StyledTabs = withStyles({
    indicator: {
        display: "flex",
        justifyContent: "center",
        backgroundColor: "transparent",
        "& > span": {
            maxWidth: 0,
            width: "100%",
        },
    },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const Home = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Head>
                <title>BlenderHub - A version management tool for Blender</title>
            </Head>
            <h1>BlenderHub</h1>
            <MainTab position="static">
                <StyledTabs
                    value={value}
                    onChange={handleChange}
                    aria-label="simple tabs example"
                >
                    <Tab label="Versions" {...a11yProps(0)} />
                    <Tab label="Projects" {...a11yProps(1)} />
                </StyledTabs>
            </MainTab>
            <TabPanel value={value} index={0}>
                versions page
            </TabPanel>
            <TabPanel value={value} index={1}>
                projects page
            </TabPanel>
        </div>
    );
};

export default Home;
