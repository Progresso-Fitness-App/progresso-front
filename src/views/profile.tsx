import { SessionContext } from '@/contexts';
import { useContext } from 'react';
import { Navbar } from '@/components/navbar';

const ProfileView = (): JSX.Element => {
  const { session } = useContext(SessionContext);

  return (
    <>
      <div className="h-screen gap-4 bg-[url(./mesh-548.avif)] bg-cover flex items-center justify-center rounded-none">
        <Navbar />
        <div>This is your profile!</div>
      </div>
    </>
  );
};

export default ProfileView;
