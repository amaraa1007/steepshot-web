import React from 'react';
import Steem from '../../libs/steem';
import {
  Link,
  Redirect
} from 'react-router-dom';
import {
  connect
} from 'react-redux';
import Comments from './Comments';
import PropTypes from 'prop-types';
import constants from '../../common/constants';
import VouteComponent from './VouteComponent';
import AddComment from './AddComment';
import FlagComponent from './FlagComponent';
import ShareComponent from './ShareComponent';
import LoadingSpinner from '../LoadingSpinner';

class ItemModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            item: this.props.item,
            index: this.props.index,
            image: this.props.item.body,
            comments: [],
            disableNext: false,
            disablePrev: false,
            redirectToReferrer: false,
            commentValue: '',
            needsCommentFormLoader : false,
            isLoading: false,
            hasMore: this.props.hasMore
        };

        this.initKeypress();
    }

    needMore(props) {
      if (this.state.isLoading || !this.state.hasMore) return false;
      const curIndex = this.state.index;
      if (curIndex + 7 >= props.items.length) {
          this.setState({
            isLoading : true
          }, () => {
            props.loadMore();
          });
      }
    }

    clearNewComment(callback) {
      this.setState({ 
        newComment : null 
      }, () => callback ? callback() : false);
    }

    componentWillReceiveProps(nextProps){
      this.setState({
        item: nextProps.item,
        index: this.props.items == nextProps.items ? nextProps.index : this.state.index,
        image: nextProps.item.body,
        comments: [],
        disableNext: false,
        disablePrev: false,
        redirectToReferrer: false,
        newComment: null
      }, () => {
        this.needMore(this.props);
      });
    }

    componentDidMount() {
      this.needMore(this.props);
      setTimeout(() => { 
        jqApp.forms.init();
        jqApp.post.init()
      }, 0);
    }

    sendComment(e) {
      e.preventDefault();

      if (!(this.props.username && this.props.postingKey)) {
        let text = 'Only registered users can post a new comment.';
        jqApp.pushMessage.open(text);
        return false;
      }

      if (this.state.commentValue == "") return false;

      const urlObject = this.state.item.url.split('/');

      const callback = (err, success) => {
        this.setState({
          needsCommentFormLoader : false
        });
        if (err) {
          jqApp.pushMessage.open(err);
        } else 
        if (success) {
            this.setState({
              newComment : {
                net_votes : 0,
                vote : false,
                avatar : this.props.avatar,
                author : this.props.username,
                total_payout_value : 0,
                body : this.state.commentValue,
                created : Date.now()
              },
              commentValue : ''
            }, () => {
              let $target = $('.js--list-scroll');
              $target.mCustomScrollbar('scrollTo', 'bottom');
              let text = 'Comment was successfully added';
              jqApp.pushMessage.open(text);
            });
        }
      }

      this.setState({
        needsCommentFormLoader : true
      }, () => {
        Steem.comment(
          this.props.postingKey,             
          this.state.item.author, 
          urlObject[urlObject.length - 1], 
          this.props.username, 
          this.state.commentValue,
          this.state.item.tags,
          callback
        );
      });
    }

    initKeypress() {
        const _this = this;

        document.onkeydown = function(e) {
        switch (e.keyCode) {
            case 37:
                _this.previous();
                break;
            case 39:
                _this.next();
                break;
        }
        };
    }

    setDefaultAvatar() {
      this.setState({ 
        avatar: constants.NO_AVATAR 
      });
    }

    setDefaultImage() {
      this.setState({
        image: constants.NO_IMAGE
      });
    }

    handleChange(event) {
      let name = event.target.name;
      let value = event.target.value;
      this.setState({ 
          [name] : value
      });
    }

    next() {
      this.needMore(this.props);
      if (this.state.index == this.props.items.length - 1) {
          this.setState({ disableNext: true });
      } else {
          this.clearNewComment(this.resetDefaultProperties(this.props.items[this.state.index + 1], 1));
      }
    }

    redirectToLoginPage() {
      this.props.history.push('/signin');
    }

    resetDefaultProperties(newItem, indexUpdater) {
      this.setState({ 
          avatar: newItem.avatar,
          image: newItem.body,
          item: newItem,
          index: this.state.index + indexUpdater
      });
    }

    previous() {
      if (this.state.index == 0) {
          this.setState({ disablePrev: true });
      } else {
          this.clearNewComment(this.resetDefaultProperties(this.props.items[this.state.index - 1], -1));
      }
    }

    getFormatedDate() {
      const date = new Date(this.state.item.created);
      const locale = "en-us";
  
      return date.getDate() + ' ' + date.toLocaleString(locale, { month: "short" }) + ' ' + date.getFullYear();
    }

    callPreventDefault(e) {
      e.stopPropagation();
      e.preventDefault();
    }

    render() {

      let _this = this;
      let itemImage = this.state.image || constants.NO_IMAGE;
      let authorImage = this.state.avatar || constants.NO_AVATAR;

      let settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };

      let isUserAuth = (this.props.username && this.props.postingKey);

      const authorLink = `/userProfile/${this.state.item.author}`;

      return(
        <div>
          <div className="post-single">
            <div className="post-wrap post">
              <div className="post__image-container position--relative">
                <ShareComponent 
                    url={this.state.item.url}
                    title="Share post"
                    containerModifier="block--right-top box--small post__share-button"
                />
                <img src={itemImage} 
                  onError={this.setDefaultImage.bind(this)} 
                  alt="image" 
                />
              </div>
              <div className="post__description-container">
                <div className="wrap-description">
                  <div className="post-header">
                    <div className="user-wrap clearfix">
                      <div className="date">{this.getFormatedDate()}</div>
                      <Link to={authorLink} className="user">
                        <div className="photo">
                          <img src={authorImage} 
                            alt="Image" 
                            onError={this.setDefaultAvatar.bind(this)} />
                        </div>
                        <div className="name">{this.state.item.author}</div>
                      </Link>
                    </div>
                  </div>
                  <div className="post-controls clearfix">
                    <div className="buttons-row" onClick={(e)=>{this.callPreventDefault(e)}}>
                      <VouteComponent key="vote" 
                        key="vote"
                        item={this.state.item}
                        index={this.state.index}
                        updateVoteInComponent={this.props.updateVoteInComponent}
                        parent='post'
                      />
                      <FlagComponent 
                        key="flag"
                        item={this.state.item}
                        index={this.state.index}
                        updateFlagInComponent={this.props.updateFlagInComponent}
                      />
                    </div>
                    <div className="wrap-counts clearfix">
                      <div className="likes">{this.state.item.net_votes} like's</div>
                      <div className="amount">{this.state.item.total_payout_reward}</div>
                    </div>
                  </div>
                  {
                    isUserAuth
                    ?
                      <div className="post-comment">
                        <form className="comment-form form-horizontal">
                          <div className="form-group clearfix">
                            <div className="btn-wrap">
                              <button type="submit" className="btn-submit" onClick={this.sendComment.bind(this)}>Send</button>
                            </div>
                            <div className="input-container">
                              <textarea id="formCOMMENT" 
                                        name="commentValue"
                                        value={this.state.commentValue} 
                                        spellCheck="true" 
                                        className="form-control"
                                        onChange={this.handleChange.bind(this)}>
                              </textarea>
                              <label htmlFor="formCOMMENT" className="name">Comment</label>
                            </div>
                          </div>
                        </form>
                        {
                          this.state.needsCommentFormLoader
                          ?
                            <LoadingSpinner />
                          :
                            null
                        }
                      </div>
                    :
                      null
                  }
                  <div className="list-scroll js--list-scroll">
                    <div className="post-description">
                      <p>{this.state.item.title}</p>
                      <div className="post-tags clearfix">
                        {
                          this.state.item.tags.map((tag, index) => {
                            return <a key={index}
                              onClick={(event) => this.props._research.bind(this, event, tag)} 
                              >
                                {tag}
                              </a>
                          })
                        }
                      </div>
                    </div>
                    <Comments key="comments" item={this.state.item} newComment={this.state.newComment}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
}

ItemModal.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
  return {
    localization: state.localization,
    username: state.auth.user,
    postingKey: state.auth.postingKey,
    avatar: state.auth.avatar
  };
};

export default connect(mapStateToProps)(ItemModal);