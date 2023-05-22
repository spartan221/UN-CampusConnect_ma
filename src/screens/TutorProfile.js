import React, { useEffect } from 'react';
import { UserContext } from '../utilities/UserContext';
import TutorProfileForm from '../components/TutorProfileForm';
import TutorProfileView from '../components/TutorProfileView';
import { getTutorProfile } from '../GraphQL';

const TutorProfile = () => {
  const [user, setUser] = React.useContext(UserContext);
  const [profileTutorCreated, setProfileTutorCreated] = React.useState(false);

  const getProfile = async () => {
    const resp = await getTutorProfile(user.id);
    console.log(resp);
    if (resp !== null) {
      setProfileTutorCreated(true);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  if (profileTutorCreated) {
    return <TutorProfileView id={user.id} />;
  }
  return <TutorProfileForm setProfileTutorCreated={setProfileTutorCreated} />;
};

export default TutorProfile;
