
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const UserProfile = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div>Profile details will go here</div>
        <Button>Edit Profile</Button>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
