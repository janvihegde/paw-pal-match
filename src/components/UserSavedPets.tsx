
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const UserSavedPets = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Saved Pets</CardTitle>
      </CardHeader>
      <CardContent>
        <div>List of saved/favorited pets will go here</div>
      </CardContent>
    </Card>
  );
};

export default UserSavedPets;
