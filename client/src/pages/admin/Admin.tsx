import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  deleteUser,
  getUser,
  updateUser,
} from "../../store/reducers/userReducer";
import { User } from "../../interface";

export default function Admin() {
  const getData: any = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  const [editUser, setEditUser] = useState<User | null>(null);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const handleAll = () => {
    let newUser = {
      name: "khánh",
    };
    dispatch(addUser(newUser));
  };

  const handleDeleteUser = (id: number) => {
    dispatch(deleteUser(id));
  };

  const handleEditUser = (user: User) => {
    setEditUser(user);
    setUserName(user.name);
  };

  const handleUpdateUser = () => {
    if (editUser) {
      dispatch(updateUser({ ...editUser, name: userName }));
      setEditUser(null);
      setUserName("");
    }
  };

  return (
    <>
      {getData.user.map((item: User) => (
        <li key={item.id}>
          {item.name}{" "}
          <button onClick={() => handleDeleteUser(item.id)}>xóa</button>
          <button onClick={() => handleEditUser(item)}>sửa</button>
        </li>
      ))}
      <button onClick={handleAll}>add User</button>
      {editUser && (
        <div>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <button onClick={handleUpdateUser}>Update</button>
        </div>
      )}
    </>
  );
}
