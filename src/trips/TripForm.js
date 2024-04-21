import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../common/Alert";
import UserContext from "../auth/UserContext";
import TravelerApi from "../api/api";
import "./TripForm.css";

/** New Trip form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 *
 * Routes -> NewTripForm -> Alert
 * Routed as /trips/new
 */

function TripForm() {
  const history = useHistory();
  const { currentUser } = useContext(UserContext);

  const [inputFields, setInputFields] = useState([{ file: "", caption: "" }]);
  const [tripData, setTripData] = useState({
    title: "",
    userId: currentUser.id
  });

  const [formErrors, setFormErrors] = useState([]);

  console.debug(
    "TripForm",
    "tripTitle=", tripData.title,
    "inputFields=", inputFields,
    "formErrors=", formErrors
  );

  /** Handle form submit:
   *
   * Calls login func prop and, if successful, redirect to /trips.
   */

  async function handleSubmit(evt) {
    evt.preventDefault();
    
    try {
        let resp = await TravelerApi.createTrip(tripData);
        let tripId = resp.id;

        inputFields.forEach(async (field) => {
            const formData = new FormData();
            formData.append(`file`, field.file);
            formData.append(`caption`, field.caption);
            await TravelerApi.addImageToTrip(tripId, formData);
          });

    } catch(error) {
        console.error("Error submitting new trip:", error);
    }
    history.push("/thankyou");
  }

/** Update form data field */
    function handleTitleChange(evt) {
        const { name, value } = evt.target;
        setTripData(data => ({ ...data, [name]: value }));
    }

  /** Update form data field */
  function handleFileChange(index, evt) {
    let data = [...inputFields];
    data[index]["file"] = evt.target.files[0];
    setInputFields(data);
  }

  function handleCaptionChange(index, evt) {
    let data = [...inputFields];
    data[index]["caption"] = evt.target.value;
    setInputFields(data);
  }

  const addFields = () => {
    let newField = { file: "", caption: "" };
    setInputFields([...inputFields, newField]);
  };

  const removeFields = (index) => {
    let data = [...inputFields];
    data.splice(index, 1);
    setInputFields(data);
  };

  return (
    <div className="TripForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h2 className="mb-3">Create a New Trip</h2>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="form-group">
                <label htmlFor="title">Title of Trip</label>
                <input
                  name="title"
                  className="form-control"
                  value={tripData.title}
                  onChange={handleTitleChange}
                />
              </div>
              <label>Choose your images</label>
              {inputFields.map((input, index) => {
                return (
                  <div key={index}>
                    <input
                      type="file"
                      name="file"
                      accept="image/png image/jpeg"
                      className="form-control"
                      onChange={(event) => handleFileChange(index, event)}
                    />
                    <input
                      name="caption"
                      placeholder="Caption"
                      value={input.caption}
                      className="form-control"
                      onChange={(event) => handleCaptionChange(index, event)}
                    />
                    <button onClick={() => removeFields(index)}
                            className="btn btn-danger float-right remove-btn">
                                Remove
                    </button>
                  </div>
                );
              })}
              <button onClick={addFields} type="button" className="btn btn-secondary add-btn mt-5">
                Add More Images
                </button>

              <button onClick={handleSubmit} type="submit" className="btn btn-primary float-left mt-5 submit-btn">
                    Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TripForm;
