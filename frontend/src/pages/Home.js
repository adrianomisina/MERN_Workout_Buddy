import React, { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch("/api/workouts");
        const json = await response.json();

        if (response.ok) {
          dispatch({ type: "SET_WORKOUTS", payload: json });
        }
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };

    fetchWorkouts();
  }, [dispatch]);

  return (
    <div className="home">
      {workouts && workouts.length > 0 ? (
        <div className="workouts">
          {workouts.map((workout) => (
            <WorkoutDetails workout={workout} key={workout._id} />
          ))}
        </div>
      ) : (
        <p className="emptyWorkout">No workouts available. Start by adding a new workout!</p>
      )}
      <WorkoutForm />
    </div>
  );
};

export default Home;
