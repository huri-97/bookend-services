import React, { Component } from 'react';
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import AuthService from "../../../../Service/AuthService";
import {Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { Link } from 'react-router-dom';

export default class FetchRandomUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            shelvesData: [],
            newShelfName:"",
        };
        this.onChangeShelfName=this.onChangeShelfName.bind(this);
        this.createNewShelf=this.createNewShelf.bind(this);
        this.deleteShelf=this.deleteShelf.bind(this);
    }

    onChangeShelfName(event) {
        this.setState({
            newShelfName: event.target.value
        });
    }

    createNewShelf(){
        let myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+ AuthService.getCurrentUser());

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:8083/api/shelf/new?name="+this.state.newShelfName, requestOptions)
            .then(response => response.json())
            .then(result => {
                    if (result.status === 400) {
                        alert("\n" + result.message)
                    } else {
                        alert("New shelf created. Please refresh..")
                    }
                }
            )
            .catch(error => console.log('error', error));
    }

    deleteShelf(shelfId){
        let myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+AuthService.getCurrentUser());

        let requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:8083/api/shelf/delete/"+shelfId, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }


    componentDidMount() {
        let myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+ AuthService.getCurrentUser());

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:8083/api/shelf/user/", requestOptions)
            .then(response => response.text())
            .then(result => {
                if (result.slice(10,23)!=="invalid_token") {
                    this.setState({shelvesData:JSON.parse(result)});
                    console.log(JSON.parse(result))
                }else{
                    this.props.history.push("/");
                    window.location.reload();
                }
            })
    }

    render() {

        if (!this.state.shelvesData) {
            return <div>didn't get a shelf</div>;
        }

        return (
            <div style={{flexGrow: 1}}>
                <Paper style={{marginLeft:"20%",width:"50%"}}>
                    <Typography
                        style={{marginLeft:"10%",marginTop:"5%"}}
                    >Shelves
                    </Typography>
                    {this.state.shelvesData.map((row)=>
                        <TableRow >
                            <TableCell style={{marginLeft: "2%"}}>Shelf Name:</TableCell>
                            <TableCell><div>{row.shelfname}</div></TableCell>
                            <TableCell><div><Link
                                to={{
                                    pathname: "/shelf/"+AuthService.getCurrentUserName()+"/"+row.shelfname,
                                    state: { shelfId:row.id,shelfName:row.shelfname}
                                }}><Button style={{backgroundColor: "#5499C7", color: "white"}}>Show</Button>
                            </Link></div></TableCell>
                            <TableCell><Button
                                onClick={()=>this.deleteShelf(row.id)}
                                style={{backgroundColor:"#C0392B",color:"white"}}>Delete</Button></TableCell>

                        </TableRow>
                    )}
                    <br/>
                    <TableRow>
                        <TableCell><form noValidate autoComplete="off">
                            <TextField
                                style={{backgroundColor:"white"}}
                                id="standard-basic"
                                label="ShelfName"
                                value={this.state.newShelfName}
                                onChange={this.onChangeShelfName}
                            />
                        </form></TableCell>
                        <TableCell><Button
                            onClick={this.createNewShelf}
                            style={{color:"white",backgroundColor:"#BB8FCE",marginTop:"10%"}} >Add New Shelf</Button></TableCell>
                    </TableRow>
                </Paper>
            </div>
        );
    }
}