import React from 'react';
import MessageList from './MessageList';
import UserInput from './UserInput';
import Header from './Header';
import GuestDialog from "./GuestDialog";
import {connect} from "react-redux";
import CategoryDialog from "./CategoryDialog";

const ChatWindow = ({
                        messageList,
                        agentProfile,
                        isOpen,
                        onClose,
                        isAuth,
                        dialogID
                    }) => {

    let classList = [
        'sc-chat-window',
        isOpen ? 'opened' : 'closed'
    ];

    console.log("dialogID", dialogID);

    return (
        <div className={classList.join(' ')}>
            <Header
                teamName={agentProfile.teamName}
                imageUrl={agentProfile.imageUrl}
                onClose={onClose}
            />
            {
                isAuth ?
                    <>
                        {
                            dialogID ?
                                <>
                                    <MessageList
                                        messages={messageList}
                                        imageUrl={agentProfile.imageUrl}/>
                                    <UserInput />
                                </>
                                :
                                <CategoryDialog/>
                        }
                    </>
                    :
                    <GuestDialog/>
            }
        </div>
    );
}

export default connect(({user, dialogs}) => ({isAuth: user.isAuth, dialogID: dialogs.dialogID}))(ChatWindow);
