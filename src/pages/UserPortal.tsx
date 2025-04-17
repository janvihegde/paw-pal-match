
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserSidebar from '@/components/UserSidebar';
import UserProfile from '@/components/UserProfile';
import UserAdoptionHistory from '@/components/UserAdoptionHistory';
import UserSavedPets from '@/components/UserSavedPets';
import UserSettings from '@/components/UserSettings';
import UserApplications from '@/components/UserApplications';

const UserPortal = () => {
  return (
    <div className="flex">
      <UserSidebar />
      <div className="flex-grow p-8 bg-gray-50 min-h-screen">
        <Routes>
          <Route path="profile" element={<UserProfile />} />
          <Route path="adoptions" element={<UserAdoptionHistory />} />
          <Route path="saved-pets" element={<UserSavedPets />} />
          <Route path="settings" element={<UserSettings />} />
          <Route path="applications" element={<UserApplications />} />
        </Routes>
      </div>
    </div>
  );
};

export default UserPortal;
