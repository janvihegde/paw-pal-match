
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const UserAdoptionHistory = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Adoption History</CardTitle>
      </CardHeader>
      <CardContent>
        <div>List of adopted pets will go here</div>
      </CardContent>
    </Card>
  );
};

export default UserAdoptionHistory;
