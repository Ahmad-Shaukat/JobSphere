import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import EditInterviewForm from "../EditInterviewForm";
import { format } from "date-fns";
import DeleteInterview from "../DeleteInterviewModal";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./app.css";
import { FaLocationArrow } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { BsCalendar2Week } from "react-icons/bs";
import { getAllInterviews, getAllInterviewsThunk } from "../../store/interview";
import { useState } from "react";

const AllInterviews = ({}) => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.session.user);
  const [editInterview, setEditInterview] = useState({});
  const [showEdit, setShowEdit] = useState(false);
  let { interview } = useSelector((store) => store);
  const history = useHistory();
  interview = Object.values(interview);
  console.log(interview);
  useEffect(async () => dispatch(getAllInterviewsThunk()), [dispatch]);

  if (!user) {
    history.push("/");
    return null;
  }

  // this opens up the edit form
  const showHandle = (interview) => {
    setEditInterview(interview);
    setShowEdit(true);
  };
  // handles the canceling of edit form
  const cancelEdit = () => {
    setEditInterview({});
    setShowEdit(false);
    history.push("/interviews");
  };

  const afterSaving = () => {
    setShowEdit(false)
    setEditInterview({})
    history.push('/interviews')
  }

  // condition that opens up the form
  if (showEdit) {
    return (
      <>
        <div>
          <EditInterviewForm id={editInterview.id}interview={editInterview} onCancel={cancelEdit} afterSaving={afterSaving}/>
          {/* <button onClick={() => cancelEdit()}>Cancel</button> */}
        </div>
      </>
    );
  }
  if (interview.length < 1) {
    return (
      <>
        <div className="no-int-cont">
          <div className="no-int-text">
            <p>No Interview</p>
          </div>
          <div className="no-int-link">
            <NavLink exact to="/newinterview">
              <button>Add Interview</button>
            </NavLink>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="allInt-container">
        {interview.map((interview) => {
          // const interviewDate = new Date(interview.date)
          // const formattedDate = format(interviewDate, 'EEEE, MMMM d, yyyy', { timeZone: 'GMT' });

          return (
            <div className="allInt-column">
              <div className="allInt-top-cont">
                <div className="allInt-com-letter">
                  <p>{interview.company[0].toUpperCase()}</p>
                </div>
                <div>
                  <p className="allInt-com-pos">{interview.position}</p>
                  <p className="allInt-com-name">{interview.company}</p>
                </div>
              </div>
              <div className="allInt-btm-container">
                <div className="allInt-btm-left-cont">
                  <div className="allInt-loc-type-cont">
                    <p className="allInt-loc-text">
                      <FaLocationArrow className="allInt-loc-logo" />
                      {interview.location}
                    </p>
                    <p>
                      <MdWork className="allInt-type-logo" />
                      {interview.type}
                    </p>
                  </div>

                  <div className="allInt-btm-bttns">
                    <button
                      className="allInt-edit-btn"
                      onClick={() => showHandle(interview)}
                    >
                      Edit
                    </button>

                    {/* <button className='allInt-edit-btn'>
                                        <OpenModalButton
                                            buttonText={'Edit'}
                                            
                                            modalComponent={
                                                <EditInterviewForm
                                                    interview={interview} id={interview.id}
                                                />
                                            }
                                        />
                                    </button> */}

                    <button className="allInt-del-btn">
                      <OpenModalButton
                        buttonText={"Delete"}
                        modalComponent={
                          <DeleteInterview interview={interview} />
                        }
                      />
                    </button>

                    <NavLink exact to={`/interview/${interview.id}/detail`}>
                      <button className="allInt-btns-more">More</button>
                    </NavLink>
                  </div>
                </div>
                <div className="allInt-btm-right-container">
                  <p className="allInt-date">
                    <BsCalendar2Week className="allInt-int-logo" />
                    {interview["date"].slice(0, 17)}
                  </p>
                  {interview.status === "Pending" && (
                    <p className="allInt-Pending">{interview.status}</p>
                  )}
                  {interview.status === "Scheduled" && (
                    <p className="allInt-Scheduled">{interview.status}</p>
                  )}
                  {interview.status === "Declined" && (
                    <p className="allInt-Declined">{interview.status}</p>
                  )}
                  {interview.status === "Offered" && (
                    <p className="allInt-Offered">{interview.status}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default AllInterviews;
