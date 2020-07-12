import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import { makeStyles, styled, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { theme } from "../lib/theme";
import { i18n, Link, withTranslation } from "../i18n";

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
    paper: {
        padding: theme.spacing(2),
        "& > h3": {
            margin: 0,
        },
        "& > p": {
            margin: "1.2em 0",
        },
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

const Home = (t) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Head>
                <title>
                    BlenderHub - A version management tool for Blender
                </title>
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
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <Paper className={classes.paper}>
                            <h3>VersionName</h3>
                            <p>VersionPath</p>
                            <Button
                                variant="contained"
                                size="small"
                                color="primary"
                                onClick={handleClickOpen}
                            >
                                起動
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <h3>Projects</h3>
            </TabPanel>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{t('processing')}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <CircularProgress></CircularProgress>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
};

Home.getInitialProps = async () => ({
    namespacesRequired: ["common"],
});

Home.propTypes = {
    t: PropTypes.func.isRequired,
};

export default withTranslation('common')(Home)