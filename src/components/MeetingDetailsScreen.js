import { CheckIcon, ClipboardIcon, ShareIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { firestore } from '../firebase/firebaseConfig';

export function MeetingDetailsScreen({
  onClickJoin,
  _handleOnCreateMeeting,
  participantName,
  setParticipantName,
  onClickStartMeeting,
  handleCancelVideoCall,
  recentServers,
  user
}) {
  const [meetingId, setMeetingId] = useState("");
  const [meetingIdError, setMeetingIdError] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [iscreateMeetingClicked, setIscreateMeetingClicked] = useState(false);
  const [isJoinMeetingClicked, setIsJoinMeetingClicked] = useState(false);
  const [selectedServer, setSelectedServer] = useState('');

  const handleCopy = () => {
    navigator.clipboard.writeText(meetingId);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  const handleShare = async () => {
    if (!selectedServer) {
      toast('Please select a server to share with.', {
        position: "bottom-left",
        autoClose: 4000,
        hideProgressBar: true,
        closeButton: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    try {
      const server = recentServers.find(server => server.id === selectedServer);
      await firestore.collection("servers").doc(server.id).collection("messages").add({
        sender: user.displayName,
        text: meetingId,
        timestamp: new Date(),
      });
      toast('Meeting ID shared successfully!', {
        position: "bottom-left",
        autoClose: 4000,
        hideProgressBar: true,
        closeButton: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      toast(`Failed to share: ${err.message}`, {
        position: "bottom-left",
        autoClose: 4000,
        hideProgressBar: true,
        closeButton: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div
      className={`flex flex-1 flex-col justify-center w-full md:p-[6px] sm:p-1 p-1.5`}
    >
      {iscreateMeetingClicked ? (
        <div className="border border-solid border-gray-400 rounded-xl px-4 py-3  flex items-center justify-center">
      <select
  className="ml-2 p-2 bg-gray-800 text-white border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  style={{ backgroundColor: '#2d3748' }} // Custom dark background color
  value={selectedServer}
  onChange={(e) => setSelectedServer(e.target.value)}
>
  <option className="bg-gray-800 text-white" value="" disabled>Select Server</option>
  {recentServers.map(server => (
    <option className="bg-gray-800 text-white" key={server.id} value={server.id}>
      {server.name} {server.isOwnerServer ? "(Owner)" : ""}
    </option>
  ))}
</select>


      <button
        className="ml-2"
        onClick={handleShare}
      >
        <ShareIcon className="h-5 w-5 text-white" />
      </button>
        </div>
      ) : isJoinMeetingClicked ? (
        <>
          <input
            defaultValue={meetingId}
            onChange={(e) => {
              setMeetingId(e.target.value);
            }}
            placeholder={"Enter meeting Id"}
            className="px-4 py-3 bg-gray-650 rounded-xl text-white w-full text-center"
          />
          {meetingIdError && (
            <p className="text-xs text-red-600">{`Please enter valid meetingId`}</p>
          )}
        </>
      ) : null}

      {(iscreateMeetingClicked || isJoinMeetingClicked) && (
        <>
          <input
            value={participantName}
            onChange={(e) => setParticipantName(e.target.value)}
            placeholder="Enter your name"
            className="px-4 py-3 mt-5 bg-gray-650 rounded-xl text-white w-full text-center"
          />

          {/* <p className="text-xs text-white mt-1 text-center">
            Your name will help everyone identify you in the meeting.
          </p> */}
          <button
            disabled={participantName.length < 3}
            className={`w-full ${participantName.length < 3 ? "bg-gray-650" : "bg-purple-350"
              }  text-white px-2 py-3 rounded-xl mt-5`}
            onClick={(e) => {
              if (iscreateMeetingClicked) {
                onClickStartMeeting();
              } else {
                if (meetingId.match("\\w{4}\\-\\w{4}\\-\\w{4}")) {
                  onClickJoin(meetingId);
                } else setMeetingIdError(true);
              }
            }}
          >
            {iscreateMeetingClicked ? "Start a meeting" : "Join a meeting"}
          </button>
        </>
      )}

      {!iscreateMeetingClicked && !isJoinMeetingClicked && (
        <div className="w-full md:mt-0 mt-4 flex flex-col">
          <div className="flex items-center justify-center flex-col w-full ">
            <button
              className="w-full bg-purple-350 text-white px-2 py-3 rounded-xl"
              onClick={async (e) => {
                const { meetingId, err } = await _handleOnCreateMeeting();
              
                if (meetingId) {
                  setMeetingId(meetingId);
                  setIscreateMeetingClicked(true);
                } else {
                  toast(
                    `${err}`,
                    {
                      position: "bottom-left",
                      autoClose: 4000,
                      hideProgressBar: true,
                      closeButton: false,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                    }
                  );
                }
              }}
            >
              Create a meeting
            </button>
            <button
              className="w-full bg-gray-650 text-white px-2 py-3 rounded-xl mt-5"
              onClick={(e) => {
                setIsJoinMeetingClicked(true);
              }}
            >
              Join a meeting
            </button>
          </div>
        </div>
      )}
      <button
              className="w-full bg-gray-650 text-red-500 px-2 py-3 rounded-xl mt-5"
              onClick={(e) => {
                handleCancelVideoCall(true);
              }}
            >
              Leave meeting
            </button>
    </div>
  );
}
