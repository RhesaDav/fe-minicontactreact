import React, { useEffect, useState } from "react";
import NavigationBar from "./NavigationBar";
import axios from "axios";
import { useParams } from "react-router-dom";

const EditContactForm = () => {
  const [getFullName, setFullName] = useState("");
  const [getPhone, setPhone] = useState("");
  const [getNote, setNote] = useState("");

  const {id} = useParams()

  const inputHandlerFullName = (fullname) => {
    return setFullName(fullname);
  };

  const inputHandlerPhone = (phone) => {
    return setPhone(phone);
  };

  const inputHandlerNote = (note) => {
    return setNote(note);
  };

  useEffect (() => {
    getOneContact()
  }, [])

  function getOneContact() {
    axios({
      method: "get",
      url: `http://localhost:3100/api/contacts/${id}`
    }).then ((results) => {
      if(results.data.status == 200){
        setFullName(results.data.payload[0].fullname)
        setPhone(results.data.payload[0].phone)
        setNote(results.data.payload[0].note)
      } else {
        alert("data tidak ada");
      }
    })
  }

  function editContact() {
    axios({
      method: "put",
      url: `http://localhost:3100/api/contacts/${id}`,
      data: {
        "fullname": getFullName,
        "phone": getPhone,
        "note": getNote,
      },
    }).then((results) => {
      if(results.data.payload.affectedRows){
        alert("data berhasil diedit ✅");
        window.location.href = "/list-contact";
      }else{
        alert("data gagal diedit ❌");
        window.location.reload();
      }
    })
  }

  return (
    <div>
      <NavigationBar />
      <div style={{ marginTop: 65 }}>

        
        <div className="container">
          <div className="row">
            <div className="col-sm m-10">
              <label htmlFor="fullname" className="required">
                Nama Lengkap
              </label>
              <input
                type="text"
                className="form-control"
                required="required"
                placeholder={getFullName}
                onChange={(e) => inputHandlerFullName(e.target.value)}
              />
            </div>
            <div className="col-sm m-10">
              <label htmlFor="phone" className="required">
                Nomor Telepon
              </label>
              <input
                type="number"
                className="form-control"
                placeholder={getPhone}
                onChange={(e) => inputHandlerPhone(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm m-10">
              <label htmlFor="note">Catatan</label>
              <textarea
                type="text"
                className="form-control"
                placeholder={getNote}
                onChange={(e) => inputHandlerNote(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm m-10">
              <button
                className="btn btn-danger"
                type="button"
                onClick={() => editContact()}
                style={{ cursor: "pointer" }}
              >
                Edit Kontak
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditContactForm;
