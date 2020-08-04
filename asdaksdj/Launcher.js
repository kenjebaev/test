import React, {useEffect, useState} from 'react';
import ChatWindow from './ChatWindow';

const Launcher = ({
                      messageList,
                      handleClick,
                      newMessagesCount,
                      onMessageWasSent,
                      onFilesSelected,
                      agentProfile,
                      isOpen
                  }) => {

    const [isOpenClass, setOpenClass] = useState(false);

    console.log(messageList);

    // useEffect(() => {
    //     playIncomingMessageSound()
    // }, [messageList])

    const playIncomingMessageSound = () => {
        let audio = new Audio("/assets/sounds/notification.mp3");
        audio.play().then(r => console.log(r));
    }

    const handleClick2 = () => {
        if (handleClick !== undefined) {
            handleClick();
        } else {
            setOpenClass(!isOpen);
        }
    }

    const classList = [
        'sc-launcher',
        (isOpen ? 'opened' : ''),
    ];

    return (
        <div id="sc-launcher">
            <div className={classList.join(' ')} onClick={handleClick2}>
                <MessageCount count={newMessagesCount} isOpen={isOpen}/>
                <img className={'sc-open-icon'} src="/assets/close-icon.png" alt=""/>
                <img className={'sc-closed-icon'} src="/assets/logo-no-bg.svg" alt=""/>
            </div>
            <ChatWindow
                messageList={messageList}
                onUserInputSubmit={onMessageWasSent}
                onFilesSelected={onFilesSelected}
                agentProfile={agentProfile}
                isOpen={isOpen}
                onClose={handleClick2}
            />
        </div>
    );
}

const MessageCount = ({count, isOpen}) => {
    if (count === 0 || isOpen === true) {
        return null;
    }
    return (
        <div className={'sc-new-messages-count'}>
            {count}
        </div>
    );
};

Launcher.defaultProps = {
    newMessagesCount: 0,
};

export default Launcher;
