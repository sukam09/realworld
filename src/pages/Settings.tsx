import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getUser, putUser } from "@/api/user";
import { tokenState, loginState } from "@/store/state";

const Settings = () => {
  const [user, setUser] = useState({
    image: "",
    username: "",
    bio: "",
    email: "",
    password: "",
  });
  const { image, username, bio, email, password } = user;
  const [disabled, setDisabled] = useState(false);
  const token = useRecoilValue(tokenState);
  const setLogin = useSetRecoilState(loginState);
  const navigate = useNavigate();

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  useEffect(() => {
    const getSettings = async () => {
      try {
        const data = await (
          await getUser("/user", {
            headers: {
              Authorization: `Token ${token}`,
            },
          })
        ).data;
        const user = data.user;
        setUser({
          ...user,
          password: "",
        });
      } catch (error: any) {
        console.log(error);
      }
    };
    getSettings();
  }, [token]);

  const updateSettings = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setDisabled(true);
    try {
      await putUser(
        "/user",
        {
          user: {
            image: image,
            username: username,
            bio: bio,
            email: email,
            password: password,
          },
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      navigate(`/profile/:${username}`);
    } catch (error: any) {
      console.log(error);
    }
    setDisabled(false);
  };

  const onLogout = () => {
    setLogin(false);
    localStorage.clear();
    navigate("/", { replace: true });
  };

  return (
    <>
      <Header />

      <div className="settings-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Your Settings</h1>

              <form>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="URL of profile picture"
                      name="image"
                      value={image}
                      onChange={onChange}
                      disabled={disabled}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Your Name"
                      name="username"
                      value={username}
                      onChange={onChange}
                      disabled={disabled}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea
                      className="form-control form-control-lg"
                      rows={8}
                      placeholder="Short bio about you"
                      name="bio"
                      value={bio}
                      onChange={onChange}
                      disabled={disabled}
                    ></textarea>
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Email"
                      name="email"
                      value={email}
                      onChange={onChange}
                      disabled={disabled}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="New Password"
                      name="password"
                      value={password}
                      onChange={onChange}
                      disabled={disabled}
                    />
                  </fieldset>
                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    onClick={(event) => updateSettings(event)}
                  >
                    Update Settings
                  </button>
                </fieldset>
                <hr />
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={onLogout}
                >
                  Or click here to logout.
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Settings;
