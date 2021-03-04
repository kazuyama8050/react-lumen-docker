import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link,
  // useLocation,
//   useParams
} from 'react-router-dom';
import Preuser from './Preuser';
import User from './User';
import All from './All';
import Loguser from './Loguser';
// import Memo from './Memo';

const App = () => {
  return (
    <Router>
      <div>
        {/* <nav>
          <ul>
            {(()=>{
              if (sessionStorage.getItem('userNames')){
                return(
                  <li>
                    <Link to='/comment'>Home</Link>
                  </li>
                )
              }else{
                return(
                  <div>
                    <li>
                      <Link to='/signin'>新規登録</Link>
                    </li>
                    <li>
                      <Link to='/login'>ログイン</Link>
                    </li>
                  </div>
                )
              }
            })()}
            
          </ul>
        </nav> */}

        <Switch>
          <Route path='/signin'>
            <Preuser />
          </Route>
          <Route exact path='/signup/:id'>
            <User />
          </Route>
          <Route path='/comment' exact>
            <All />
          </Route>
          <Route path="/login">
            <Loguser />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
// const About = () => {
//     const { id } = useParams();
//     return <h2>About：{id}</h2>
// }
export default App;