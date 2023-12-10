
import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import { handleErrors } from '@utils/fetchHelper';

import './tweets.scss';

class Tweets extends React.Component {
  state = {
    tweets: [],
    loading: true,
  }

  componentDidMount() {
    fetch('/api/tweets')
      .then(handleErrors)
      .then(data => {
        console.log(data);

        this.setState({
          tweets: data.tweets,
          loading: false,
        })
      })
  }


  handleLogout = () => {
    fetch('/api/sessions', {
      method: 'DELETE',
    })
      .then(handleErrors)
      .then(() => {
        window.location.href = '/login';
      })
      .catch((error) => {
        console.error('Error logging out:', error);
      });
  }


  render () {   
    const { tweets,  loading } = this.state;
    console.log(tweets);
    return (
      <Layout>
        <div className="container pt-4">
          <div className="row align-items-start">        
            <div className="col-2"> 
            <div> {session.user.username} </div>    
            <button onClick={this.handleLogout}>log out</button> 
            </div>   
 
           <div className="col-10">
            {tweets.map(tweet => {
              return (
                <div key={tweet.id} className="col-12 mb-4 tweet"> 
                  <a href="#">{tweet.username}</a>                   
                  <p>{tweet.message}</p>                  
                </div>
              )
            })} </div>


          </div>
          {loading && <p>loading...</p>}
        </div>
      </Layout>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Tweets />,
    document.body.appendChild(document.createElement('div')),
  )
})
