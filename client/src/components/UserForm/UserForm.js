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
        <h4 className="text-dark-1 col-3">Name</h4>
        <input
          type="text"
          className="form-control border-primary-subtle col"
          name="fullName"
          id="inputFullName"
          value={user.userInfos.fullName}
          readOnly={!editMode}
          required
          onChange={(e) => updateInfoField(e)}
        />
      </div>
      <div className="form-group row pb-5">
        <h4 className="text-dark-1 col-3">SĐT</h4>
        <input
          type="tel"
          className="form-control border-primary-subtle col"
          id="inputPhoneNumber"
          name="phoneNumber"
          value={user.phoneNumber}
          readOnly={!editMode}
          pattern="[0-9]{10}"
          required
          onChange={(e) => updateUserField(e)}
        />
      </div>
      <div className="form-group row pb-5">
        <h4 className="text-dark-1 col-3">Email</h4>
        <input
          type="email"
          className="form-control border-primary-subtle col"
          id="inputEmail"
          name="email"
          value={user.email}
          readOnly={!editMode}
          placeholder="abc@gmail.com"
          required
          onChange={(e) => updateUserField(e)}
        />
      </div>
      <div className="form-group row pb-5">
        <h4 className="text-dark-1 col-3">Gender</h4>
        <select
          type="text"
          className="form-control border-primary-subtle col"
          id="inputGender"
          name="gender"
          value={user.userInfos.gender}
          readOnly={!editMode}
          required
          onChange={(e) => updateInfoField(e)}
        >
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div className="form-group row pb-5">
        <h4 className="text-dark-1 col-3">Date of birth:</h4>
        <input
          type="text"
          className="form-control border-primary-subtle col"
          placeholder="dd/mm/yyyy"
          id="inputDob"
          name="dob"
          value={user.userInfos.dob}
          readOnly={!editMode}
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
              className="form-control border-primary-subtle col"
              name="doctorID"
              value={user.userInfos.doctorID}
              readOnly
            />
          </div>
          <div className="form-group row pb-5">
            <h4 className="text-dark-1 col-3">Specialty</h4>
            <input
              type="text"
              className="form-control border-primary-subtle col"
              name="medSpecialty"
              value={user.userInfos.medSpecialty}
              readOnly
            />
          </div>
        </div>
      )}
    </div>
  );
}
