import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import qrcode from 'qrcode';

export default class VerifyComponent extends Component {
    
    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: "",
            token: "",
            keyuri: "",
        }
    }

    // componentDidMount() {

    // }

    onChangeEmail(e){
        this.setState({
            email: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        const info = {
            code:this.state.token
        };

        const email = this.state.email;

        axios.post(`http://localhost:3537/generate/${email}`, info)
            .then(res => {
                console.log(res);   //only for testing
                if(res.data.hasOwnProperty('keyuri')){
                    if(res.data.hasOwnProperty('fresh')){
                        alert("already generated for this user");
                    }
                    console.log(res.data.keyuri);
                    qrcode.toDataURL(res.data.keyuri, (err, imageUrl) => {
                        if (err) {
                          console.log('Error with QR');
                          return;
                        }
                        // const qrimg = document.querySelector(".qrcode");
                        // qrimg.src = imageUrl;
                        console.log(imageUrl);
                        this.setState({
                            keyuri : imageUrl
                        });
                      });
                } else {

                }
            })
            .catch(err => console.log(err));

        console.log(`http://localhost:3537/generate/${email}`);
        console.log(info);
        
    }
    
    render(){
        return(
            <div>
                <h3>Generate Google Authenticator</h3>
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
                        <input type="submit" className="btn btn-primary" value="Generate"
                            />
                    </div>
                    {
                        this.state.keyuri===""?
                        null:
                        <img src={this.state.keyuri}></img>
                        // this.state.keyuri
                        
                    }
                </form>
            </div>
        );
    }
}