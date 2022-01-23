import React, { useState, useEffect } from "react";
import NavigationBar from "./NavigationBar";
import axios from "axios";

const ListContact = () => {
  const [getDatas, setDatas] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:3100/api/contacts",
    }).then((results) => {
      setDatas(results.data.payload);
    });
  }, []);

  function deleteContact(id) {
    axios({
      method: "DELETE",
      url: `http://localhost:3100/api/contacts/${id}`,
    }).then((results) => {
      window.location.reload()
    })
  }


  return (
    <div>
      <NavigationBar />
      <div style={{ marginTop: 65 }}>
        <div className="container-fluid">
          <h3 className="text-center">Daftar Kontak Saya</h3>
          <div className="w-full mw-full">
            <div className="card p-0 bg-very-dark-dm">
              <div className="table-responsive">
                <table className="table table-inner-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name Lengkap</th>
                      <th>Nomor Telepon</th>
                      <th>Catatan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getDatas.map((data, index) => {
                      return (
                        <tr key={index}>
                          <th>{index + 1}</th>
                          <td>{data.fullname}</td>
                          <td>{data.phone}</td>
                          <td>
                            <div className="row">
                              <div className="col-10">{data.note}</div>
                              <div className="col-1">
                                <span
                                  style={{ cursor: "pointer" }}
                                >
                                  <a href={`/edit-contact/${data.id}`}>
                                  🔍
                                  </a>
                                </span>
                              </div>
                              <div className="col-1">
                                <span
                                  style={{ cursor: "pointer" }}
                                  onClick={() => deleteContact(data.id)}
                                >
                                  ❌
                                </span>
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListContact;
