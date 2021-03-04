import React, { Component } from 'react';
import axios from 'axios';
import { withRouter,Link } from 'react-router-dom';


class Loguser extends Component {
    constructor(){
        super();
        this.state ={
            datas: '',
            userNames: '',
            passwords: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    //入力がされたら（都度）
    handleChange(event){
        const name=event.target.name;
        this.setState({ [name]: event.target.value });
    }

    handleSubmit(event){
        event.preventDefault();

        var err="";
        if (this.state.userNames==="") err='ユーザー名を入力してください';
        if (this.state.passwords==="") err='パスワードを入力してください';

        const user={
            userNames: this.state.userNames,
            passwords: this.state.passwords,
        };

        const handleSend = async () => {
            const url="http://localhost/login";
            const res = await axios.post(url, user, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log(res.data);
            if (res.data==="ログインしました。"){
                sessionStorage.setItem('userNames', this.state.userNames);
                this.setState({
                    datas: res.data,
                    passwords: '',
                    userNames: '',
                });
                this.props.history.push("/comment");
            }else{
                this.setState({
                    datas: res.data,
                });
            }
                
        }
        if (err!==""){
            alert(err);
        }else{
            handleSend();
        }
        
    }

    render(){
        return(
            <div>
                <h2>ログイン画面</h2>
                {(()=>{
                    if (this.state.datas){
                        if (this.state.datas!=="ログインしました。"){
                            return <p>{this.state.datas}</p>
                        }
                    }
                })()}
                
                <div className="preUser_form">
                    ユーザ名：<input type="text" name="userNames" value={this.state.userNames} onChange={this.handleChange}/><br />
                    パスワード：<input type="text" name="passwords" value={this.state.passwords} onChange={this.handleChange}/>
                    <button className="submit_btn" onClick={this.handleSubmit}>submit</button>
                </div>
                <Link to='/signin'>新規登録</Link>
            </div>
        )
    }
}
export default withRouter(Loguser);