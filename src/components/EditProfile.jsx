import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Toast from "./Toast";
import { addUser } from "../redux/features/userSlice";

const EditProfile = ({ user, handleEdit }) => {
  const [toast, setToast] = useState(null);
  const [error, setError] = useState("");
  const { firstName, lastName, email, age, gender, skills, photoUrl, about } =
    user;
  const [userInfo, setUserInfo] = useState({
    firstName,
    lastName,
    email,
    age,
    gender,
    skills,
    photoUrl,
    about,
  });
  const dispatch = useDispatch();
  const genders = ["male", "female", "other"];
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };
  const showToast = (type, message) => {
    setToast({ type, message });
    // setTimeout(() => setToast(null), 3000);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    let skillsArray = userInfo.skills;
    if (typeof userInfo.skills === "string") {
      skillsArray = userInfo.skills.split(",").map((skill) => skill.trim());
    }
    const updatedUserInfo = { ...userInfo, skills: skillsArray };
    try {
      const res = await axios.patch(`${apiUrl}/profile/edit`, updatedUserInfo, {
        withCredentials: true,
      });
      if (res.status === 200) {
        dispatch(addUser(res.data.data));
        showToast(
          "success",
          res.data.message || "User details updated successfully!"
        );
        handleEdit(false);
      }
    } catch (e) {
      setError(e?.response?.data);
      console.log(e);
    }
  };
  return (
    <div className="flex justify-center m-8">
      <div className="flex max-w-lg mx-auto p-6 bg-base-300 card card-border bg-base-100 w-auto">
        <form className="space-y-6" onSubmit={handleUpdate}>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                id="firstName"
                type="text"
                placeholder="Enter First Name"
                className="input input-bordered w-full"
                value={userInfo.firstName}
                name="firstName"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="lastName" className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                id="lastName"
                type="text"
                placeholder="Enter Last Name"
                className="input input-bordered w-full"
                value={userInfo.lastName}
                name="lastName"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="email" className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter Email"
                className="input input-bordered w-full"
                value={userInfo.email}
                name="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="skills" className="label">
                <span className="label-text">Skills</span>
              </label>
              <input
                id="skills"
                type="text"
                placeholder="Enter Skills with comma seprated"
                className="input input-bordered w-full"
                value={userInfo.skills}
                name="skills"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="age" className="label">
                <span className="label-text">Age</span>
              </label>
              <input
                id="age"
                type="age"
                placeholder="Enter Age"
                className="input input-bordered w-full"
                value={userInfo.age}
                name="age"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="gender" className="label">
                <span className="label-text">Gender</span>
              </label>
              <select
                id="gender"
                className="select"
                value={userInfo.gender ?? "Pick a Gender"}
                name="gender"
                onChange={handleChange}
              >
                <option disabled>Pick a Gender</option>
                {genders.map((gen) => (
                  <option key={gen}>
                    {gen.charAt(0).toUpperCase() + gen.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid">
            <div className="w-100">
              <label htmlFor="about" className="label">
                <span className="label-text">About</span>
              </label>
              <fieldset className="fieldset w-100">
                <textarea
                  id="about"
                  name="about"
                  className="textarea h-24 w-100"
                  placeholder="About"
                  value={userInfo.about}
                  onChange={handleChange}
                ></textarea>
              </fieldset>
            </div>
          </div>

          <div>
            <button className="btn btn-primary w-full">Submit</button>
          </div>
        </form>
      </div>
      {toast !== null && <Toast type={toast.type} message={toast.message} />}
    </div>
  );
};

export default EditProfile;
