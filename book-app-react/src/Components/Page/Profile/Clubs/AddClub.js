import React, {useEffect} from 'react';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import AuthService from "../../../../Service/AuthService";
import {Typography} from "@material-ui/core";
import Radio from '@material-ui/core/Radio';
import AddBoxIcon from "@material-ui/icons/AddBox";

/*
const styles = {
    root: {
        color: green[600],
        '&$checked': {
            color: green[500],
        },
    },
    checked: {},
};

 */

export default function AddClub(props) {
    const [open, setOpen] = React.useState(false);
    const [clubName, setClubName] = React.useState("");
    const [privateOrNot, setPrivateOrNot] = React.useState(false);
    const [description, setDescription] = React.useState(   "");


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onChangeClubName = (e) => {
        setClubName(e.target.value);
    };

    const onChangePrivate= (e) => {
        setPrivateOrNot(e.target.value);
    };

    const onChangeDescription = (e) => {
        setDescription(e.target.value);
    };

    const handleAddClub = (props) => {
        let myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+AuthService.getCurrentUser());
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            "clubName":clubName,
            "privatee":privateOrNot,
            "description":description,
            "memberId":AuthService.getCurrentUserId()});

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:8089/api/club/", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(privateOrNot)
                console.log(AuthService.getCurrentUser())
                console.log(AuthService.getCurrentUserId())
                if (result.slice(10, 23) !== "invalid_token") {
                    if(JSON.parse(result).status !==401 && JSON.parse(result).status!==500){
                        alert("Added successfully")
                    }
                    else {
                        alert("There is a problem")
                    }
                } else {
                    this.props.history.push("/");
                    window.location.reload();
                }
            })
}


    return (
        <div>
            <td> <Button onClick={handleClickOpen} style={{marginLeft:"17%"}}> <AddBoxIcon color="primary"/> </Button></td>
            <Dialog

                disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogContent>
                    <Typography
                        style={{marginLeft:"35%"}}>Adding Club</Typography>
                    <TableRow>
                        <TableCell><form noValidate autoComplete="off">
                            <TextField
                                style={{backgroundColor:"white"}}
                                id="standard-basic"
                                label="Club Name"
                                value={clubName}
                                onChange={onChangeClubName}
                            />
                        </form></TableCell>

                        <TableCell><form noValidate autoComplete="off">
                            <TextField
                                style={{backgroundColor:"white"}}
                                id="standard-basic"
                                label="Private(true/false)"
                                value={privateOrNot}
                                onChange={onChangePrivate}
                            />
                        </form></TableCell></TableRow><br/><br/>
                    <Typography
                        style={{marginLeft:"5%"}}>Description</Typography>
                    <textarea  style={{marginLeft:"5%"}} rows="7" cols="50"
                               value={description} onChange={onChangeDescription} />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddClub} color="primary">
                        Add
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

/*
 <Radio
                            checked={privateOrNot === true}
                            onChange={this.handleChange}
                            value={privateOrNot}
                            name="radio-button-demo"
                            aria-label="True"
                        />
                        <Radio
                            checked={privateOrNot === false}
                            onChange={this.handleChange}
                            value={privateOrNot}
                            name="radio-button-demo"
                            aria-label="False"
                        />
 */