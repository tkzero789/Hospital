export default function UserForm({ user, setUser, editMode }) {
  const updateUserField = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const updateInfoField = (event) => {
    setUser({
      ...user,
      userInfos: {
        ...user.userInfos,
        [event.target.name]: event.target.value,
      },
    });
  };
  return (
    <div>
      <div className="form-group row pb-5">
        <h5 className="text-dark-1 col-3">Name:</h5>
        <input
          type="text"
          className="form-control border-secondary-subtle col"
          name="fullName"
          id="inputFullName"
          value={user.userInfos.fullName}
          readOnly={!editMode}
          disabled={!editMode}
          required
          onChange={(e) => updateInfoField(e)}
        />
      </div>
      <div className="form-group row pb-5">
        <h5 className="text-dark-1 col-3">Phone number:</h5>
        <input
          type="tel"
          className="form-control border-secondary-subtle col"
          id="inputPhoneNumber"
          name="phoneNumber"
          value={user.phoneNumber}
          readOnly={!editMode}
          disabled={!editMode}
          pattern="[0-9]{10}"
          required
          onChange={(e) => updateUserField(e)}
        />
      </div>
      <div className="form-group row pb-5">
        <h5 className="text-dark-1 col-3">Email:</h5>
        <input
          type="email"
          className="form-control border-secondary-subtle col"
          id="inputEmail"
          name="email"
          value={user.email}
          readOnly={!editMode}
          disabled={!editMode}
          placeholder="abc@gmail.com"
          required
          onChange={(e) => updateUserField(e)}
        />
      </div>
      <div className="form-group row pb-5">
        <h5 className="text-dark-1 col-3">Gender:</h5>
        <select
          type="text"
          className="form-control border-secondary-subtle col"
          id="inputGender"
          name="gender"
          value={user.userInfos.gender}
          readOnly={!editMode}
          disabled={!editMode}
          required
          onChange={(e) => updateInfoField(e)}
        >
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div className="form-group row pb-5">
        <h5 className="text-dark-1 col-3">Date of birth:</h5>
        <input
          type="text"
          className="form-control border-secondary-subtle col"
          placeholder="dd/mm/yyyy"
          id="inputDob"
          name="dob"
          value={user.userInfos.dob}
          readOnly={!editMode}
          disabled={!editMode}
          pattern="^\d{2}\/\d{2}\/\d{4}$"
          required
          onChange={(e) => updateInfoField(e)}
        />
      </div>
      {(user.role === "head-doctor" || user.role === "doctor") && (
        <div>
          <div className="form-group row pb-5">
            <h4 className="text-dark-1 col-3">Doctor ID:</h4>
            <input
              type="text"
              className="form-control border-secondary-subtle col"
              name="doctorID"
              value={user.userInfos.doctorID}
              disabled={!editMode}
              readOnly={!editMode}
            />
          </div>
          <div className="form-group row pb-5">
            <h5 className="text-dark-1 col-3">Specialty:</h5>
            <input
              type="text"
              className="form-control border-secondary-subtle col"
              name="medSpecialty"
              value={user.userInfos.medSpecialty}
              disabled={!editMode}
              readOnly={!editMode}
            />
          </div>
        </div>
      )}
    </div>
  );
}
