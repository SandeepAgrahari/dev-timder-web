import { useSelector } from "react-redux";
import UserCard from "./UserCard";
import { useState } from "react";
import EditProfile from "./EditProfile";

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const user = useSelector((state) => state.user);

  const handleEdit = (isEditing) => {
    setIsEdit(isEditing);
  };
  return (
    <>
      <div className="flex justify-center">
        {user && (
          <UserCard user={user} isProfile={true} handleEdit={handleEdit} />
        )}
        {isEdit && user && <EditProfile user={user} handleEdit={handleEdit} />}
      </div>
    </>
  );
};

export default Profile;
