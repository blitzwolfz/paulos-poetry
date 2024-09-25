import { useContext, useEffect, useRef, useState } from "react";
import { HandThumbsUp, HandThumbsUpFill } from "react-bootstrap-icons";
import { Store } from "../App";
import Loading from "../components/Loading";
import TextAreaResize from "../components/TextAreaResize";
import useAxios from "../hooks/useAxios";
import { CommentObject, SetState, TPoem } from "../types";
import getAxios from "../util/getAxios";
import { getTimeSince } from "../util/getTimeSince";
import "./styles/poetryPage.scss";

export default function PoetryPage() {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [makingNewPoem, setMakingNewPoem] = useState(false);
  const { data, isLoading, error } = useAxios({ url: `${import.meta.env.VITE_SERVER_URL}/poems` }, [editingId, makingNewPoem]);

  const { user } = useContext(Store);
  const canEdit = user.role === "admin";

  const [newPoemTitle, setNewPoemTitle] = useState("");
  const [newPoemEnglish, setNewPoemEnglish] = useState("");
  const [newPoemGreek, setNewPoemGreek] = useState("");

  const handleNewPoemSubmit = async (e: any) => {
    e.preventDefault();

    await getAxios({
      url: import.meta.env.VITE_SERVER_URL + "/poems/new",
      method: "POST",
      data: { title: newPoemTitle, english: newPoemEnglish, greek: newPoemGreek },
    });

    setMakingNewPoem(false);
  };

  const sortedPoemData = data?.sort((a: any, b: any) => b.date - a.date);

  return (
    <div className="poetry-page">
      <h1>My Poetry</h1>
      {canEdit ? (
        <div className="new-poem-button">
          <button onClick={() => setMakingNewPoem(true)}>New</button>
        </div>
      ) : null}

      {makingNewPoem ? (
        <>
          <form className="poem-wrapper poem-edit" onSubmit={handleNewPoemSubmit}>
            <h2>New Poem</h2>
            <div className="poem">
              <h3>Title</h3>
              <input type="text" value={newPoemTitle} onChange={(e) => setNewPoemTitle(e.target.value)} />
              <h3 style={{ textDecoration: "underline" }}>English</h3>
              <TextAreaResize value={newPoemEnglish} onChange={(e) => setNewPoemEnglish(e.target.value)} />
              <h3 style={{ textDecoration: "underline" }}>Greek</h3>
              <TextAreaResize value={newPoemGreek} onChange={(e) => setNewPoemGreek(e.target.value)} />
              <div className="poem-edit-button-wrapper">
                <button type="submit">Save</button>
                <button onClick={() => setMakingNewPoem(false)}>Cancel</button>
              </div>
            </div>
          </form>
        </>
      ) : null}
      {isLoading ? <Loading /> : null}
      {error ? <div>{JSON.stringify(error)}</div> : null}
      <div className="poem-wrapper">
        {sortedPoemData
          ? sortedPoemData.map((poem: any) => (
              <Poem key={poem._id} {...poem} editing={editingId === poem._id} canEdit={canEdit} setEditingId={setEditingId} />
            ))
          : null}
      </div>
    </div>
  );
}

type Lang = "english" | "greek";
type Props = TPoem & { canEdit: boolean; editing: boolean; setEditingId: SetState<string | null>; likes: number[] };
function Poem(props: Props) {
  const { _id, english, title, greek, editing, setEditingId, canEdit, comments: initialComments, likes } = props;
  const [language, setLanguage] = useState<Lang>("english");
  const [comments, setComments] = useState<CommentObject[]>(initialComments ?? []);

  const setEnglish = () => setLanguage("english");
  const setGreek = () => setLanguage("greek");
  const handleCancel = () => setEditingId(null);
  const handleEdit = () => {
    if (canEdit) setEditingId(_id);
  };

  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const handleDeleteButton = () => {
    if (!deleteConfirm) setDeleteConfirm(true);
  };

  const handleDelete = async () => {
    await getAxios({
      url: import.meta.env.VITE_SERVER_URL + "/poems/delete",
      method: "POST",
      data: { id: _id },
    });
  };

  const [englishValue, setEnglishValue] = useState(english);
  const [greekValue, setGreekValue] = useState(greek);
  const [titleValue, setTitleValue] = useState(title);

  // Submit
  const onSubmit = async (e: any) => {
    e.preventDefault();

    // Post to server
    await getAxios({
      url: import.meta.env.VITE_SERVER_URL + "/poems/update",
      method: "POST",
      data: { id: _id, title: titleValue, english: englishValue, greek: greekValue },
    });

    // Reset values
    setEditingId(null);
    setEnglishValue("");
    setGreekValue("");
    setTitleValue("");
  };

  const [showComments, setShowComments] = useState(false);

  return (
    <div className="poem">
      {editing ? (
        <form className="poem-edit" onSubmit={onSubmit}>
          <input type="text" value={titleValue} onChange={(e) => setTitleValue(e.target.value)} />

          <h3 style={{ textDecoration: "underline" }}>English</h3>
          <TextAreaResize value={englishValue} onChange={(e) => setEnglishValue(e.target.value)} />

          <h3 style={{ textDecoration: "underline" }}>Greek</h3>
          <TextAreaResize value={greekValue} onChange={(e) => setGreekValue(e.target.value)} />
          <div className="poem-edit-button-wrapper">
            <button type="submit">Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      ) : (
        <>
          {canEdit ? (
            <>
              <button className="poem-edit-btn" onClick={handleEdit}>
                Edit
              </button>
            </>
          ) : null}
          <h2>{title}</h2>
          <div className="poem-button-wrapper">
            <button onClick={setEnglish} data-active={language === "english"}>
              English
            </button>
            <button onClick={setGreek} data-active={language === "greek"}>
              Greek
            </button>
          </div>
          {language === "english" ? <pre>{english}</pre> : <pre>{greek}</pre>}

          {canEdit ? (
            <>
              {deleteConfirm ? (
                <form className="delete-form">
                  <button className="delete-confirm" onClick={handleDelete}>
                    Confirm
                  </button>
                  <button className="delete-cancel" onClick={() => setDeleteConfirm(false)}>
                    Cancel
                  </button>
                </form>
              ) : (
                <button style={{ width: "100px", margin: "auto" }} className="delete-confirm" onClick={handleDeleteButton}>
                  Delete
                </button>
              )}
            </>
          ) : null}

          <MenuBar setShowComments={setShowComments} likes={likes ?? []} poemId={_id} />
        </>
      )}

      {showComments ? <CommentSection poemId={_id} comments={comments ?? []} setComments={setComments} /> : null}
    </div>
  );
}

