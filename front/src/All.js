import React, { Component } from 'react';
import axios from 'axios';
// import firebase, { storage } from "./firebase/firebase";
import firebase from "./firebase/firebase";
import './All.css';
import { withRouter } from 'react-router-dom';

function ListItem(props){
    return(
        <div>
            <ol>
                {(()=>{
                    if (props.data.userName===sessionStorage.getItem('userNames')){
                        return(
                            <ul className="small_comment">
                                <ol>{props.data.id}：</ol>
                                <ol>名前：{props.data.userName}</ol>
                                <ol>パスワード：{props.data.userPass}</ol>
                                <ol>{props.data.writeDay}</ol>
                                <ol><button onClick={() => props.handleDelete(props.data)}>削除</button></ol>
                                <ol><button onClick={() => props.handleEdit(props.data)}>編集</button></ol>
                            </ul>
                        )
                    }else{
                        return(
                            <ul className="small_comment">
                                <ol>{props.data.id}：</ol>
                                <ol>名前：{props.data.userName}</ol>
                                <ol>パスワード：{props.data.userPass}</ol>
                                <ol>{props.data.writeDay}</ol>
                            </ul>
                        )
                    }
                })()}
                <div className="comment_box">
                    {props.data.comment}
                </div>
            </ol>

            <ol>
                {(()=>{
                    if (props.data.extension){
                        // let imagePlace="";
                        // let ref = firebase.storage().ref("images").child(data.fileName);
                        // ref.put(this.state.image)().then((url) => {
                        //     imagePlace=url;
                        // });
                        // const imagePlace="https://console.firebase.google.com/project/react-lumen/storage/react-lumen.appspot.com/files~2Fimages/"+data.fileName+"."+data.extension;
                        if (props.data.extension==="mp4"){
                            return <video src={props.data.fileName} width="200" controls></video>
                        }else{
                            return <img src={props.data.fileName} width="200" height="150" alt="uploaded" />
                        }
                    }
                })()}
            </ol>
        </div>
    )
}

//RenderRowsの機能実装
function RenderRows(props){
    //mapでループしている（for相当）
    const listItems = props.datas.map((data) =>
        <ListItem key={data.id+data.created_at}
            data={data}
            handleDelete={props.handleDelete}
            handleEdit={props.handleEdit}
        />
    );
    return(
        <ul className="comment">
            {listItems}
        </ul>
    )
    // return props.datas.map(data => {
        
    //     return (
    //         <ul className="comment">
    //             <ol>
                    
    //                 {(()=>{
    //                     if (data.userName===sessionStorage.getItem('userNames')){
    //                         return(
    //                             <ul className="small_comment">
    //                                 <ol key={data.created_at}>{data.id}：</ol>
    //                                 <ol key={data.created_at}>名前：{data.userName}</ol>
    //                                 <ol key={data.created_at}>パスワード：{data.userPass}</ol>
    //                                 <ol key={data.created_at}>{data.writeDay}</ol>
    //                                 <ol key={data.created_at}><button onClick={() => props.handleDelete(data)}>削除</button></ol>
    //                                 <ol key={data.created_at}><button onClick={() => props.handleEdit(data)}>編集</button></ol>
    //                             </ul>
    //                         )
    //                     }else{
    //                         return(
    //                             <ul className="small_comment">
    //                                 <ol key={data.created_at}>{data.id}：</ol>
    //                                 <ol key={data.created_at}>名前：{data.userName}</ol>
    //                                 <ol key={data.created_at}>パスワード：{data.userPass}</ol>
    //                                 <ol key={data.created_at}>{data.writeDay}</ol>
    //                             </ul>
    //                         )
    //                     }
    //                 })()}
    //                 <div className="comment_box">
    //                     {data.comment}
    //                 </div>
    //             </ol>

    //             <ol>
    //                 {(()=>{
    //                     if (data.extension){
    //                         // let imagePlace="";
    //                         // let ref = firebase.storage().ref("images").child(data.fileName);
    //                         // ref.put(this.state.image)().then((url) => {
    //                         //     imagePlace=url;
    //                         // });
    //                         // const imagePlace="https://console.firebase.google.com/project/react-lumen/storage/react-lumen.appspot.com/files~2Fimages/"+data.fileName+"."+data.extension;
    //                         if (data.extension==="mp4"){
    //                             return <video key={data.created_at} src={data.fileName} width="200" controls></video>
    //                         }else{
    //                             return <img key={data.created_at} src={data.fileName} width="200" height="150" alt="uploaded" />
    //                         }
    //                     }
    //                 })()}
    //             </ol>
    //         </ul>
    //     );
    // });
}

