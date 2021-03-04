// import React, { Component } from 'react';
import React from 'react';
import axios from 'axios';
// import user from './Preuser';
import { withRouter,useParams } from 'react-router-dom';
import './User.css';

//RenderRowsの機能実装
function RenderRows(props){

    return (
        <div>
            <tr key={props.datas.id}>
                <td>{props.datas.userNames}</td>
                <td>{props.datas.passwords}</td>
            </tr>
        </div>
    );
}

const About=()=>{
    const { id } = useParams();
    // console.log(id);
    sessionStorage.setItem('urlToken', id);
    return <p className="token">{id}</p>
    // return this.state.urlToken=id;
}

class User extends React.Component {
    //コンストラクタ内でstateにdatasを宣言
    constructor(props){
        super(props);
        this.state = {
            firstdata: "",
            seconddata: "",
            datas: [],
            urlToken: '',
            userNames: '',
            passwords: '',
            passwords_confirm: '',
            // mails: user.mails,
            mails: "",
        };
        // console.log(this.state.urlToken);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //コンポーネントがマウントされた時点で初期描画用のdatasをAPIから取得
    componentDidMount(){
        const token=sessionStorage.getItem('urlToken');
        // console.log(token);
        const urlparameter={
            urlpara: token,
        }
        
        axios
            .post('http://localhost/signinapi',urlparameter)
            .then((res) => {
                //datasを更新（描画がかかる）
                this.setState({
                    firstdata: res.data,
                    urlToken: token,
                });
            })
            .catch(error => {
                console.log(error)
            })
    }

    //入力がされたら（都度）
    handleChange(event){
        const name=event.target.name;
        this.setState({ [name]: event.target.value });
    }

    handleSubmit(event){
        event.preventDefault();

        var err="";
        if (this.state.userNames==="" || this.state.passwords==="" || this.state.passwords_confirm==="") err='未入力項目があります。';
        if (this.state.passwords!==this.state.passwords_confirm) err='確認用パスワードが違います。';


        const urlTokens=sessionStorage.getItem('urlToken');

        const user={
            urlToken: urlTokens,
            userNames: this.state.userNames,
            passwords: this.state.passwords,
        };

        const handleSend = async () => {
            const url="http://localhost/signinfinal";
            const res = await axios.post(url, user, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log(res.data);
            if (!res.data.id){
                this.setState({
                    seconddata: "このユーザー名は使用済みです。",
                });
            }else{
                this.setState({
                    datas: res.data,
                    firstdata: "",
                    urlToken: '',
                    userNames: '',
                    passwords: '',
                    passwords_confirm: '',
                });
            
                sessionStorage.removeItem('urlToken');
                sessionStorage.setItem('userNames', res.data.userNames);
                this.props.history.push("/comment");
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
                <About />
                <div>
                    <p>{this.state.firstdata}</p>

                    {(()=>{
                        if (this.state.firstdata==="本登録を行ってください。"){
                            return <div className="user_form">
                                ユーザー名：<input type="text" name="userNames" value={this.state.userNames} onChange={this.handleChange}/>
                                パスワード：<input type="password" name="passwords" value={this.state.passwords} onChange={this.handleChange}/>
                                パスワード（確認）：<input type="password" name="passwords_confirm" value={this.state.passwords_confirm} onChange={this.handleChange}/>
                                <button className="submit_btn" onClick={this.handleSubmit}>submit</button>
                            </div>
                        }
                    })()}
                </div>
                <div>
                    {(()=>{
                        if (this.state.seconddata!==""){
                            return <p>そのユーザー名は使用済みです。</p>
                        }
                        if (this.state.datas.id){
                            return <p>本登録が完了しました。</p>
                        }
                    })()}
                </div>

                <div>
                    {(()=>{
                        if (this.state.datas.id){
                            <table className="user_table">
                                <thead>
                                    <tr>
                                        <th>userName</th>
                                        <th>password</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {/* 行の描画 */}
                                    <RenderRows
                                        datas={this.state.datas}

                                    />
                                </tbody>
                            </table>
                        }
                    })()}
                </div>
                
            </div>
            
        )
    }



}

// function getRandomStr(){
//     const LENGTH = 8 //生成したい文字列の長さ
//     const SOURCE = "abcdefghijklmnopqrstuvwxyz0123456789" //元になる文字
//     let result = ''
  
//     for(let i=0; i<LENGTH; i++){
//       result += SOURCE[Math.floor(Math.random() * SOURCE.length)];
//     }
    
//     return result 
// }
export default withRouter(User);
// export default User;