type MenuBarProps = {
  poemId: string;
  setShowComments: SetState<boolean>;
  likes: number[];
};

export function MenuBar({ setShowComments, likes, poemId }: MenuBarProps) {
  const { user } = useContext(Store);
  const [liked, setLiked] = useState(user.id ? likes.includes(user.id) : false);
  const likesLengthRef = useRef(likes.length);

  useEffect(() => {
    if (user.id) setLiked(likes.includes(user.id));
  }, [user.id]);

  const handleLike = async () => {
    setLiked(true);
    likesLengthRef.current++;

    await getAxios({
      url: import.meta.env.VITE_SERVER_URL + "/poems/like",
      method: "POST",
      data: { id: poemId, like: true, userId: user.id },
    });
  };

  const handleUnlike = async () => {
    setLiked(false);
    likesLengthRef.current--;

    await getAxios({
      url: import.meta.env.VITE_SERVER_URL + "/poems/like",
      method: "POST",
      data: { id: poemId, like: false, userId: user.id },
    });
  };

  const toggleCommentSection = () => {
    setShowComments((prev) => !prev);
  };

  const loggedIn = user.id !== null;

  return (
    <div className="poem-footer">
      <div className="action-bar">
        {liked ? (
          <button onClick={handleUnlike}>
            <HandThumbsUpFill />
          </button>
        ) : (
          <button onClick={handleLike} disabled={!loggedIn} style={{ cursor: loggedIn ? "pointer" : "not-allowed" }}>
            <HandThumbsUp />
          </button>
        )}
        <div>
          {likesLengthRef.current} {likesLengthRef.current === 1 ? "like" : "likes"}
        </div>
        <button onClick={toggleCommentSection}>Comments</button>
      </div>
    </div>
  );
}

type CommentSectionProps = { poemId: string; comments: CommentObject[]; setComments: SetState<CommentObject[]> };
export function CommentSection({ poemId, comments, setComments }: CommentSectionProps) {
  const { user } = useContext(Store);

  const [comment, setComment] = useState("");
  const onSubmit = async (e: any) => {
    e.preventDefault();

    if (!user.id) return alert("You must be logged in to comment");

    const commentObject: CommentObject = {
      _id: "", // MongoDB will generate this
      text: comment,
      date: Date.now(),
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };

    await getAxios({
      url: import.meta.env.VITE_SERVER_URL + "/poems/comment",
      method: "POST",
      data: { id: poemId, comment: commentObject },
    });

    setComment("");
    setComments((prev) => {
      return [...prev, commentObject];
    });
  };

  return (
    <div className="comment-section">
      <h4>Comments</h4>

      {comments.map((comment) => (
        <Comment key={comment._id} name={comment.user.firstName + " " + comment.user.lastName} date={comment.date} text={comment.text} />
      ))}

      <form className="comment-form" onSubmit={onSubmit}>
        <TextAreaResize
          placeholder="comment..."
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />

        <button type="submit">Comment</button>
      </form>
    </div>
  );
}

type CommentProps = {
  name: string;
  text: string;
  date: number;
};

export function Comment({ name, text, date }: CommentProps) {
  return (
    <div className="comment">
      <div className="comment-header">
        <h5 className="comment-username">{name}</h5>
        <div className="comment-date">{getTimeSince(date)}</div>
      </div>
      <pre className="comment-text">{text}</pre>
    </div>
  );
}