class All extends Component {

    //コンストラクタ内でstateにdatasを宣言
    constructor(){
        super();
        this.state = {
            datas: [],
            id: '',
            userName: sessionStorage.getItem('userNames'),
            comment: '',
            userPass: '',
            writeDay: '',
            fileName: '',
            extension: '',
            pass: '',
            image: '',
            imageUrl: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleImage = this.handleImage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleDelete=this.handleDelete.bind(this);
        this.handleEdit=this.handleEdit.bind(this);
    }
    

    //コンポーネントがマウントされた時点で初期描画用のdatasをAPIから取得
    componentDidMount(){
        if (sessionStorage.getItem('userNames')){

            axios
                .get('http://localhost/getapi')
                .then((res) => {
                    //datasを更新（描画がかかる）
                    this.setState({
                        datas: res.data
                    });
                })
                .catch(error => {
                    console.log(error)
                })
                
        }else{
            alert("ログインしてください。");
            this.props.history.push("/login");
        }
    }

    //入力がされたら（都度）
    handleChange(event){
        var name=event.target.name;
        this.setState({ [name]: event.target.value });
    }


    //ファイルがアップロードされたら
    handleImage=event=>{
        var name=event.target.name;
        var image=event.target.files[0];
        this.setState({
            [name]: event.target.value,
            image: image,
        });
    }

    //ログアウトボタンを押したとき
    handleLogout=event=>{
        event.preventDefault();

        var logout = window.confirm('ログアウトしてもよろしいでしょうか？');
        if (logout){
            sessionStorage.removeItem('userNames');
            this.props.history.push("/login");
        }
    }

    //登録ボタンがクリックされたら
    handleSubmit = event => {
        event.preventDefault();

        var uploadName="";
        var extension="";
        var imageUrl="";
        var err="";

        console.log(this.state.fileName);

        const toDay=formatDate(new Date());

        if (this.state.comment==="" || this.state.userPass==="") err="未入力項目があります。";

        if (err!==""){
            alert(err);
        }else{
            if (this.state.fileName!==""){
                //拡張子の身を抽出（例：jpg）
                if (this.state.fileName.slice(-3)==="MP4"){
                    extension="mp4";
                }else{
                    extension=this.state.fileName.match(/\.(jpg|jpeg|png|gif)$/)[1];
                }
                var ram=Math.floor( Math.random() * (99999 + 1 - 1) ) + 1 + formatDate(new Date());
                uploadName=ram+"."+extension;
                console.log(uploadName);

                const uploadTask = firebase.storage().ref("images").child(uploadName).put(this.state.image);
                uploadTask.on(
                    firebase.storage.TaskEvent.STATE_CHANGED,
                    // error,
                    // complete(uploadName)
                    null,
                    error => {
                        console.log("error", error);
                    },
                    ()=>{
                        uploadTask.snapshot.ref.getDownloadURL().then(fireBaseUrl => {
                            imageUrl=fireBaseUrl;
                            const user = {
                                userName: this.state.userName,
                                comment: this.state.comment,
                                userPass: this.state.userPass,
                                writeDay: toDay,
                                fileName: imageUrl,
                                extension: extension,
                            };
                    
                    
                            console.log(user);
                    
                            const handleSend = async () => {
                                const url="http://localhost/getapi";
                                const res = await axios.post(url, user, {
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                })
                                console.log(res.data);
                                this.setState({
                                    datas: res.data,
                                    id: '',
                                    comment: '',
                                    userPass: '',
                                    writeDay: '',
                                    fileName: '',
                                    extension: '',
                                    pass: '',
                                    image: '',
                                    imageUrl: '',
                                });
                            }
                    
                            handleSend();
                        });
                        // storage
                        //     .ref("images")
                        //     .child(uploadName)
                        //     .getDownloadURL()
                        //     .then(fireBaseUrl => {
                        //         imageUrl=fireBaseUrl;
                        //         console.log(imageUrl)
                        //     }
                    }
                );
            }else{

                const user = {
                    userName: this.state.userName,
                    comment: this.state.comment,
                    userPass: this.state.userPass,
                    writeDay: toDay,
                    fileName: "",
                    extension: "",
                };


                console.log(user);

                const handleSend = async () => {
                    const url="http://localhost/getapi";
                    const res = await axios.post(url, user, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    console.log(res.data);
                    this.setState({
                        datas: res.data,
                        id: '',
                        comment: '',
                        userPass: '',
                        writeDay: '',
                        fileName: '',
                        extension: '',
                        pass: '',
                        image: '',
                        imageUrl: '',
                    });
                }

                handleSend();
            }
        }
    }

    handleDelete(data){
        var err_del="";
        if (this.state.pass==="") err_del="削除用パスワードを入力してください。";
        if (err_del!==""){
            alert(err_del);
        }else{
            const deleteUser={
                id:data.id,
                userPass:data.userPass,
            }
            const deleteSend = async () => {
                const url="http://localhost/getapi/del";
                const res = await axios.post(url, deleteUser, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                console.log(res.data);
                this.setState({
                    datas: res.data,
                    id: '',
                    comment: '',
                    userPass: '',
                    writeDay: '',
                    fileName: '',
                    extension: '',
                    pass: '',
                    image: '',
                    imageUrl: '',
                });
            }
            if (this.state.pass===data.userPass){
                deleteSend();
            }else{
                alert("パスワードが違います。");
            }
            console.log(this.state.pass);
            console.log(data.userPass);
        }
    };

    handleEdit(data){
        var err_edit="";
        if (this.state.comment==="" || this.state.pass==="") err_edit="未入力項目があります。"
        if (err_edit!==""){
            alert(err_edit);
        }else{
            const toDay=formatDate(new Date());
            const editUser={
                id:data.id,
                comment:this.state.comment,
                writeDay:toDay,
            }
            const editSend = async () => {
                const url="http://localhost/getapi/edit";
                const res = await axios.post(url, editUser, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                console.log(res.data);
                this.setState({
                    datas: res.data,
                    id: '',
                    comment: '',
                    userPass: '',
                    writeDay: '',
                    fileName: '',
                    extension: '',
                    pass: '',
                    image: '',
                    imageUrl: '',
                });
            }

            if (this.state.pass===data.userPass){
                editSend();
            }else{
                alert("パスワードが違います。");
            }
        }
    }


    //テーブルの骨組みを描画し、行の描画はRenderRowsに任せる（その際、datasを渡す）
    render() {
        return (
            <React.Fragment>
                <h2>掲示板</h2>
                <div className="top_form">
                    <button className="logout_btn" onClick={this.handleLogout}>Logout</button>
                    <p>ようこそ {this.state.userName} さん</p>
                </div>
                {/* add from */}
                <ul className="main_form">
                    <ol>comment：<textarea name="comment" height="4" value={this.state.comment} onChange={this.handleChange}></textarea></ol>
                    <ol>password：<input type="text" name="userPass" value={this.state.userPass} onChange={this.handleChange} /></ol>
                    <ol>upload：<input type="file" name="fileName" accept=".jpg,.jpeg,.png,.gif,.mp4" value={this.state.fileName} onChange={this.handleImage} /></ol>
                    <ol><button className="submit_btn" onClick={this.handleSubmit}>submit</button></ol>
                </ul>

                <div className="change_pass">
                    <p>パスワード（削除・編集）</p>
                    <input type="text" name="pass" value={this.state.pass} onChange={this.handleChange} />
                </div>

                <br/>

                <RenderRows
                    datas={this.state.datas}
                    handleDelete={this.handleDelete}
                    handleEdit={this.handleEdit}
                />
                
                
            </React.Fragment>
        );
    }
}

    //日付をyyyy-mm-ddの型に変換
function formatDate(dt) {
    var y = dt.getFullYear();
    var m = ('00' + (dt.getMonth()+1)).slice(-2);
    var d = ('00' + dt.getDate()).slice(-2);
    return (y + '-' + m + '-' + d);
}

export default withRouter(All);

