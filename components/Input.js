import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import React, { useRef, useState } from "react";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useSession } from "next-auth/react";

function Input() {
  const { data: session } = useSession();

  const [input, setinput] = useState("");
  const [selectedfile, setselectedfile] = useState(null);
  const filePickerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [showemojis, setShowemojis] = useState(false);

  const addemoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setinput(input + emoji);
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setselectedfile(readerEvent.target.result);
    };
  };

  const sendpost = async () => {
    if (loading) return;
    setLoading(true);

    const docref = await addDoc(collection(db, "posts"), {
      id: session.user.uid,
      username: session.user.name,
      userimage: session.user.image,
      tag: session.user.tag,
      text: input,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docref.id}/image`);

    if (selectedfile) {
      await uploadString(imageRef, selectedfile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docref.id), {
          image: downloadURL,
        });
      });
    }
    setLoading(false);
    setinput("");
    setselectedfile(null);
    setShowemojis(false);
  };
  return (
    <div
      className={`border-b border-gray-700 p-3 flex space-x-3 ${
        loading && "opacity-60"
      }`}
    >
      <img
        src={session.user.image}
        className="h-11 w-11 rounded-full xl:mr-2 cursor-pointer"
        alt=""
      />
      <div className="w-full divide-y divide-gray-700">
        <div className={`${selectedfile && "pb-7"} ${input && "space-y-2.5"}`}>
          <textarea
            rows="2"
            placeholder="what's happening?"
            value={input}
            onChange={(e) => setinput(e.target.value)}
            className="bg-transparent min-h-[50px] outline-none 
            text-[#d9d9d9] placeholder-gray-500 w-full tracking-wide"
          />
          {selectedfile && (
            <div className="relative">
              <div
                onClick={() => setselectedfile(null)}
                className="absolute w-8 h-8 bg-[#15181c] 
              hover:bg-[#272c26] bg-opacity-75 rounded-full flex  items-center
               justify-center top-1 left-1 cursor-pointer "
              >
                <XIcon className="text-white h-5" />
              </div>
              <img
                src={selectedfile}
                alt="user"
                className="rounded-2xl max-h-80 object-contain"
              />
            </div>
          )}
        </div>
        {!loading && (
          <div className="flex items-center justify-between pt-2.5">
            <div className="flex items-center">
              <div
                className="icon"
                onClick={() => filePickerRef.current.click()}
              >
                <PhotographIcon className="h-[22px] text-[#1d9bf0]" />
                <input
                  type="file"
                  onChange={addImageToPost}
                  ref={filePickerRef}
                  className="hidden"
                />
              </div>
              <div className="icon rotate-90">
                <ChartBarIcon className="h-[22px] text-[#1d9bf0]" />
              </div>
              <div className="icon" onClick={() => setShowemojis(!showemojis)}>
                <EmojiHappyIcon className="h-[22px] text-[#1d9bf0]" />
              </div>
              <div className="icon">
                <CalendarIcon className="h-[22px] text-[#1d9bf0]" />
              </div>
              {showemojis && (
                <Picker
                  onSelect={addemoji}
                  style={{
                    position: "absolute",
                    marginTop: "465px",
                    marginLeft: -40,
                    maxWidth: "300px",
                    borderRadius: "20px",
                  }}
                  theme="dark"
                />
              )}
            </div>
            <button
              onClick={sendpost}
              className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md 
        hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
              disabled={!input.trim() && !selectedfile}
            >
              Tweet
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Input;
