import PropTypes from 'prop-types';
import React, {useState} from 'react';
import SendIcon from './icons/SendIcon';
import {connect} from 'react-redux';
import FileIcon from './icons/FileIcon';
import {filesApi} from '../utils/api';
import {attachmentsActions, messagesActions} from '../redux/actions';

const UserInput = ({
                       fetchSendMessage,
                       attachments,
                       setAttachments,
                   }) => {

    const [inputActive, setInputActive] = useState(false);
    const [userInput, setUserInput] = useState();
    let inputReference = React.createRef();

    const handleKeyDown = (event) => {
        if (event.keyCode === 13 && !event.shiftKey) {
            return _submitText(event);
        }
    }

    const _showFilePicker = () => {
        inputReference.current.click()
    }

    const _submitText = (event) => {
        event.preventDefault();
        const text = userInput.textContent;
        if (text && text.length > 0) {
            fetchSendMessage({
                text: text,
                dialogId: localStorage.getItem("dialog_id"),
                attachments: attachments.map(file => file.uid),
            });
            setAttachments([]);

            userInput.innerHTML = "";

        }
    }

    const fileUploadInputChange = async files => {

        let file = files.target.files[0];

        let uploaded = [];

        const uid = Math.round(Math.random() * 1000);
        uploaded = [
            ...uploaded,
            {
                uid,
                name: file.name,
                status: 'uploading',
            },
        ];
        setAttachments(uploaded);
        // eslint-disable-next-line no-loop-func
        await filesApi.upload(file).then(({data}) => {
            uploaded = uploaded.map(item => {
                if (item.uid === uid) {
                    return {
                        status: 'done',
                        uid: data.file._id,
                        name: data.file.filename,
                        url: data.file.url,
                    };
                }
                return item;
            });
        });
        setAttachments(uploaded);

    }

    const _renderSendOrFileIcon = () => {
        return (
            <>
                <div className="sc-user-input--button">
                    <FileIcon onClick={_showFilePicker}/>
                    <input
                        ref={inputReference}
                        type="file"
                        onChange={(e) => fileUploadInputChange(e)}
                    />
                </div>
                <div className="sc-user-input--button">
                    <SendIcon onClick={_submitText}/>
                </div>
            </>
        );
    }

    return (
        <form className={`sc-user-input ${(inputActive ? 'active' : '')}`}>
            <div
                role="button"
                tabIndex="0"
                onFocus={() => {
                    setInputActive(true)
                }}
                onBlur={() => {
                    setInputActive(false)
                }}
                ref={setUserInput}
                onKeyDown={handleKeyDown}
                contentEditable="true"
                placeholder="Хабарни ёзинг..."
                className="sc-user-input--text"
            >
            </div>
            <div className="sc-user-input--buttons">
                {_renderSendOrFileIcon()}
            </div>
        </form>
    );
}

export default connect(
    ({dialogs, attachments}) => ({
        dialogs,
        attachments: attachments.items,
    }),
    {...messagesActions, ...attachmentsActions},
)(UserInput);
