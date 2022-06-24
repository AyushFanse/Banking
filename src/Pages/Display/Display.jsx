import React, { useState, useEffect } from "react";
import Popup from "../../Common/AlertPopup/Popup";
import fileDownload from "js-file-download";
import axios from "axios";
import "./display.css";

const Display = ({ URL }) => {
  const [OutputFile, setOutputFile] = useState(false);
  const [file, setFile] = useState("");
  const [ext, setExt] = useState('');
  const [loading, setLoading] = useState(false);
  const [Worning, setWorning] = useState("");

  useEffect(() => { }, [OutputFile]);

  const handelSubmit = async (e) => {
    e.preventDefault();

    try {

      setLoading(true);
      if (file) {

        const formData = new FormData();
        formData.append("file", file);

        let res = await axios.post(`${URL}/file/post`, formData);

        if (res.status === 201) {
          setWorning({ status: "success", msg: res.data.msg });
          setTimeout(() => {
            e.target.reset();
          }, 1000);
          setExt(res.data.ext)
          setOutputFile(true);
          setFile('')
          setLoading(false);
        }
      } else {
        setWorning({
          status: "error",
          msg: "Please select your (.text or .csv) file.",
        });
        setLoading(false);
      }
    } catch (err) {
      if (!err.response) {
        setWorning({ status: "error", msg: "Your Are offline" });
        setLoading(false);
        return;
      }

      setWorning({ status: "error", msg: err.response.data.msg });
      setLoading(false);
    }
    setLoading(false);
  };

  const handleDownload = async () => {
    let res = await axios.get(`${URL}/file/get`, {
      responseType: "blob",
    });

    if (res) {
      fileDownload(res.data, `Output${ext}`);
      setWorning({
        status: "success",
        msg: "Note: File will be deleted automatically after 2sec.",
      });
      setTimeout(() => {
        setOutputFile("");
      }, 2000);
    }
  };

  return (
    <>
      {Worning ? (
        <Popup
          security={Worning.status}
          message={Worning.msg}
          Worning={setWorning}
        />
      ) : null}
      <div className='App'>
        <header className='App-header'>
          <h1>SAHAJ BANKING</h1>
          <form
            onSubmit={(e) => {
              handelSubmit(e);
            }}
          >
            <div className='App-FieldOut'>
              <label htmlFor='formFile' className='form-label App-Title'>
                Input File:
              </label>
              <input
                className='form-control App-Input'
                type='file'
                name='file'
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
                id='formFile'
                accept='.text'
              />
              <div className='App-Button'>
                <button
                  type='submit'
                  className='btn btn-primary btn-md'
                  aria-pressed='true'
                  title='Upload'
                >
                  Upload
                </button>

                {OutputFile ? (
                  <button
                    type='button'
                    title='Download'
                    className='btn btn-primary btn-floating'
                    onClick={() => handleDownload()}
                  >
                    <i className='fas fa-download'></i>
                  </button>
                ) : null}
              </div>
            </div>
          </form>
        </header>

        {loading ? (
          <div className='App-Loading'>
            <div className='spinner-grow spinner-grow-sm' role='status'></div>
            <div
              className='spinner-grow'
              style={{ width: "3rem", height: "3rem" }}
              role='status'
            ></div>
            <div className='spinner-grow spinner-grow-sm' role='status'></div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Display;
