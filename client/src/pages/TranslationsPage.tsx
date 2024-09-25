import { ChangeEvent, useContext, useState } from "react";
import { Store } from "../App";
import useAxios from "../hooks/useAxios";
import { convertDate } from "../util/convertDate";
import "./styles/translationPage.scss";
import getAxios from "../util/getAxios";

type Translation = {
  _id: string;
  title: string;
  date: string;
};

export default function TranslationsPage() {
  const { data, isLoading } = useAxios({ url: import.meta.env.VITE_SERVER_URL + "/translations/get" }, []);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => setSelectedFile(e.target.files?.[0] ?? null);
  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const onDateChange = (e: ChangeEvent<HTMLInputElement>) => setDate(e.target.value);

  const { user } = useContext(Store);
  const canEdit = user.role === "admin";

  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const onDelete = async (id: string) => {
    if (!canEdit) return;

    await getAxios({
      url: import.meta.env.VITE_SERVER_URL + "/translations/delete/" + id,
      method: "DELETE",
    });
  };

  // Uploading the file to the server
  const onSubmit = async (e: any) => {
    if (!selectedFile || !title || !date) {
      e.preventDefault();
      return alert("Please fill out all fields");
    }

    if (!canEdit) return;

    e.preventDefault();

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("title", title);
    formData.append("date", date);

    await fetch(import.meta.env.VITE_SERVER_URL + "/translations/upload", {
      method: "POST",
      body: formData,
    });

    setTitle("");
    setDate("");
    setSelectedFile(null);

    window.location.reload();
  };

  const handleDeleteButton = (e: any) => {
    e.preventDefault();
    setDeleteConfirm(true);
  };

  return (
    <div className="translations-page">
      <h1>Translations</h1>
      {canEdit ? (
        <div className="translation-upload">
          <h2>Upload Translation</h2>
          <form onSubmit={onSubmit}>
            <input type="file" name="translation" onChange={onFileChange} accept="application/pdf" />
            <input type="text" name="title" placeholder="Title" onChange={onTitleChange} />
            <input type="date" name="date" onChange={onDateChange} />
            <button type="submit">Upload</button>
          </form>
        </div>
      ) : null}

      <div>
        <div className="translation-wrapper">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            data.map((translation: Translation) => (
              <div key={translation._id}>
                <a
                  className="translation-link"
                  href={import.meta.env.VITE_SERVER_URL + "/translations/pdfs/" + translation._id}
                  target="_blank"
                  rel="noreferrer"
                >
                  {translation.title}
                  <br />
                  <div className="translation-date">{convertDate(translation.date)} </div>
                </a>
                {canEdit ? (
                  <form onSubmit={() => onDelete(translation._id)}>
                    {deleteConfirm ? (
                      <>
                        <button className="button-delete" type="submit">
                          Confirm
                        </button>
                        <button className="button-cancel" onClick={() => setDeleteConfirm(false)}>
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button className="button-delete" onClick={handleDeleteButton} type="button">
                        Delete
                      </button>
                    )}
                  </form>
                ) : null}
              </div>
            ))
          )}
        </div>
      </div>

      {data && data.length === 0 ? <div>No translations found</div> : null}
    </div>
  );
}
