import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as api from "../../utils/api";
import { Context } from "../../utils/Store";
import "../Common.css";
import { AddRow } from "./AddRow";

export const UserPreferences = ({ match }) => {
  const [state, dispatch] = useContext(Context);
  let paramUserId = parseInt(match.params.id) || state.userId;
  const [userPrefs, setUserPrefs] = useState([]);
  const [userInfo, setUserInfo] = useState();
  const [isAdding, setIsAdding] = useState(false);
  useEffect(() => {
    //get user name
    api
      .getUserByID(paramUserId)
      .then(({ data }) => {
        setUserInfo(data);
      })
      .catch((err) => console.warn("error", err));

    // get user preferences.
    api
      .getUserPrefs(paramUserId)
      .then(({ data }) => {
        setUserPrefs(data.sort((a, b) => (a.priority > b.priority ? 1 : -1)));
      })
      .catch((err) => console.warn("error", err));
  }, [paramUserId]);

  const handleAdd = (row) => {
    api
      .addUserPref(paramUserId, row)
      .then(({ data }) => {
        setUserPrefs(userPrefs.concat(data));
        dispatch({ type: "GET_ALL_MEDIA" });
      })
      .catch((err) => console.warn("error adding", err));
  };


  function sortTable(n) {
    var table,
      rows,
      switching,
      i,
      x,
      y,
      shouldSwitch,
      dir,
      switchcount = 0;
    table = document.getElementById("myTable");
    switching = true;
    //Set the sorting direction to ascending:
    dir = "asc";
    /*Make a loop that will continue until
  no switching has been done:*/
    while (switching) {
      //start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /*Loop through all table rows (except the
    first, which contains table headers):*/
      for (i = 1; i < rows.length - 1; i++) {
        //start by saying there should be no switching:
        shouldSwitch = false;
        /*Get the two elements you want to compare,
      one from current row and one from the next:*/
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
        if (dir === "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir === "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        //Each time a switch is done, increase this count by 1:
        switchcount++;
      } else {
        /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
        if (switchcount === 0 && dir === "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }

  return (
    <div className="main-body">
      <ul className={"menu"}>
        <li>
          <div
            className="d-flex"
            style={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <div>
              Playlist for <b>{userInfo && userInfo.name}</b>
            </div>
            {isAdding ? (
              <img
                className="c-hand"
                onClick={() => setIsAdding((prevState) => !prevState)}
                width="40"
                height="40"
                src="/images/icons/icon-minus.png"
                alt={"close"}
              />
            ) : (
              <img
                className="c-hand"
                onClick={() => setIsAdding((prevState) => !prevState)}
                width="40"
                height="40"
                src="/images/icons/icon-plus.png"
                alt={"add"}
              />
            )}
          </div>
        </li>
        <li className={"divider"}></li>
        <li>
          {isAdding && <AddRow handleAdd={handleAdd} />}
          <table id="myTable" className="table table-hover">
            <thead>
              <tr>
                <th onClick={() => sortTable(0)}>Title</th>
                <th onClick={() => sortTable(1)}>Type</th>
                <th onClick={() => sortTable(2)}>Genre</th>
                <th onClick={() => sortTable(3)}>Platform</th>
                <th onClick={() => sortTable(3)}>Reviews / Notes</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {userPrefs
                .filter((u) => u.status === "active")
                .map((up, idx) => {
                  return (
                    <tr
                      key={idx}
                      className={`${
                        up.priority === "high"
                          ? "priority-high"
                          : "priority-low"
                      }`}
                    >
                      <td>{up.title}</td>
                      <td>{up.media}</td>
                      <td>{up.genre}</td>
                      <td>{up.platform}</td>
                      <td>{up.notes}</td>
                      <td>
                        <Link
                          to={{
                            pathname: `/users/${paramUserId}/preferences/${up.id}`,
                            state: up,
                          }}
                        >
                          <img
                            className="c-hand"
                            width="25"
                            height="25"
                            src="/images/icons/icon-edit.png"
                            alt={"edit"}
                          />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </li>
      </ul>
      <br />
      {/* showcomplete */}
      {userPrefs.some((m) => m.status === "complete") && (
        <ul className={"menu"}>
          <li>
            <div
              className="d-flex"
              style={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <div className="text-success">Completed Shows</div>
            </div>
          </li>
          <li className={"divider"}></li>
          <li>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Genre</th>
                  <th>Reviews</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {userPrefs
                  .filter((m) => m.status === "complete")
                  .map((up, idx) => {
                    return (
                      <tr key={idx}>
                        <td>{up.title}</td>
                        <td>{up.media}</td>
                        <td>{up.genre}</td>
                        <td>{up.notes}</td>
                        <td>
                          <Link
                            to={{
                              pathname: `/users/${paramUserId}/preferences/${up.id}`,
                              state: up,
                            }}
                          >
                            <img
                              className="c-hand"
                              width="20"
                              height="20"
                              src="/images/icons/icon-edit.png"
                              alt={"edit"}
                            />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </li>
        </ul>
      )}
    </div>
  );
};
