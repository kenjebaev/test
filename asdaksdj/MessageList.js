import React, {Component} from 'react';
import Message from './messages';
import {connect} from 'react-redux';


class MessageList extends Component {

    componentDidUpdate(_prevProps, _prevState) {
        this.scrollList.scrollTop = this.scrollList.scrollHeight;
    }

    render() {

        const {attachments, user} = this.props;

        return (
            <div className="sc-message-list" ref={el => this.scrollList = el}>
                {this.props.messages.map((message, i) => {
                    return <Message item={message} key={i} attachments={message.attachments} user={user}/>;
                })}
            </div>);
    }
}


export default connect(
    ({user}) => ({
        user: user.data,
    }),
)(MessageList);
