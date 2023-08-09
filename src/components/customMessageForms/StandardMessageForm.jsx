import React, { useState } from "react";
import {
  XMarkIcon,
  PaperClipIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/solid";
import Dropzone from "react-dropzone";

export const StandardMessageForm = ({ props, activeChat }) => {
  console.log(props);
  console.log(activeChat);
  const [message, setMessage] = useState("");

  const [attachment, setAttachment] = useState("");

  const [preview, setPreview] = useState("");

  const handleOnChnage = (e) => setMessage(e.target.value);

  const handleOnSubmit = async (e) => {
    const date = new Date()
      .toISOString()
      .replace("T", " ")
      .replace("Z", `${Math.floor(Math.random() * 1000)} + 00:00`);

    const at = attachment ? [{ blob: attachment, file: attachment.name }] : [];

    const form = {
      attachments: at,
      created: date,
      sender_username: props.usename,
      text: message,
      activeChatId: activeChat.id,
    };

    props.onSubmit(form);
    setMessage("");
    setAttachment("");
  };
  return (
    <div className="message-form-container">
      {preview && (
        <div className="message-form-preview">
          <img
            className="message-form-preview-image"
            src={preview}
            onLoad={() => URL.revokeObjectURL(preview)}
            alt="message-form-preview"
          />
          <XMarkIcon
            className="message-form-icon-x"
            onClick={() => {
              setPreview("");
              setAttachment("");
            }}
          />
        </div>
      )}

      <div className="message-form">
        <div className="message-form-input-container">
          <input
            className="message-form-input"
            type="text"
            value={message}
            onChange={handleOnChnage}
            placeholder="Send a message ..."
          />
        </div>
        <div className="message-form-icons">
          <Dropzone
            acceptedFiles=".jpg, .jpeg, .png"
            multiple={false}
            noClick={true}
            onDrop={(acceptedFiles) => {
              setAttachment(acceptedFiles[0]);
              setPreview(URL.createObjectURL(acceptedFiles[0]));
            }}>
            {({ getRootProps, getInputProps, open }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <PaperClipIcon
                  className="message-form-icon-clip"
                  onClick={open}
                />
              </div>
            )}
          </Dropzone>

          <hr className="vertical-line" />
          <PaperAirplaneIcon
            className="message-form-icon-airplane"
            onClick={() => {
              setPreview("");
              handleOnSubmit();
            }}
          />
        </div>
      </div>
    </div>
  );
};
