import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Store } from "../App";
import TextAreaResize from "../components/TextAreaResize";
import useAxios from "../hooks/useAxios";
import getAxios from "../util/getAxios";
import { getTimeSince } from "../util/getTimeSince";
import "./styles/reviewsPage.scss";

export default function ReviewsPage() {
  const { data, error, isLoading } = useAxios({
    method: "GET",
    url: import.meta.env.VITE_SERVER_URL + "/reviews/get",
  });

  const { user } = useContext(Store);

  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");

  const updateMessage = (e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value);
  const updateTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    if (!user.id) {
      e.preventDefault();
      return alert("You must be logged in to add a review.");
    }

    if (!message || !title) {
      e.preventDefault();
      return alert("Please enter a title and message.");
    }

    await getAxios({
      method: "POST",
      url: import.meta.env.VITE_SERVER_URL + "/reviews/post",
      data: {
        title,
        body: message,
        author: user.firstName + " " + user.lastName,
      },
    });
  };

  return (
    <div className="reviews-page">
      {user.id ? (
        <form onSubmit={onSubmit} className="review-form">
          <h2>Add a review</h2>
          <input type="text" value={title} onChange={updateTitle} placeholder="Title" />
          <label style={{ marginTop: "15px" }} htmlFor="message">
            Message
          </label>
          <TextAreaResize value={message} onChange={updateMessage} id="message" />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <p>
          You must be{" "}
          <a style={{ color: "blue", fontWeight: "500" }} href="/login">
            logged in
          </a>{" "}
          to add a review.
        </p>
      )}

      <h1>Reviews</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <div>
          <p>There was an error loading the reviews.</p>
          <p>{error.message}</p>
        </div>
      ) : data?.length ? (
        <div className="reviews">
          {data?.map((review: any) => (
            <Review key={review._id} {...review} canDelete={user.id === review.authorId || user.role === "admin"} />
          ))}
        </div>
      ) : (
        <p>There are no reviews to display.</p>
      )}
    </div>
  );
}

type ReviewProps = {
  title: string;
  body: string;
  author: string;
  canDelete: boolean;
  date: number;
};

function Review({ title, body, author, canDelete, date }: ReviewProps) {
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const onDeleteClick = () => setDeleteConfirm(true);

  const deleteReview = async (e: FormEvent<HTMLFormElement>) => {
    if (!deleteConfirm || !canDelete) {
      e.preventDefault();
      return;
    }

    const res = await getAxios({
      method: "DELETE",
      url: import.meta.env.VITE_SERVER_URL + "/reviews/delete",
      data: { title, body, author },
    });

    console.log(res);
  };

  return (
    <div className="review-wrapper">
      <h2>{title}</h2>
      <p className="date">{getTimeSince(date)}</p>
      <pre className="body">{body}</pre>
      <p className="author"> - {author}</p>
      {canDelete ? (
        <form className="delete-form" onSubmit={deleteReview}>
          {deleteConfirm ? (
            <>
              <button type="submit" className="delete-confirm">
                Confirm
              </button>
              <button onClick={() => setDeleteConfirm(false)}>Cancel</button>
            </>
          ) : (
            <input type="button" onClick={onDeleteClick} className="delete-confirm" value="Delete" />
          )}
        </form>
      ) : null}
    </div>
  );
}
