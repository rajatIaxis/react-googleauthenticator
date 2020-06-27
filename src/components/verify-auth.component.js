import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class VerifyComponent extends Component {
    
    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeToken = this.onChangeToken.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        this.state = {
            email: "",
            token: "",
        }

        this.isVerified = false;
    }

    // componentDidMount() {

    // }

    onChangeEmail(e){
        this.setState({
            email: e.target.value,
            isVerified:false
        });
    }

    onChangeToken(e){
        this.setState({
            token:e.target.value,
            isVerified:false
        });
    }

    onSubmit(e){
        e.preventDefault();

        const info = {
            code:this.state.token
        };

        const email = this.state.email;

        axios.post(`http://localhost:3537/validate/${email}`, info)
            .then(res => {
                console.log(res);   //only for testing
                if(res.data.startsWith("success")){
                    this.setState({
                        isVerified:true
                    });
                    console.log("Verified!");
                } else {
                    this.setState({
                        isVerified:false
                    });
                }
            })
            .catch(err => console.log(err));

        console.log(`http://localhost:3537/validate/${email}`);
        console.log(info);
        
    }

    
    render(){
        return(
            <div>
                <h3>Verify Google Authenticator</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                            />
                    </div>
                    <div className="form-group">
                        <label>Token: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.token}
                            onChange={this.onChangeToken}
                            />
                    </div>
                    <div className="form-group">
                        <input type="submit" className="btn btn-primary" value="Verify"
                            />
                    </div>
                    <div>
                        {
                            this.state.isVerified?
                            <p style={{color: "green"}}>VERIFIED!</p>:
                            <p style={{color: "red"}}>NOT VERIFIED!</p>
                        }
                    </div>
                </form>
            </div>
        );
    }
}