import { useSelector } from "react-redux";
import UserCard from "./UserCard";
import { useState } from "react";
import EditProfile from "./EditProfile";

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [toast, setToast] = useState(false);
  const user = useSelector((state) => state.user);

  const handleEdit = (isEditing) => {
    setIsEdit(isEditing);
  };

  const handleToast = (show) => {
    setToast(show);
    setTimeout(() => {
      setToast(false);
    }, 3000);
  };
  return (
    <>
      <div className="flex justify-center">
        {user && (
          <UserCard user={user} isProfile={true} handleEdit={handleEdit} />
        )}
        {isEdit && user && (
          <EditProfile
            user={user}
            handleEdit={handleEdit}
            handleToast={handleToast}
          />
        )}
        {toast && (
          <div className="toast toast-end toast-middle">
            <div className="alert alert-success">
              <span>Profile updated successfully.</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
