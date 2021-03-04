// import React, { useEffect, useState } from 'react';
// import { useEffect } from 'react';
import axios from 'axios';
import React from 'react';

class Form extends React.Component {
    state = {
        userName: '',
        userId: '',
        comment: '',
        userPass: '',
        writeDay: '',
        fileName: '',
      }
      
    
      handleChange = event => {
          let name=event.target.name;
        this.setState({ [name]: event.target.value });
      }
    
      handleSubmit = event => {
        event.preventDefault();

        const toDay=formatDate(new Date());
        //拡張子の身を抽出（例：jpg）
        const extension = this.state.fileName.match(/\.(jpg|jpeg|png|gif|mp4)$/)[1];
    
        const user = {
          userName: this.state.userName,
          userId: this.state.userId,
          comment: this.state.comment,
          userPass: this.state.userPass,
          writeDay: toDay,
          fileName: this.state.fileName,
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
        }

        handleSend();

        
    
        // axios.post(`http://localhost/getapi`, { user })
        //   .then(res => {
        //     console.log(res.data);
        //   })

      }

    

    render () {
        return (
            <div>
                <input type="text" name="userName" value={this.state.userName} onChange={this.handleChange} />
                <input type="text" name="userId" value={this.state.userId} onChange={this.handleChange} />
                <textarea name="comment" onChange={this.handleChange} defaultValue={this.state.comment}></textarea>
                <input type="text" name="userPass" value={this.state.userPass} onChange={this.handleChange} />
                {/* <input type="hidden" name="writeDay" value={{ \Carbon\Carbon::now() }} /> */}
                <input type="file" name="fileName" accept=".jpg,.jpeg,.png,.gif,.mp4" value={this.state.fileName} onChange={this.handleChange} />
                <input type="submit" value="送信" onClick={this.handleSubmit} />
            </div>
        )
    }
}

//日付をyyyy-mm-ddの型に変換
function formatDate(dt) {
    var y = dt.getFullYear();
    var m = ('00' + (dt.getMonth()+1)).slice(-2);
    var d = ('00' + dt.getDate()).slice(-2);
    return (y + '-' + m + '-' + d);
}

export default Form;
