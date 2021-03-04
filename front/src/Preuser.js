import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Preuser extends Component{
    constructor(){
        super();
        this.state ={
            datas: '',
            mails: '',
            urlToken: '',
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
        console.log(this.state.mails);

        var err="";
        if (!this.state.mails) err='メールアドレスを入力してください';
        // eslint-disable-next-line
        const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!regex.test(this.state.mails)) err='正しい形式でメールアドレスを入力してください';

        const ramString=getRandomStr();  //20桁の乱数生成
        const user={
            urlToken: ramString,
            mails: this.state.mails,
        };

        const handleSend = async () => {
            const url="http://localhost/signupapi";
            const res = await axios.post(url, user, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log(res.data);
            // sessionStorage.setItem('urlToken', ramString);
            this.setState({
                datas: res.data,
                mails: '',
                urlToken: '',
            });
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
                <h2>新規登録画面</h2>
                {(()=>{
                    if (this.state.datas){
                        return <p>{this.state.datas}</p>
                    }
                })()}
                
                <div className="preUser_form">
                    <input type="text" name="mails" value={this.state.mails} onChange={this.handleChange}/>
                    <button className="submit_btn" onClick={this.handleSubmit}>submit</button>
                </div>
                <Link to='/login'>ログイン</Link>
            </div>
        )
    }
}
function getRandomStr(){
    const LENGTH = 20 //生成したい文字列の長さ
    const SOURCE = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789" //元になる文字
    let result = ''
  
    for(let i=0; i<LENGTH; i++){
      result += SOURCE[Math.floor(Math.random() * SOURCE.length)];
    }
    
    return result 
  }